<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AttributeProductValue extends Model
{
    use HasFactory;
    protected $table = 'attribute_product_value';
    protected $fillabel = ['product_item_id', 'attribute_id', 'value'];

    public function attributes()
    {
        return $this->belongsTo(Attribute::class, 'attribute_id');
    }

    public function attributeVal()
    {
        return $this->belongsTo(AttributeValue::class, 'value', 'id');
    }
}
