<?php

namespace App\Http\Requests\AssetsSolicitation;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class UpdateAssetsSolicitationRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return Auth::user()->can('update', $this->assetsSolicitation);
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'title' => ['sometimes', 'required', 'string',  'min:5', 'max:255'],
            'description' => ['sometimes', 'required', 'string', 'min:5'],
            'provider_id' => ['sometimes', 'required', 'exists:users,id'],
        ];
    }
}
