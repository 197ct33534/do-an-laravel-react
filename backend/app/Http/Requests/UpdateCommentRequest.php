<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateCommentRequest extends BaseRequest
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
            'is_clothing' => 'in:0,1',
            'is_show' => 'in:0,1',
            'sentiment' => 'in:-1,0,1',
            'id' => 'required|exists:ratings,id'
        ];
    }
}
