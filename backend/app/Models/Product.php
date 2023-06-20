<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;
    protected $table = 'mst_product';
    protected $fillable = [
        'product_id',
        'product_name',
        'product_price',
        'active',
        'product_image',
        'description',
        'category_id',
        'brand_id',
        'gender',
        'visit',
        // 'sku',
        // 'is_show',
        // 'is_new',
        // 'qty',
    ];
    protected $primaryKey = 'product_id';
    public $incrementing = false;

    public function brand()
    {
        return $this->belongsTo(Brand::class, 'brand_id', 'id');
    }

    public function categories()
    {
        return $this->belongsTo(Categories::class, 'category_id', 'id');
    }

    public function productItems()
    {
        return $this->hasMany(ProductItem::class, 'product_id')->with(['attributeValue', 'productItemImage']);
    }
    public function comments()
    {
        return $this->hasMany(Rating::class, 'prod_id', 'product_id');
    }
    // public function attribute(){
    //     return $this->hasManyThrough(Attribute::class,AttributeProductValue::class,'attribute_id',)
    // }
    // public function attributeValue()
    // {
    //     return $this->hasMany(AttributeProductValue::class, 'product_item_id');
    // }
    // public function getAttributes()
    // {

    //     return 1;
    //     $attr_value_id = ProductAttribute::select('attribute_value_id')->where('product_id', $this->product_id)->get();

    //     return AttributeValue::selectRaw('attribute.name AS attribute_name, attribute_value.attribute_value_id, av.name AS attribute_value')
    //         ->join('attribute', 'attribute_value.attribute_id', '=', 'attribute.attribute_id')
    //         ->whereIn('attribute_value.attribute_value_id', $attr_value_id)->get();
    // }
}
