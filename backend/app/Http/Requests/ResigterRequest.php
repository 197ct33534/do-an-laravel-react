<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ResigterRequest extends BaseRequest
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
    public function rules()
    {
        return [
            'name' => 'required|min:3|max:30',
            'email' => 'required | email |max:191 | unique:mst_users,email',
            'password' => 'required | min:6|required_with:password_confirmation|same:password_confirmation',
            'password_confirmation' => 'required | min:6',
        ];
    }
}
