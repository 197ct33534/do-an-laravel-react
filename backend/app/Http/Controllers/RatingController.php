<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Helpers\Bayes\CommentBayes;
use  App\Helpers\Apriori\AprioriAlgorithm;

class RatingController extends Controller
{
    public function index()
    {
        $bayes = new CommentBayes();
        dd(($bayes->train()));
        dd($bayes->posteriorProbability("Chất lượng sản phẩm: mặc oke thật, thoáng mát mỏng hợp giá tiền màu khá đẹp. nói chung là oke"));
    }

    public function test()
    {
        $apriori = new AprioriAlgorithm();
        $apriori->runApriori();
        $apriori->associationLawWithApriori();
        // $apriori->productRecommend();
    }
}
