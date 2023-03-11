<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserInfo extends Model
{
    use HasFactory;
    protected $table = 'info_users';
    protected $fillable = ['user_id', 'phone', 'address', 'name', 'email'];
    protected $primaryKey = 'user_id';
}
