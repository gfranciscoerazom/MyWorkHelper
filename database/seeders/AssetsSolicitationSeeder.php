<?php

namespace Database\Seeders;

use App\Models\Asset;
use App\Models\AssetsSolicitation;
use App\Models\User;
use Database\Factories\AssetsSolicitationFactory;
use Illuminate\Database\Seeder;

class AssetsSolicitationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $user1 = User::factory()->create();
        $user2 = User::factory()->create();
        $user3 = User::factory()->create();
        $assetsLambda = function (AssetsSolicitation $solicitation) {
            Asset::factory()->create([
                'assets_solicitation_id' => $solicitation,
            ]);
        };

        AssetsSolicitationFactory::setRequester($user1);
        AssetsSolicitationFactory::setProvider($user2);

        AssetsSolicitation::factory(5)
            ->create()
            ->each($assetsLambda);

        AssetsSolicitationFactory::setRequester($user2);
        AssetsSolicitationFactory::setProvider($user3);

        AssetsSolicitation::factory(5)
            ->create()
            ->each($assetsLambda);

        AssetsSolicitationFactory::setRequester($user3);
        AssetsSolicitationFactory::setProvider($user1);

        AssetsSolicitation::factory(5)
            ->create()
            ->each($assetsLambda);

        AssetsSolicitationFactory::setRequester($user3);
        AssetsSolicitationFactory::setProvider($user1);

        AssetsSolicitation::factory(5)
            ->create([
                'team_id' => $user1->currentTeam->id,
            ])
            ->each($assetsLambda);
    }
}
