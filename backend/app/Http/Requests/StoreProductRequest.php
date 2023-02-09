<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Contracts\Validation\Validator;

class StoreProductRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * rule validate cho chức năng thêm sản phẩm
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'product_name' => 'required|min:6|max:255',
            'product_price' => 'required|numeric|min:0|max:999999.99',
            'product_image' =>
            'nullable|image|mimetypes:image/jpeg,image/png,image/jpg|dimensions:max_width=1024,max_height=1024|max:2048',
            'active' => 'required|in:1,2',
            'category_id' => 'required|exists:categories,id',
            'brand_id' => 'required|exists:brands,id',
            'gender' => 'required|in:1,2,3',
            'attribute_set_id' => 'required|exists:attribute_sets,id',
            // 'sku' => 'required|min:1|max:191',
            // 'is_show' => 'required|in:1,2',
            // 'is_new' => 'required|in:1,2',
            // 'qty' => 'required|min:0|max:2147483647',
        ];
    }

    public function failedValidation(Validator $validator)
    {
        throw new HttpResponseException(response()->json([
            'success'   => false,
            'error'     => $validator->errors()
        ]));
    }
}
