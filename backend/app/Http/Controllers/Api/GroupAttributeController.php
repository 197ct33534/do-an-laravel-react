<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Attribute\PostAttributeValueRequest;
use App\Http\Resources\AttributeResource;
use App\Models\Attribute;
use App\Models\AttributeProductValue;
use App\Models\AttributeValue;
use App\Models\ProductItem;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Lang;

class GroupAttributeController extends Controller
{
    public function getAttributeValue()
    {
        $attribute = Attribute::with(['attributeValue'])->get();

        return response()->json([
            'success'   => true,
            'message'   => Lang::get('messages.action_successful', ['action' => 'Lấy danh sách thuộc tính']),
            'data' => ($attribute)
        ]);
    }

    public function postAttributeValue(PostAttributeValueRequest $request)
    {
        $attribute = new AttributeValue();
        $attribute->attribute_id = $request->attribute_id;
        $attribute->value = $request->value;
        $attribute->save();
        return response()->json([
            'success'   => true,
            'message'   => Lang::get('messages.action_successful', ['action' => 'Thêm thuộc tính']),

        ]);
    }

    public function putAttributeValue(PostAttributeValueRequest $request)
    {
        $attribute =  AttributeValue::find($request->id);
        $attributeProduct = AttributeProductValue::where('attribute_id', $attribute->attribute_id)->update(['value' => $request->value]);
        if (!$attribute) {
            return response()->json([
                'success'   => false,
                'message'   => Lang::get('messages.action_failed', ['action' => 'Cập nhật thuộc tính']),

            ]);
        }
        $attribute->value = $request->value;
        $attribute->save();
        return response()->json([
            'success'   => true,
            'message'   => Lang::get('messages.action_successful', ['action' => 'Cập nhật thuộc tính']),

        ]);
    }

    public function deleteAttributeValue(Request $request)
    {
        $id = $request->id;
        $attributeValue =  AttributeValue::find($id);
        $attributeProduct = AttributeProductValue::where('attribute_id', $attributeValue->attribute_id)->first();
        if ($attributeProduct) {
            return response()->json([
                'success'   => false,
                'message'   => Lang::get('messages.action_failed', ['action' => 'Xóa thuộc tính']),

            ]);
        }
        $attributeValue->delete();
        return response()->json([
            'success'   => true,
            'message'   => Lang::get('messages.action_successful', ['action' => 'Xóa thuộc tính']),

        ]);
    }
}
