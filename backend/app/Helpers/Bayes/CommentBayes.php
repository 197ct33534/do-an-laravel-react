<?php

namespace App\Helpers\Bayes;

use Illuminate\Support\Facades\File;
// use App\Models\Store;

use App\Models\Rating;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;

class CommentBayes
{
    // lấy ra cả dự liệu train
    public function __construct()
    {
        set_time_limit(8000000);
    }
    public function totalDataTraining()
    {
        return Rating::all()->count();
    }
    //Số lượng dữ liệu lớp học AmountOfClassData
    public function AmountOfClassData($nameColumn = 'setinment')
    {
        $setinment_info = Rating::groupBy($nameColumn)
            ->select($nameColumn, DB::raw('count(*) as total'))->get();
        $data = [];
        foreach ($setinment_info as $item) {
            $data[$item->setinment] = $item->total;
        }
        return $data;
    }
    public function utf8_for_xml($string)
    {
        return preg_replace(
            '/[^\x{0009}\x{000a}\x{000d}\x{0020}-\x{D7FF}\x{E000}-\x{FFFD}]+/u',
            ' ',
            $string
        );
    }
    public function clearStr($str)
    {
        $str_remove_special_characters = preg_replace('/[+-=\/{}.!@#$%^&*~:();,_\-"`\'|]/', '', ($str));
        $str_clear = preg_replace('/\s+/', ' ', $str_remove_special_characters);
        return strtolower($str_clear);
    }
    public function arrayDiff($A, $B)
    {
        $intersect = array_intersect($A, $B);
        return array_merge(array_diff($A, $intersect), array_diff($B, $intersect));
    }
    //Xác suất trước
    public function priorProbability()
    {
        $totalDataTraining = $this->totalDataTraining();
        $result = $this->AmountOfClassData();
        $P_C['-1'] =  $result['-1']  / ($totalDataTraining);
        $P_C['0'] =  $result['0'] / ($totalDataTraining);
        $P_C['1'] =  $result['1'] / ($totalDataTraining);
        return $P_C;
    }

    // hàm này nhận vào 1 mảng chuỗi và 1 từ => output số từ trong mãng chuỗi đó
    public function wordCount($arr_string, $keyword)
    {
        $str_all_train_data = preg_replace('/\s+/', ' ', implode(" ", $arr_string));
        return substr_count($str_all_train_data, $this->clearStr($keyword));
    }
    // xác xuất có điều kiện vertical_column_name
    public function conditionalProbability($val, $arrLabel =  ['-1', '0', '1'], $nameColumn = 'setinment', $vertical_column_name = 'content_review')
    {
        $conditionalProbability = [];
        foreach ($arrLabel as $label) {
            $arr_query = Rating::select($vertical_column_name)
                ->where($vertical_column_name, 'like', '%' . ($val) . '%')
                ->where($nameColumn, $label);
            // dd($arr_query->pluck($vertical_column_name));
            $subset = $arr_query->pluck($vertical_column_name)->filter(function ($item) use ($val) {

                if (str_contains($item, $val)) {
                    return $item;
                    // dd(collect($item)->only('content_review')->all());
                    // return collect($item)
                    //     ->only('content_review')
                    //     ->all();
                }
            });

            // $arr_string =  array_column($subset->all(), 'content_review');
            if ($nameColumn === 'setinment') {
                $conditionalProbability[$label] = (float) ($this->wordCount($subset->toArray(), $val) / $this->AmountOfClassData()[$label]);
            } else {
                $conditionalProbability[$label] = (float) ($this->wordCount($subset->toArray(), $val) / $this->AmountOfClassClothing()[$label]);
            }
        }

        return $conditionalProbability;
    }
    // hàm doc file vn_stropwords
    public function readFileStopWords()
    {
        $path = "vn_stopwords.txt";
        if (File::exists($path)) {
            $contents = strtolower(file_get_contents($path));
            /* $str_clear = trim(preg_replace('/\s+/', ' ', $contents));*/
            /*$str_vn_stopwords = clearStr($contents);*/
            return explode(
                "|",
                preg_replace(
                    "/[\n\r]/",
                    "|",
                    preg_replace("/_/", " ", trim($contents))
                )
            );
        }
        return [];
    }

