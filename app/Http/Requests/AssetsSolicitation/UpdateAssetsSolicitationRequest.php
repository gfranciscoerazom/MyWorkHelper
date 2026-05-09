<?php

namespace App\Http\Requests\AssetsSolicitation;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use SanderMuller\FluentValidation\FluentRule;
use SanderMuller\FluentValidation\HasFluentRules;

class UpdateAssetsSolicitationRequest extends FormRequest
{
    use HasFluentRules;

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
            'title' => FluentRule::string()->sometimes()->required()->min(5)->max(255),
            'description' => FluentRule::string()->sometimes()->required()->min(5),
            'provider_id' => FluentRule::numeric()->sometimes()->required()->exists('users', 'id'),
        ];
    }
}
