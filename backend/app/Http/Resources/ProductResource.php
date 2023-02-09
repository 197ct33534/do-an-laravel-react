<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;


class ProductResource extends JsonResource

{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */

    public function toArray($request)
    {
        $genderArr = ['1' => 'Nam', '2' => 'Nữ', '3' => 'Không phân biệt giới tính'];
        // dd($this->productItems[0]);
        return [
            'attribute_set_code' => $this->productItems[0]->attribute_set_id,

            'product_id' => $this->product_id,
            'product_name' => $this->product_name,
            'product_image' => $this->product_image ? asset('storage/images/products/' . $this->product_image) : '',
            'product_price' => $this->product_price,
            'active_code' => $this->active,
            'active' => $this->active === 1 ? 'Hiển thị' : 'Không hiển thị',

            'category_name' => $this->categories->name,
            'category_id' => $this->categories->id,
            'brand_name' => $this->brand->name,
            'brand_id' => $this->brand->id,
            'gender' => $genderArr[$this->gender],
            'gender_code' => $this->gender,
            'product_items' => ProductItemResource::collection($this->productItems),
            'description' => $this->description !== 'null' ? $this->description : '',
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,

        ];
    }
}
