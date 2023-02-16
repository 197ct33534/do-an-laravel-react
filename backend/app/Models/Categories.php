<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Product;

class Categories extends Model
{
    use HasFactory;
    protected $table = 'categories';
    protected $fillable = ['name', 'parent_id'];

    public function children()
    {
        return $this->hasMany(Categories::class, 'parent_id')->with('children');
    }

    public function product()
    {
        return $this->hasMany(Product::class, 'category_id', 'id');
    }
}
