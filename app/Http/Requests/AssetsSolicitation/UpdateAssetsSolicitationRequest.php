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
            'title' => FluentRule::string()->required()->min(5)->max(255),
            'description' => FluentRule::string()->required()->min(5),
            'provider_id' => FluentRule::integer('person responsible for providing the assets')->required()->exists('team_members', 'user_id'),

            'assets' => FluentRule::array()->required()->min(1)->each([
                'id' => FluentRule::integer('asset id')->sometimes()->exists('assets', 'id'),
                'name' => FluentRule::string('name')->required()->min(5)->max(255),
                'description' => FluentRule::string('description')->required()->min(5),
                'validation_rules' => FluentRule::array()->children([
                    'required' => FluentRule::string('required')->sometimes()->in(['on']),

                    'size' => FluentRule::array()->children([
                        'value' => FluentRule::numeric('size value')->sometimes()->min(1),
                        'minimum' => FluentRule::numeric('minimum size')->sometimes()->min(1)->lessThan('assets.*.validation_rules.size.maximum'),
                        'maximum' => FluentRule::numeric('maximum size')->sometimes()->min(1)->greaterThan('assets.*.validation_rules.size.minimum'),
                    ]),

                    'dimensions' => FluentRule::array()->children([
                        'width' => FluentRule::numeric('width')->sometimes()->min(1),
                        'height' => FluentRule::numeric('height')->sometimes()->min(1),

                        'min_width' => FluentRule::numeric('min width')->sometimes()->min(1)->lessThan('assets.*.validation_rules.dimensions.max_width'),
                        'max_width' => FluentRule::numeric('max width')->sometimes()->min(1)->greaterThan('assets.*.validation_rules.dimensions.min_width'),

                        'min_height' => FluentRule::numeric('min height')->sometimes()->min(1)->lessThan('assets.*.validation_rules.dimensions.max_height'),
                        'max_height' => FluentRule::numeric('max height')->sometimes()->min(1)->greaterThan('assets.*.validation_rules.dimensions.min_height'),

                        'ratio' => FluentRule::array()->children([
                            'numerator' => FluentRule::numeric('ratio numerator')->sometimes()->requiredWith('assets.*.validation_rules.dimensions.ratio.denominator')->min(1),
                            'denominator' => FluentRule::numeric('ratio denominator')->sometimes()->requiredWith('assets.*.validation_rules.dimensions.ratio.numerator')->min(1),
                        ]),
                    ]),

                    'quantity' => FluentRule::array()->children([
                        'value' => FluentRule::numeric('quantity value')->sometimes()->min(1),
                        'minimum' => FluentRule::numeric('minimum quantity')->sometimes()->min(1)->lessThan('assets.*.validation_rules.quantity.maximum'),
                        'maximum' => FluentRule::numeric('maximum quantity')->sometimes()->min(1)->greaterThan('assets.*.validation_rules.quantity.minimum'),
                    ]),

                    'extension' => FluentRule::array()->children([
                        'allowed' => FluentRule::string('allowed extensions')->sometimes()->regex('/^[a-z0-9,\s]+$/i'),
                    ]),
                ]),
            ]),
        ];
    }
}
