<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Request;

class UpdateBrandController extends FormRequest
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
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules(Request $request)
    {
        return [
            'brand_name' => ['required', 'max:191', 'min:1', 'unique:brands,name,' . $request->id,],
            'brand_image' => ['nullable', 'image', 'mimetypes:image/jpeg,image/png,image/jpg', 'dimensions:max_width=1024,max_height=1024', 'max:2048'],
            'removeImage' => 'sometimes|boolean'
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
