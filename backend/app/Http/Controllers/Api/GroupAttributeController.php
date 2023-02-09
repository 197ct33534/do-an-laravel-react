<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\AttributeResource;
use App\Models\Attribute;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Lang;

class GroupAttributeController extends Controller
{
    public function getAllGroupAttribute()
    {
        $attribute = Attribute::with(['attributeValue'])->get();

        return response()->json([
            'success'   => true,
            'message'   => Lang::get('messages.action_successful', ['action' => 'Lấy danh sách thuộc tính']),
            'data' => ($attribute)
        ]);
    }
}
