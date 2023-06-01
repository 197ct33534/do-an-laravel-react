<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\OrderItem;
use App\Models\Orders;
use App\Models\Rating;
use App\Models\User;
use Illuminate\Http\Request;

class DashBoardController extends Controller
{
    public function index()
    {
        // TỔNG DOANH THU GIỮA 2 THÁNG GẦN NHẤT
        $order = Orders::selectRaw('year(updated_at) year, month(updated_at) month,sum(total_price) AS total_price')
            ->groupBy('year', 'month')
            ->orderBy('year', 'desc')
            ->orderBy('month', 'desc')
            ->where('status', '3')->limit(2)->get();
        $order_revenue = new \stdClass();
        $order_revenue->percent = number_format($order[0]['total_price'] * 100 / $order[1]['total_price'], 2);
        $order_revenue->arrow = $order[0]['total_price'] > $order[1]['total_price'] ? "up" : "down";
        $order_revenue->value = $order[0]['total_price'];
        $order_revenue->pre_value = $order[1]['total_price'];

        // TỔNG SỐ ĐƠN HÀNG  GIỮA 2 THÁNG GẦN NHẤT
        $order = Orders::selectRaw('year(updated_at) year, month(updated_at) month, count(*) AS SL')
            ->groupBy('year', 'month')
            ->orderBy('year', 'desc')
            ->orderBy('month', 'desc')
            ->limit(2)->get();
        $order_count = new \stdClass();
        $order_count->percent = number_format($order[0]['SL'] * 100 / $order[1]['SL'], 2);
        $order_count->arrow = $order[0]['SL'] > $order[1]['SL'] ? "up" : "down";
        $order_count->value = $order[0]['SL'];
        $order_count->pre_value = $order[1]['SL'];

        // tổng số người dùng mới đăng ký giữa 2 tháng
        $user = User::selectRaw('year(updated_at) year, month(updated_at) month, count(*) AS SL')
            ->groupBy('year', 'month')
            ->orderBy('year', 'desc')
            ->orderBy('month', 'desc')
            ->limit(2)->get();
        $user_count = new \stdClass();
        $user_count->percent = number_format($user[0]['SL'] * 100 / $user[1]['SL'], 2);
        $user_count->arrow = $user[0]['SL'] > $user[1]['SL'] ? "up" : "down";
        $user_count->value = $user[0]['SL'];
        $user_count->pre_value = $user[1]['SL'];

        // tổng số bình  luận giữa 2 tháng
        $comment = Rating::where('order_id', '!=', 0)->selectRaw('year(updated_at) year, month(updated_at) month, count(*) AS SL')
            ->groupBy('year', 'month')
            ->orderBy('year', 'desc')
            ->orderBy('month', 'desc')
            ->limit(2)->get();

        $comment_count = new \stdClass();
        $comment_count->percent = number_format($comment[0]['SL'] * 100 / $comment[1]['SL'], 2);
        $comment_count->arrow = $comment[0]['SL'] > $comment[1]['SL'] ? "up" : "down";
        $comment_count->value = $comment[0]['SL'];
        $comment_count->pre_value = $comment[1]['SL'];

        return response()->json([
            'success'   => true,
            'data'      => [
                'order_revenue' => $order_revenue,
                'order_count' => $order_count,
                'user_count' => $user_count,
                'comment_count' => $comment_count,

            ]
        ]);
    }

    public function getMonthlyRevenue()
    {
        $order = Orders::selectRaw('year(updated_at) year, month(updated_at) month,sum(total_price) AS total_price,count(status) as count_success')
            ->whereRaw('year(updated_at) =' . date('Y') . ' and month(updated_at) <=' . date('m'))
            ->groupBy('year', 'month')
            ->orderBy('month', 'asc')
            ->where('status', '3')->get();

        return response()->json(
            [
                'labels' => $order->pluck('month'),
                'data' => $order->pluck('total_price'),
                'count_success' => $order->pluck('count_success'),
            ]
        );
    }

    public function getQuantitySoldOfProduct()
    {
        $productList =  OrderItem::join('mst_product', 'mst_product.product_id', 'order_items.product_id')
            ->selectRaw('sum(qty) as count_sold_product, order_items.product_id , mst_product.product_name')
            ->groupBy(['product_name', 'order_items.product_id'])

            ->orderBy('count_sold_product', 'desc')
            ->get();
        return response()->json(
            [
                'labels' => $productList->pluck('product_name'),
                'data' => $productList->pluck('count_sold_product'),
            ]
        );
    }

    public function getNumberOfCommentTypes()
    {
        $comment_setinment = Rating::where('order_id', '!=', 0)
            ->selectRaw('setinment as type, count(*) AS SL')
            ->groupBy('type')
            ->orderBy('type', 'desc')
            ->get();

        $comment_star = Rating::where('order_id', '!=', 0)
            ->selectRaw('stars_rated as star, count(*) AS SL')
            ->groupBy('star')
            ->orderBy('star', 'desc')
            ->get();

        return response()->json(
            [
                'labels_setinment' => $comment_setinment->pluck('type'),
                'data_setinment' => $comment_setinment->pluck('SL'),

                'labels_star' => $comment_star->pluck('star'),
                'data_star' => $comment_star->pluck('SL'),

            ]
        );
    }
}
