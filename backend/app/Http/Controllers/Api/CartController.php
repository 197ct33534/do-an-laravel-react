<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\CartRequest;
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

        $product = Cart::where('user_id', $user->id)->get();
        return response()->json([
            'success'   => true,
            'message'   => 'Lấy giỏ hàng thành công',
            'data'      => [
                'cart_count' => $product->count(),
                'cart_detail' => $product
            ]
        ]);
    }
}
