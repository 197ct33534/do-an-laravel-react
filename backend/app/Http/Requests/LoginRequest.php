<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class LoginRequest extends FormRequest
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
     * rule validate cho chức năng đăng nhập
     *
     * @return array<string, mixed>
     */


    public function rules()
    {
        return [
            'email' => 'required | email',
            'pass' => 'required'
        ];
    }
}
