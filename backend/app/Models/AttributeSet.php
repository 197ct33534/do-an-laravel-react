<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AttributeSet extends Model
{
    use HasFactory;
    protected $table = 'attribute_sets';
    protected $fillable = ['id', 'name'];

    public function Attribute()
    {
        return $this->hasMany(AttributeAttributeSet::class, 'attribute_set_id')->with('getNameAttribute');
    }
}
