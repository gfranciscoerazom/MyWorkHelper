<?php

namespace Database\Factories;

use App\Models\AssetsSolicitation;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<AssetsSolicitation>
 */
class AssetsSolicitationFactory extends Factory
{
    private static ?User $requester;

    private static ?User $provider;

    public static function setRequester(User $user): void
    {
        static::$requester = $user;
    }

    public static function getRequester(): ?User
    {
        return static::$requester;
    }

    public static function setProvider(User $user): void
    {
        static::$provider = $user;
    }

    public static function getProvider(): ?User
    {
        return static::$provider;
    }

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        static::$requester ??= User::factory()->create();

        return [
            'title' => fake()->sentence(6),
            'description' => fake()->paragraphs(3, true),
            'status' => fake()->randomElement(['pending', 'completed', 'rejected']),
            'requester_id' => static::$requester,
            'provider_id' => static::$provider ??= User::factory()->create(),
            'team_id' => static::$requester->currentTeam,
            'files_uploaded_at' => fake()->optional()->dateTimeBetween('-1 years', 'now'),
        ];
    }
}
