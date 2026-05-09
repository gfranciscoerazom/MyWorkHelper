<?php

namespace Database\Factories;

use App\Models\Asset;
use App\Models\AssetsSolicitation;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Asset>
 */
class AssetFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->sentence(2),
            'description' => fake()->optional()->paragraph(1, true),
            'validation_rules' => fake()->optional()->randomElement([
                // ['between:800,1024', 'dimensions:max_width=1024,max_height=768', 'dimensions:ratio=4/3', 'extension:jpg'],
                [
                    'between' => [100, 512],
                    'dimensions' => [
                        'max_width' => 1920,
                        'max_height' => 1080,
                        'min_width' => 100,
                        'min_height' => 100,
                        'ratio' => '16/9',
                    ],
                    'extension' => ['jpg', 'png'],
                ],
                [
                    'between' => [50, 256],
                    'dimensions' => [
                        'max_width' => 1024,
                        'max_height' => 768,
                        'min_width' => 50,
                        'min_height' => 50,
                        'ratio' => '4/3',
                    ],
                    'extension' => ['png'],
                ],
            ]),
            // 'asset_path' => fake()->randomElement([
            //     ['url' => fake()->imageUrl(1920, 1080)],
            //     ['url' => fake()->imageUrl(1024, 768)],
            // ]),
            'assets_solicitation_id' => AssetsSolicitation::factory(),
        ];
    }
}
