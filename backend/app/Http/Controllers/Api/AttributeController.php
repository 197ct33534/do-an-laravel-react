<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests\Attribute\PostAttributeRequest;
use App\Models\Attribute;
use App\Models\AttributeProductValue;
use Illuminate\Support\Facades\Lang;

class AttributeController extends Controller
{
    public function postAttribute(PostAttributeRequest $request)
    {
        $attribute  = new Attribute();
        $attribute->type = 'dropdown';
        $attribute->name = $request->name;
        $attribute->save();
        return response()->json([
            'success'   => true,
            'message'   => Lang::get('messages.action_successful', ['action' => 'Thêm  thuộc tính']),

        ]);
    }

    public function putAttribute(PostAttributeRequest $request)
    {
        $id = $request->id;
        $attribute  =  Attribute::find($id);
        if (!$attribute) {
            return response()->json([
                'success'   => false,
                'message'   => Lang::get('messages.action_failed', ['action' => 'Cập nhật thuộc tính']),

            ]);
        }
        $attribute->type = 'dropdown';
        $attribute->name = $request->name;
        $attribute->save();
        return response()->json([
            'success'   => true,
            'message'   => Lang::get('messages.action_successful', ['action' => 'Cập nhật thuộc tính']),

        ]);
    }
    public function deleteAttribute(Request $request)
    {
        $id = $request->id;
        $attributeProductValue = AttributeProductValue::where('attribute_id', $id)->first();
        if ($attributeProductValue) {
            return response()->json([
                'success'   => false,
                'message'   => Lang::get('messages.action_failed', ['action' => 'Xóa thuộc tính']),

            ]);
        }
        $attribute = Attribute::find($id);
        $attribute->delete();
        return response()->json([
            'success'   => true,
            'message'   => Lang::get('messages.action_successful', ['action' => 'Xóa thuộc tính']),

        ]);
    }
}
