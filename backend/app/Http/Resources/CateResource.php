<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class CateResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        // dd($this->product[0]->product_image);
        $number = $this->product->count();
        return [
            'id' => $this->id,
            'name' => $this->name,
            'parent_id' => $this->name,
            'product_count' => $number,
            'product_image_avatar' => $number > 0 ? asset('storage/images/products/' .  $this->product[0]->product_image)  : null
        ];
    }
}