    // hàm sẽ lấy tất cả các message trả về dưới dạng từng từ trong tất cả các chuỗi
    public function getAllWord($vertical_column_name = 'content_review')
    {

        $kq = Cache::remember('allword', 24 * 60 * 60 * 30, function () use ($vertical_column_name) {
            $query = Rating::selectRaw("LOWER($vertical_column_name) as content_review")
                ->get();
            $str = '';
            foreach ($query as $val) {
                $str .= " " . preg_replace('/[+-=\/{}.!@#$%^&*~:();,_\-"`\'|]/', '', $val['content_review']);
            }
            $array_uni = array_unique(explode(" ", $this->clearStr(trim($str))));
            $result = [];
            foreach ($array_uni as $val) {
                if (strlen($val) > 1) {
                    $result[] = $val;
                }
            }
            return $result;
        });
        return $kq;
    }

    // train
    public function train()
    {
        $bayesComment = Cache::remember('bayes', 24 * 60 * 60 * 30, function () {
            $all_word_train = $this->getAllWord();
            $arr = [];
            $arrClothing = [];
            foreach ($all_word_train as $val) {
                $arr[$val] = $this->conditionalProbability($val);
                $arrClothing[$val] = $this->conditionalProbability($val, [0, 1], 'is_clothing');
            }
            return [
                'bayesComment' => $arr,
                'bayesClothing' => $arrClothing
            ];
        });
        return $bayesComment;
    }
    // xác xuất sau
    public function posteriorProbability($str = "")
    {

        //    $all_word_train = array_diff(getAllWord(),readFileStopWords());
        $all_word_train = $this->getAllWord();
        $store = $this->train();

        $data = $store['bayesComment'];
        $dataClothing = $store['bayesClothing'];

        $clear_str =  $this->clearStr($str);
        //    $arr_word = array_unique(array_diff( explode(' ',$clear_str),readFileStopWords()));
        $arr_word = array_unique(explode(' ', $clear_str));
        $P_1 = [];
        $P_0 = [];
        $P_am = [];
        $P_clothing_1 = [];
        $P_clothing_0 = [];
        foreach ($all_word_train as $key => $val) {
            if (in_array($val, $arr_word) && str_contains($clear_str, $val)) {
                $P_1[] = $data[$val]['1'] > 0 ? $data[$val]['1'] : (1 - $data[$val]['1']);
                $P_0[] =  $data[$val]['0']  > 0 ? $data[$val]['0'] : (1 - $data[$val]['0']);
                $P_am[] =  $data[$val]['-1'] > 0 ? $data[$val]['-1'] : (1 - $data[$val]['-1']);
                $P_clothing_0[] = $dataClothing[$val]['0'] > 0 ? $dataClothing[$val]['0'] : (1 - $dataClothing[$val]['0']);
                $P_clothing_1[] =   $dataClothing[$val]['1'] > 0 ? $dataClothing[$val]['1'] : (1 - $dataClothing[$val]['1']);
            } else {
                $P_1[] =  (1 - $data[$val]['1']);
                $P_0[] =  (1 - $data[$val]['0']);
                $P_am[] =  (1 - $data[$val]['-1']);
                $P_clothing_0[] = (1 - $dataClothing[$val]['0']);
                $P_clothing_1[] = (1 - $dataClothing[$val]['1']);
            }
        }

        $temp = $this->priorProbability();
        $result['so1'] = $this->multiplyElementsInArr($P_1);
        $result['so0'] = $this->multiplyElementsInArr($P_0);
        $result['soam'] = $this->multiplyElementsInArr($P_am);

        $tempClothing = $this->priorProbabilityOfClothes();
        $result['clothing-1'] = $this->multiplyElementsInArr($P_clothing_1);
        $result['clothing-0'] = $this->multiplyElementsInArr($P_clothing_0);

        $mauSo = ($result['so1'] * $temp['1']) + ($result['so0'] * $temp['0']) + ($result['soam'] * $temp['-1']);
        $mauSoClothing =  ($result['clothing-1'] * $tempClothing['1']) + ($result['clothing-0'] * $tempClothing['0']);

        $result['1'] = ($result['so1'] * $temp['1']) / $mauSo;
        $result['0'] = ($result['so0'] * $temp['0']) / $mauSo;
        $result['-1'] = ($result['soam'] * $temp['-1']) / $mauSo;
        $result['0-clothing'] = ($result['clothing-0'] * $tempClothing['0']) / $mauSoClothing;
        $result['1-clothing'] = ($result['clothing-1'] * $tempClothing['1']) / $mauSoClothing;
        $title_clothing_code = [1, 0];
        $title_clothing = ['quần áo', 'không liên quan quần áo'];
        $title = ['tích cực', 'bình thường', 'tiêu cực'];
        $title_code = [1, 0, -1];

        $arr_result = [$result['1'],  $result['0'], $result['-1']];
        $arr_result_clothing = [$result['1-clothing'],  $result['0-clothing']];

        $max = max($arr_result);
        $max_clothing = max($arr_result_clothing);

        $result['result'] =  $max;
        $result['result-clothing'] =  $max_clothing;
        $result['noi-dung'] = $clear_str;
        $result['ket-luan-quan-ao-code'] = $title_clothing_code[array_search($max_clothing, $arr_result_clothing)];

        $result['ket-luan-quan-ao'] = $title_clothing[array_search($max_clothing, $arr_result_clothing)];
        $result['ket-luan'] = $title[array_search($max, $arr_result)];
        $result['ket-luan-code'] = $title_code[array_search($max, $arr_result)];

        return $result;
    }
    public function test()
    {
        // print_r(priorProbabilityOfClothes());
        //    print_r(storeTrainComment());

        //    $title = ['tích cực','bình thường','tiêu cực'];
        //    $arr = [1.3486818452681E-39,-2.1987301984338E-36,-1.2523653262887E-36];
        //    $max =  max($arr);
        //    echo $title[array_search($max,$arr)];

    }
    public function removeSingleCharacter($str)
    {
        $arr = explode(" ", $this->clearStr($str));
        return implode(" ", array_filter($arr, function ($val) {
            return strlen($val) > 1;
        }));
    }
    public function multiplyElementsInArr($arr)
    {
        return array_reduce($arr, function ($v1, $v2) {
            return $v1 * $v2;
        }, 1);
    }

