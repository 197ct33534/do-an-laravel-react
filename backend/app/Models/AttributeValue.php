<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AttributeValue extends Model
{
    use HasFactory;
    protected $table = 'attribute_values';
    protected $primaryKey = 'id';
    protected $fillable = ['id', 'attribute_id', 'value'];
    public function attribute()
    {
        return $this->belongsTo(Attribute::class, 'id');
    }
}
