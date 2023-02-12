<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AttributeAttributeSet extends Model
{
    use HasFactory;
    protected $table = 'attribute_attribute_set';
    protected $fillable = ['attribute_id', 'attribute_set_id'];
    public function getNameAttribute()
    {
        return $this->belongsTo(Attribute::class, 'attribute_id');
    }
}
