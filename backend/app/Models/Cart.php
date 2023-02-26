<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Cart extends Model
{
    use HasFactory;
    protected $table = 'carts';
    protected $fillable = ['cart_id', 'user_id', 'product_item_id', 'prod_qty'];

    protected $primaryKey = 'cart_id';
}
