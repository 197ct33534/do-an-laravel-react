<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OrderItem extends Model
{
    use HasFactory;
    protected $table = 'order_items';
    protected $fiillable = ['id', 'order_id', 'prod_id', 'price', 'qty'];
    public function productItem()
    {
        return $this->belongsTo(ProductItem::class, 'prod_id', 'id');
    }
}
