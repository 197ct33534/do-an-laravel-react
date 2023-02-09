<?php

namespace App\Http\Resources;

use App\Models\ProductImage;
use Illuminate\Http\Resources\Json\JsonResource;

class ProductItemResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        $image = ProductImage::where('product_item_id', $this->id)->first();

        return [
            'product_item_id' => $this->id,
            'sku' => $this->sku,
            'qty' => $this->qty,
            'flag_primary' => $this->flag_primary,
            'image' => $image ? asset('storage/images/products/' .  $image->name) : '',
            'attribute_value' =>  AttributeValueResource::collection($this->attributeValue)
        ];
    }
}
