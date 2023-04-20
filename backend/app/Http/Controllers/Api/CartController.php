<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\CartRequest;
use App\Http\Requests\UpdateCartRequest;
use App\Http\Resources\CartResource;
use App\Models\Cart;
use App\Models\ProductItem;
use Illuminate\Http\Request;

class CartController extends Controller
{
    public function addCart(CartRequest $request)
    {
        // kiểm tra sản phẩm có đủ số lượng người dùng đặt ko

        $qty = $request->prod_qty;
        $user = \Auth()->user();
        $product_item_id = $request->input('product_item_id');
        $product_id = $request->input('product_id');
        $cart_of_user = Cart::where([
            ['user_id', $user->id],
            ['product_item_id', $product_item_id],
            ['product_id', $product_id]
        ])->first();

        if ($cart_of_user) {
            $qty += $cart_of_user->prod_qty;
        };

        $productItem = ProductItem::where([['id', $product_item_id], ['qty', '>=',  $qty]])->first();
        if (!$productItem) {
            return response()->json([
                'success'   => false,
                'message'   => 'Số lượng sản phẩm không đủ',
            ]);
        }

        $cart = new Cart();
        $cart->user_id = $user->id;
        $cart->product_item_id =  $product_item_id;
        $cart->product_id =     $product_id;
        $cart->prod_qty = $qty;
        $cart->save();
        return response()->json([
            'success'   => true,
            'message'   => 'Thêm vào giỏ hàng thành công',
        ]);
    }
    public function getCartCount()
    {
        $user = \Auth()->user();

        $product = Cart::with(['getProduct'])->where('user_id', $user->id)->get();

        return response()->json([
            'success'   => true,
            'message'   => 'Lấy giỏ hàng thành công',
            'data'      => [
                'cart_count' => $product->sum('prod_qty'),
                'cart_detail' => CartResource::collection($product)
            ]
        ]);
    }

    public function updateCart(UpdateCartRequest $request)
    {
        $cart_id = $request->get('cart_id');
        $product_item_id = $request->get('product_item_id');

        $user_id =  $user = \Auth()->user();
        $cart = Cart::find($cart_id)->where([['user_id', $user->id], ['product_item_id', $product_item_id]])->first();
        // dd($cart);
        if (!$cart) {
            return response()->json([
                'success'   => false,
                'message'   => 'Sản phẩm không tồn tại trong giỏ hàng của bạn',

            ]);
        }
        $cart->prod_qty =  $request->get('prod_qty');
        $cart->save();
        return response()->json([
            'success'   => true,
            'message'   => 'Cập nhật giỏ hàng thành công',
        ]);
    }

    public function deleteCart(Request $request)
    {
        $cart_id = $request->input('cart_id');
        $user = \Auth()->user();

        $cart = Cart::find($cart_id);
        if ($cart && $cart->user_id = $user->id) {
            $cart->delete();
        }


        return response()->json([
            'success'   => true,
            'message'   => 'Xóa sản phẩm trong giỏ hàng thành công',
        ]);
    }
}
