<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class AttributeSetResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        $temp = [];
        foreach ($this->Attribute as $key => $value) {
            $temp[] = $value->getNameAttribute->name;
        }

        return [
            'id' => $this->id,
            'name' => $this->name,
            'attribute_name' => $temp
        ];
    }
}
