<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\OrderItem;

class Orders extends Model
{
    use HasFactory;
    protected $table = 'orders';
    protected $fillable = ['id', 'user_id', 'name', 'email', 'phone', 'address', 'name2', 'phone2', 'email2', 'address2', 'total_price', 'note', 'payment_type'];

    public function orderItem()
    {
        return $this->hasMany(OrderItem::class, 'order_id', 'id');
    }
}
