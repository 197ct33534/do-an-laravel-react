<?php

namespace App\Http\Resources;

use App\Models\AttributeValue;
use Illuminate\Http\Resources\Json\JsonResource;

class AttributeValueResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        // dd($this);
        $code = AttributeValue::where([['id', $this->value], ['attribute_id', $this->attribute_id]])->first();

        return [
            'value' => $code->value,
            'value_code' => $code->id,
            'attribute_name' => $this->attributes->name
        ];
    }
}
