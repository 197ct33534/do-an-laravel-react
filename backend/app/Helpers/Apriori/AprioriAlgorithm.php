<?php

namespace App\Helpers\Apriori;

use App\Models\OrderItem;
use App\Models\Cart;

use App\Models\Orders;
use Illuminate\Support\Facades\Cache;

class AprioriAlgorithm
{
    public $L;
    public $minSupport  = 2;
    public $minConf     = 0.5;
    public $result_ariori;
    public $data;
    public function __construct()
    {

        ini_set('memory_limit', '2096M');
        set_time_limit(8000000);
        $orders = OrderItem::all()->groupBy('order_id', true);

        $result = [];
        foreach ($orders as $item) {
            $result[] = $item->pluck('product_id')->toArray();
        }

        $this->data = $result;
    }
    // đếm số lần xuất hiện trong db
    public function countFrequent($number)
    {
        $count = 0;

        foreach ($this->data as $key => $value) {
            foreach ($value as $val) {
                if ($val === $number) $count++;
            }
        }

        return $count;
    }
    // hàm hiểm tra có chứa nhận vào 1 mảng ['key là số':'value số lần xuất hiện]
    public function checkMinSupport($arr)
    {
        $result = [];
        foreach ($arr as $key => $value) {
            if ($value >= $this->minSupport) {
                $result[$key] = $value;
            }
        }

        return $result;
    }
    // hàm lấy tập ứng viên;
    public function getCadidates()
    {
        $arrLi = [];

        foreach ($this->data as $key => $value) {
            foreach ($value as $val) {
                $count = $this->countFrequent($val);

                if (!isset($arrLi[$val])) {
                    $arrLi[$val] = $count;
                }
            }
        }

        return $this->checkMinSupport($arrLi);
    }
    // hàm dùng để lấy tập ứng viên
    public function powerSet($array, $size)
    {

        // add the empty set
        $results = [[]];

        foreach ($array as $element) {
            foreach ($results as $combination) {

                $results[] = array_merge(array($element), $combination);
            }
        }

        $kq = [];
        foreach ($results as $val) {
            if (count($val) === $size) {
                $kq[] = $val;
            }
        }
        return count($kq) ? $kq  : null;
    }
    // hàm đếm số lần xuất hiện của [] trong db
    public function countArrInDB($arr)
    {
        $count = 0;
        foreach ($this->data as $value) {
            if (0 == count(array_diff($arr, $value))) {
                $count++;
            }
        }
        return $count;
    }
    public function getSubnet($array)
    {
        $results = [[]];

        foreach ($array as $element) {
            foreach ($results as $combination) {

                $results[] = array_merge(array($element), $combination);
            }
        }

        $kq = [];
        foreach ($results as $val) {
            if (count($val) < (count($array)) && count($val) != 0) {
                $kq[] = $val;
            }
        }
        // echo '<pre>';
        // print_r($kq);
        // echo '</pre>';
        return count($kq) ? $kq  : null;
    }
    public function checkPriori($arr)
    {
        // echo 99;
        // echo '<pre>';
        // print_r(array_keys($this->L));
        // echo '</pre>';
        // die();
        foreach (array_keys($this->L) as $item) {
            if (0 == count(array_diff($arr,  explode(',', $item)))) {
                return true;
            }
        }
        return false;
    }
    public function has_subnet($strKey)
    {

        $array = explode(',', $strKey);
        if (count($array) === 1) return true;
        // echo '<pre>';
        // print_r($array);
        // echo '</pre>';
        $arrSubnet = $this->getSubnet($array);
        $count = 0;
        // echo 123;
        // echo '<pre>';
        // var_dump($arrSubnet);
        // echo '</pre>';
        // die();

        foreach ($arrSubnet as $subnet) {
            if ($this->checkPriori($subnet)) {
                $count++;
            }
        }
        // echo 123;
        // echo '<pre>';
        // print_r(count($arrSubnet));
        // echo '</pre>';
        // die();
        return count($arrSubnet) === $count ? true : false;
    }