    public function storeTrainComment()
    {
        $now = date('Y-m-d');

        // if(!Store::whereDate('updated_at','=', $now)->exists()){
        //     $train = train();
        //     $store = Store::find('1');
        //     $store->bayesComment = NUll;
        //     $store->bayesClothing = NUll;
        //     $store->save();
        //     $store->bayesComment = json_encode($train['bayesComment'],true);
        //     $store->bayesClothing = json_encode($train['bayesClothing'],true);
        //     $store->save();
        // }
        // $train = Store::find('1');
        // $arr = ['bayesComment'=>json_decode($train->bayesComment,true),
        //     'bayesClothing'=>json_decode($train->bayesClothing,true)
        //     ];
        return $now;
    }
    function AmountOfClassClothing($nameColumn = 'is_clothing')
    {
        $clothing_info = Rating::groupBy($nameColumn)
            ->select($nameColumn, DB::raw('count(*) as total'))->get();
        $data = [];
        foreach ($clothing_info as $item) {
            $data[$item->is_clothing] = $item->total;
        }
        return $data;
    }
    function priorProbabilityOfClothes()
    {
        $totalDataTraining = $this->totalDataTraining();
        $P_C['0'] = $this->AmountOfClassClothing()['0'] / ($totalDataTraining);
        $P_C['1'] = $this->AmountOfClassClothing()['1'] / ($totalDataTraining);
        return $P_C;
    }
}
