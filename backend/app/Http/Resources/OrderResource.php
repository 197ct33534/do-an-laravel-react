<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\BaseResource;
use App\Models\Rating;

class OrderResource extends  BaseResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        // dd($this->pagination);
        $arrStatus = ['1' => 'Đặt hàng', '2' => 'Đang giao hàng', '3' => 'Giao hàng thành công', '4' => 'Giao hàng thất bại'];
        $arrPayment = ['1' => 'Thanh toán khi nhận hàng', '2' => 'Thanh toán momo'];
        $data = [];
        foreach ($this->values() as $key => $item) {
            $orderItems = [];
            foreach ($item->orderItem->values() as $order_Item) {
                $attribute = [];
                foreach ($order_Item->productItem->attributeValue->values() as $attr) {
                    $attribute[$attr->attributes->name] = $attr->value;
                }
                $orderItems[] = [
                    'order_item_id' => $order_Item->id,  'prod_item_id' => $order_Item->prod_id,
                    'product_name' => $order_Item->productItem->getProduct->product_name,
                    'qty' => $order_Item->qty,
                    'price' => $order_Item->price,
                    'product_id' => $order_Item->product_id,
                    'sku' => $order_Item->productItem->sku,
                    'image' =>
                    $order_Item->productItem->getProduct->product_image ? asset('storage/images/products/' .  $order_Item->productItem->getProduct->product_image) : '',
                    'attribute' => $attribute,
                    'is_comment' => $this->checkCommentProduct($item->user_id, $item->id, $order_Item->product_id)
                ];
            }
            $delivery_address = null;
            if ($item->name2 || $item->phone2 || $item->address2 || $item->email2) {
                $delivery_address = [
                    'name' => $item->name2,
                    'email' => $item->email2,
                    'phone' => $item->phone2,
                    'address' => $item->address2,
                ];
            }
            $data[] = [
                'order_id' => $item->id,
                'user_id' => $item->user_id,
                'name' => $item->name,
                'email' => $item->email,
                'phone' => $item->phone,
                'address' => $item->address,
                'delivery_address' => $delivery_address,
                'note' => $item->note,
                'total_price' => $item->total_price,
                'payment_type' => $item->payment_type,
                'payment_type_text' => $arrPayment[$item->payment_type],
                'status' => $item->status,
                'status_text' => $arrStatus[$item->status],
                'order_items' => $orderItems,
                'created_at' => date_format($item->created_at, "H:i:s d/m/Y")
                // ['product_tail' => $item->orderItem]
            ];
        }

        return ['data' => $data,  'pagination' => $this->pagination];
    }
    public function checkCommentProduct($user_id, $order_id, $product_id)
    {
        $check = Rating::where([['user_id', $user_id], ['order_id', $order_id], ['prod_id', $product_id]])->first();
        if ($check) {
            return true;
        }
        return false;
    }
}
