<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\OrderRequest;
use App\Http\Requests\UpdateOrderRequest;
use App\Http\Resources\OrderResource;
use App\Models\Cart;
use App\Models\OrderItem;
use App\Models\Orders;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Lang;

class OrderController extends Controller
{
    public function postOrder(OrderRequest $request)
    {
        $orderItem = [];
        $user_id = \Auth::user()->id;

        $carts = Cart::where('user_id', $user_id)->get();

        $total_price = 0;

        $ship = 0;
        if ($carts) {

            $order = Orders::create($request->all() + ['total_price' => $total_price, 'user_id' => $user_id, 'status' => 1]);
            foreach ($carts as $cart) {
                $total_price += $cart->prod_qty * $cart->getProduct->product_price;
                $orderItem[] = [
                    'order_id' => $order->id,
                    'prod_id' => $cart->product_item_id,
                    'product_id' => $cart->product_id,
                    'qty' => $cart->prod_qty,
                    'price' => $cart->getProduct->product_price,
                    'created_at' => $order->created_at,
                    'updated_at' => $order->updated_at,

                ];
            }

            $order_item = OrderItem::insert($orderItem);
            if ($total_price === 0  || $total_price > 500000) {
                $ship = 0;
            } else {
                $ship = 30000;
            }

            $order->total_price = $total_price + $ship;
            $order->save();
            Cart::where('user_id', $user_id)->delete();
            return response()->json([
                'success'   => true,
                'message'   => 'Đặt hàng thành công, cảm ơn quý khách',
            ]);
        }
        return response()->json([
            'success'   => false,
            'message'   => 'Đặt hàng thất bại',
        ]);
    }

    public function getOrder(Request $request)
    {
        $where = [];

        if ($request->input('name')) {
            $where[] = ['name', 'like', '%' . $request->input('name') . '%'];
        }
        if ($request->input('status')) {
            $where[] = ['status', $request->input('status')];
        }
        if ($request->input('phone')) {
            $where[] = ['phone', 'like', '%' . $request->input('phone') . '%'];
        }
        $query = Orders::with(['orderItem', 'orderItem.productItem', 'orderItem.productItem.productItemImage', 'orderItem.productItem.attributeValue', 'orderItem.productItem.getProduct'])->where($where);
        if (is_numeric($request->input('min_total')) && is_numeric($request->input('max_total'))) {
            $query->whereBetween('total_price', [$request->input('min_total'), $request->input('max_total')]);
        } else if (is_numeric($request->input('min_total'))) {
            $query->where('total_price', '>=', $request->input('min_total'));
        } else if (is_numeric($request->input('max_total'))) {
            $query->where('total_price', '<=', $request->input('max_total'));
        }
        $perpage = 10;
        if ($request->get('perPage')) {
            $arr  = ['10', '15', '20', '8'];
            if (in_array($request->get('perPage'), $arr)) {
                $perpage = $request->get('perPage');
            }
        }
        $orders = $query->orderBy('created_at', 'desc')->paginate($perpage);
        if ($orders->count() > 0) {
            return response()->json([
                'success'   => true,
                'message'   => Lang::get('messages.action_successful', ['action' => 'Tìm kiếm']),
                'data' => new OrderResource($orders)
            ]);
        }
        if (Orders::all()->count() === 0) {
            return response()->json([
                'success'   => false,
                'data' => false,
                'message'   => Lang::get('messages.no_data'),
            ]);
        }
        return response()->json([
            'success'   => false,
            'message'   => Lang::get('messages.action_failed', ['action' => 'Tìm kiếm']),
        ]);
    }
    public function updateOrder(UpdateOrderRequest $request)
    {
        $status = $request->input('status');
        $id = $request->input('order_id');
        $order = Orders::find($id);
        $order->status = $status;
        $order->save();
        return response()->json([
            'success'   => true,
            'message'   => 'Cập nhật trạng thái đơn hàng thành công',
        ]);
    }

    public function getStatusOrder()
    {
        $user_id = \Auth::user()->id;

        $orders = Orders::with(['orderItem', 'orderItem.productItem', 'orderItem.productItem.productItemImage', 'orderItem.productItem.attributeValue', 'orderItem.productItem.getProduct'])->where('user_id', $user_id)->orderBy('created_at', 'desc')->paginate(10);

        if ($orders->count() > 0) {
            return response()->json([
                'success'   => true,
                'message'   => Lang::get('messages.action_successful', ['action' => 'Tìm kiếm']),
                'data' => new OrderResource($orders)
            ]);
        }
        return response()->json([
            'success'   => false,
            'message'   => 'Chưa có đơn hàng bất kỳ',
        ]);
    }
}
