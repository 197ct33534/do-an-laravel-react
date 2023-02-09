<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProductItem extends Model
{
    use HasFactory;
    protected $table = 'product_items';
    protected $fillable = ['id', 'product_id', 'attribute_set_id', 'sku', 'qty', 'flag_primary'];
    public function attributeValue()
    {
        return $this->hasMany(AttributeProductValue::class, 'product_item_id')->with(['attributes', 'attributeVal']);
    }
    public function productItemImage()
    {
        return $this->belongsTo(ProductImage::class, 'id');
    }
}
