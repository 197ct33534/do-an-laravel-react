<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use App\Http\Requests\BaseRequest;

class OrderRequest extends BaseRequest
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
            'email' => 'required | email |max:191 | exists:mst_users,email',
            'phone' => 'required|regex:/^([0-9\s\-\+\(\)]*)$/|min:10',
            'address' => 'required|max:255',
            'name2' => 'sometimes|min:3|max:30',
            'email2' => 'sometimes | email |max:191',
            'phone2' => 'sometimes|regex:/^([0-9\s\-\+\(\)]*)$/|min:10',
            'address2' => 'sometimes|max:255',
            'note' => 'sometimes',
            'payment_type' => 'in:1,2,3,4'
        ];
    }
}
