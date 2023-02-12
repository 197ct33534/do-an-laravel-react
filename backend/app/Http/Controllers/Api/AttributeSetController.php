<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Attribute\PostAttributeSetRequest;
use App\Http\Resources\AttributeSetResource;
use App\Models\AttributeAttributeSet;
use App\Models\AttributeSet;
use App\Models\ProductItem;
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

    public function postAttributeSet(PostAttributeSetRequest $request)
    {
        $attributeSet = new AttributeSet();
        $attributeSet->name = $request->name;
        $attributeSet->save();

        $attribute  = $request->attribute;

        $id = $attributeSet->id;

        $data = [];
        foreach ($attribute as $val) {
            $data[] = ['attribute_id' => $val, 'attribute_set_id' => $id];
        }


        AttributeAttributeSet::insert($data);
        return response()->json([
            'success'   => true,
            'message'   => Lang::get('messages.action_successful', ['action' => 'Thêm nhóm thuộc tính']),

        ]);
    }

    public function putAttributeSet(PostAttributeSetRequest $request)
    {
        $id = $request->id;
        $attributeSet =  AttributeSet::find($id);
        if (!$attributeSet) {
            return response()->json([
                'success'   => false,
                'message'   => Lang::get('messages.action_failed', ['action' => 'Cập nhật nhóm thuộc tính']),

            ]);
        }
        $attributeSet->name = $request->name;
        $attributeSet->save();

        AttributeAttributeSet::where('attribute_set_id', $id)->delete();

        $attribute  = $request->attribute;
        $data = [];
        foreach ($attribute as $val) {
            $data[] = ['attribute_id' => $val, 'attribute_set_id' => $id];
        }
        AttributeAttributeSet::insert($data);
        return response()->json([
            'success'   => true,
            'message'   => Lang::get('messages.action_successful', ['action' => 'Cập nhật nhóm thuộc tính']),

        ]);
    }

    public function deleteAttributeSet(Request $request)
    {
        $id = $request->id;
        // kiểm tra product_item có tồn tại attributes mà đã truyền hay chưa
        $product = ProductItem::where('attribute_set_id', $id)->first();
        if ($product) {
            return response()->json([
                'success'   => false,
                'message'   => Lang::get('messages.action_failed', ['action' => 'Xóa nhóm thuộc tính']),

            ]);
        }

        AttributeSet::find($id)->delete();
        AttributeAttributeSet::where('attribute_set_id', $id)->delete();
        return response()->json([
            'success'   => true,
            'message'   => Lang::get('messages.action_successful', ['action' => 'Xóa nhóm thuộc tính']),

        ]);
    }
}
