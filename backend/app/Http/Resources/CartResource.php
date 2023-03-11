<?php

namespace App\Http\Resources;

use App\Models\Product;
use Illuminate\Http\Resources\Json\JsonResource;

class CartResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        // dd($this->product_id);
        $product = Product::find($this->product_id);
        $productItemsList = ProductItemResource::collection($product->productItems);
        // dd(ProductItemResource::collection($product->productItems));
        $result = '';
        foreach ($productItemsList as $productItem) {
            // dd($productItem->id);
            if ($productItem->id === $this->product_item_id) {
                $result = $productItem;
            }
        }

        return [
            'cart_id' => $this->cart_id,
            'prod_qty' => $this->prod_qty,
            'product_id' => $this->product_id,
            'product_item_id' => $this->product_item_id,
            'product_name' => $product->product_name,
            'product_price' => $product->product_price,
            'product_items' => $result,
        ];
    }
}
