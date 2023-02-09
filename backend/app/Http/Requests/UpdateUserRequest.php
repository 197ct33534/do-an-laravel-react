<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Request;


class UpdateUserRequest extends FormRequest
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
     * rule validate cho chức năng cập nhật tài khoản
     *
     * @return array<string, mixed>
     */

    public function rules(Request $request)
    {
        return [
            'id' => 'required',
            'name' => 'required|min:3|max:30',
            'email' => 'required |email|max:191 | unique:mst_users,email,' . $request->id,
            'password' => 'min:6|required_with:password_confirmation|same:password_confirmation',
            'password_confirmation' => 'min:6',
            'group_role' => 'required | exists:roles,id',
            'is_active' => 'required | in:1,0'
        ];
    }
    public function failedValidation(Validator $validator)
    {
        throw new HttpResponseException(response()->json([
            'success'   => false,
            'error'      => $validator->errors()
        ]));
    }
}
