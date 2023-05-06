<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Helpers\Bayes\CommentBayes;
use  App\Helpers\Apriori\AprioriAlgorithm;
use App\Models\Rating;

class RatingController extends Controller
{
    public function index()
    {
        $bayes = new CommentBayes();
        // dd(($bayes->train()));
        dd($bayes->posteriorProbability("Hàng xấu lắm KO NÊN MUA nha Phần tay áo may bị đùn lại Vải xấu, mỏng xuyên thấu và màu khác trong hình 1 trời 1 vực luôn"));
    }

    public function test()
    {
        $apriori = new AprioriAlgorithm();
        $apriori->runApriori();
        $apriori->associationLawWithApriori();
        // $apriori->productRecommend();
    }

    public function importCsv()
    {
        $file = public_path('file/data.csv');

        $commentArr = $this->csvToArray($file);

        // for ($i = 0; $i < count($commentArr); $i++) {
        //     Rating::firstOrCreate($commentArr[$i]);
        // }

        return 'Jobi done or what ever';
    }
    function csvToArray($filename = '', $delimiter = ',')
    {
        if (!file_exists($filename) || !is_readable($filename))
            return false;

        $header = null;
        $data = array();
        if (($handle = fopen($filename, 'r')) !== false) {
            while (($row = fgetcsv($handle, 1000, $delimiter)) !== false) {
                if (!$header)
                    $header = $row;
                else
                    $data[] = array_combine($header, $row);
            }
            fclose($handle);
        }

        return $data;
    }
}
