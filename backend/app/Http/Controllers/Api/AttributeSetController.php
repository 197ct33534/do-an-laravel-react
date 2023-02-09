<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\AttributeSetResource;
use App\Models\AttributeSet;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Lang;

class AttributeSetController extends Controller
{
    public function index()
    {
        $attribute_Set = AttributeSet::with(['Attribute'])->get();

        return response()->json([
            'success'   => true,
            'message'   => Lang::get('messages.action_successful', ['action' => 'Lấy thuộc tính mặc định']),
            'data' =>  AttributeSetResource::collection($attribute_Set),
        ]);
    }
}
