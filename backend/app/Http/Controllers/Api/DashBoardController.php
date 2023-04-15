<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
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
}