    public function runApriori()
    {

        // echo "bước phát sinh đầu tiên </br>";
        $getData = $this->getCadidates();

        $this->L = $getData;

        $size = 2;
        $arr = [];
        $this->powerSet(array_keys($getData), $size);
        while (($arr = $this->powerSet(array_keys($getData), $size))) {
            //1
            // echo "bước phát sinh thứ $size </br>";
            $arrayRen = [];
            foreach ($arr as  $val) {
                sort($val);
                $arrayRen[] = implode(",", $val);
            }
            // echo '<pre>';
            // print_r($arrayRen);
            // echo '</pre>';
            // die();
            $item = [];
            foreach ($arrayRen as $strKey) {
                if ($this->has_subnet($strKey)) {
                    $count = $this->countArrInDB(explode(',', $strKey));
                    $item[$strKey] = $count;
                };
            }
            $temp = $this->checkMinSupport($item);

            $this->L += $temp;
            //2
            // echo '<pre>';

            // print_r($this->L);
            // echo '</pre>';
            // die();
            $size++;
            if ($size == 5) {
                break;
            }
        }
        // echo '<pre>';
        // print_r($this->L);
        // echo '</pre>';
    }

    public function associationLaw($arr)
    {
        $subset = $this->getSubnet($arr);
        $result = [];
        foreach ($subset as $item) {
            sort($item);
            $tmp = implode(',', array_diff($arr, $item));

            $result[$tmp] = implode(',', $item);
        }
        return $result;
    }

    public function associationLawWithApriori()
    {

        $kq = Cache::remember('apriori', 24 * 60 * 60 * 30, function () {
            $result = [];
            foreach ($this->L as $key => $val) {
                $arrKey = explode(',', $key);
                if (count($arrKey) === 1) {
                    continue;
                }
                $table = [];
                $association = $this->associationLaw($arrKey);
                foreach ($association as $k => $v) {
                    $kq = $val / $this->L[$k];
                    if ($kq >= $this->minConf) {
                        $table["$k->$v"] =  $kq;
                    }
                }
                if (!empty($table)) {
                    $result[$key] = $table;
                }
            }
            return $result;
        });

        //3
        // echo '<pre>';
        // print_r($result);
        // echo '</pre>';
        $this->result_ariori = $kq;
    }

    public function productRecommend($product_id)
    {
        // $user = \Auth()->user();
        // lấy ra những id sản phẩm trong giỏ hàng và hóa đơn đã mua trước đó
        // $product_in_cart = Cart::where('user_id', $user->id)
        //     ->selectRaw('product_id, count(*) AS SL')
        //     ->groupBy('product_id')
        //     ->orderBy('SL', 'desc')
        //     ->limit(10)->pluck('product_id')->toArray();

        // $product_in_order = Orders::where('user_id', $user->id)
        //     ->join('order_items', 'order_items.order_id', 'orders.id')
        //     ->selectRaw('product_id, count(*) AS SL')
        //     ->groupBy('product_id')
        //     ->orderBy('SL', 'desc')
        //     ->limit(10)
        //     ->pluck('product_id')->toArray();

        // $list_product_id =  array_unique(array_merge($product_in_cart, $product_in_order));
        $list_product_id = [$product_id];


        $arr_recommend = [];

        foreach ($this->result_ariori as $key => $val) {

            foreach ($val as $k => $v) {
                $temp = explode("->", $k);
                $interested_products = explode(",", $temp[0]);
                $containsAllValues = !array_diff($interested_products, $list_product_id);
                if ($containsAllValues == 1) {
                    $prod_id_recommend = explode(",", $temp[1]);
                    $arr_recommend = array_merge($arr_recommend, $prod_id_recommend);
                }
            }
        }
        return array_unique($arr_recommend);

        // $product_in_order =
        // kiểm tra id người dùng quan tâm có kéo theo sẽ mua tiếp sản phẩm nào nữa hay không

        // nếu có thì sẽ lưu lại những sản phẩm mà khách hàng quan tâm và khuyến nghị người dùng
    }
}
