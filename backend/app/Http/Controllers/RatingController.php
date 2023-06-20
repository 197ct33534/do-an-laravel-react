<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Helpers\Bayes\CommentBayes;
use  App\Helpers\Apriori\AprioriAlgorithm;
use App\Models\OrderItem;
use App\Models\Orders;
use App\Models\Product;
use App\Models\Rating;

class RatingController extends Controller
{
    public function index()
    {
        $bayes = new CommentBayes();
        // dd($bayes->train());
        dd($bayes->posteriorProbability("
        Kiểu dáng váy đẹp nhưng mà hơi hơi mỏng nha. Nói chung là cũng tạm được"));
    }
    public function postComment()
    {
        dd(13);
        $bayes = new CommentBayes();
        return ($bayes->posteriorProbability(request()->input('comment')));
    }
    public function testComment()
    {
        return view('comment');
    }
    public function test()
    {

        $apriori = new AprioriAlgorithm();

        $apriori->runApriori();
        dd($apriori->associationLawWithApriori());
        // $apriori->productRecommend();
    }

    public function importCsv()
    {
        $file = public_path('file/data1.csv');

        $commentArr = $this->csvToArray($file);
        // dd($commentArr);
        // for ($i = 0; $i < count($commentArr); $i++) {
        //     Rating::create($commentArr[$i]);
        // }

        return 'insert data successful';
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

    public function fakeOrder()
    {

        $listOrderDetail = [
            'D000000014' => 254,
            'V000000013' => 175, 'D000000012' => 252,
            'V000000012' => 170,  'B000000002' => 256,
        ];
        $data_info_user_order = [
            'user_id' => 403,
            'name' => 'diem',
            'email' => 'diem@gmail.com',
            'phone' => '0911919309',
            'address' => 'quận 2',
            'total_price' => '1513000',
            'payment_type' => '1',
            'status' => '3',
        ];
        for ($i = 0; $i < 10; $i++) {
            $order =  Orders::create(
                $data_info_user_order
            );
            foreach ($listOrderDetail as $key => $id) {
                $row = ([
                    'order_id' => $order->id,
                    'prod_id' => $id,
                    'product_id' => $key,
                    'qty' => 1,
                    'price' => Product::where('product_id', $key)->first()->product_price,
                ]);
                // dd($row);
                $order_item = OrderItem::create(
                    $row
                );
            }
        }
        dd(123);
    }
}
