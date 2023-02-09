<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Contracts\Validation\Validator;


class StoreUserRequest extends FormRequest
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
     * rule validate cho chức năng thêm tài khoản
     *
     * @return array<string, mixed>
     */
    public function rules()
    {

        return [
            'name' => 'required|min:3|max:30',
            'email' => 'required | email |max:191 | unique:mst_users,email',
            'password' => 'required | min:6|required_with:password_confirmation|same:password_confirmation',
            'password_confirmation' => 'required | min:6',
            'group_role' => 'required | exists:roles,id',
            'is_active' => 'in:0,1'
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
