<?php

namespace App\Policies;

use App\Enums\AssetsSolicitationStatus;
use App\Models\AssetsSolicitation;
use App\Models\User;

class AssetsSolicitationPolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        return $user->belongsToTeam($user->currentTeam);
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, AssetsSolicitation $assetsSolicitation): bool
    {
        // Note: One could add ` ? Response::allow() : Response::denyAsNotFound()` to hide the existence of the solicitation if the user is not involved in it.
        return ($user->is($assetsSolicitation->provider) || $user->is($assetsSolicitation->requester)) && $user->belongsToTeam($assetsSolicitation->team);
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        return $user->belongsToTeam($user->currentTeam);
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, AssetsSolicitation $assetsSolicitation): bool
    {
        return $user->is($assetsSolicitation->requester) && $assetsSolicitation->status === AssetsSolicitationStatus::PENDING && $user->belongsToTeam($assetsSolicitation->team);
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, AssetsSolicitation $assetsSolicitation): bool
    {
        return $user->is($assetsSolicitation->requester) && $assetsSolicitation->status === AssetsSolicitationStatus::PENDING && $user->belongsToTeam($assetsSolicitation->team);
    }
}
