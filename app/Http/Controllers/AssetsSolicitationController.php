<?php

namespace App\Http\Controllers;

use App\Http\Requests\AssetsSolicitation\StoreAssetsSolicitationRequest;
use App\Http\Requests\AssetsSolicitation\UpdateAssetsSolicitationRequest;
use App\Models\AssetsSolicitation;
use App\Models\Team;
use App\Models\User;
use App\Notifications\AssetsSolicitation\AssetsSolicitationSended;
use Illuminate\Http\Request;
use Illuminate\Routing\Attributes\Controllers\Authorize;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class AssetsSolicitationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    #[Authorize('viewAny', AssetsSolicitation::class)]
    public function index(Request $request)
    {
        $assetsSolicitationsToBeProvided = Auth::user()
            ->assetsSolicitationsToBeProvided()
            ->with(['requester', 'provider'])
            ->where('team_id', Auth::user()->currentTeam->id)
            ->when($request->status, fn ($query, $status) => $query->where('status', $status))
            ->latest()
            ->paginate(7, pageName: 'to_be_provided_page')
            ->withQueryString();

        $assetsSolicitationsRequested = Auth::user()
            ->assetsSolicitationsRequested()
            ->with(['requester', 'provider'])
            ->where('team_id', Auth::user()->currentTeam->id)
            ->when($request->status, fn ($query, $status) => $query->where('status', $status))
            ->latest()
            ->paginate(7, pageName: 'requested_page')
            ->withQueryString();

        return Inertia::render('assets-solicitations/index', [
            'assetsSolicitationsToBeProvided' => Inertia::scroll(fn () => $assetsSolicitationsToBeProvided),
            'assetsSolicitationsRequested' => Inertia::scroll(fn () => $assetsSolicitationsRequested),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    #[Authorize('create', AssetsSolicitation::class)]
    public function create()
    {

        $team_members = Auth::user()
            ->currentTeam
            ->members()
            ->whereNot('user_id', Auth::id())
            ->get()
            ->map(fn ($member) => [
                'id' => $member->id,
                'name' => $member->name,
                'email' => $member->email,
                'avatar' => $member->avatar ?? null,
                'role' => $member->pivot->role->value,
                'role_label' => $member->pivot->role?->label(),
            ]);

        return Inertia::render('assets-solicitations/create', [
            'team_members' => $team_members,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreAssetsSolicitationRequest $request)
    {
        $user = $request->user();
        $teamId = $user->currentTeam->id;

        $attributes = $request
            ->safe()
            ->merge([
                'team_id' => $teamId,
            ])
            ->all();

        $assetsSolicitation = DB::transaction(function () use ($user, $attributes) {
            $solicitation = $user->assetsSolicitationsRequested()->create($attributes);
            $solicitation->assets()->createMany($attributes['assets']);

            return $solicitation;
        });

        User::find($assetsSolicitation->provider_id)?->notify(new AssetsSolicitationSended($assetsSolicitation));

        Inertia::flash('toast', ['type' => 'success', 'message' => __('Assets solicitation created successfully.')]);

        return to_route('assets-solicitations.index');
    }

    /**
     * Display the specified resource.
     */
    #[Authorize('view', ['assetsSolicitation'])]
    public function show(Team $current_team, AssetsSolicitation $assetsSolicitation)
    {
        $assetsSolicitation->load(['requester', 'provider', 'assets']);

        return Inertia::render('assets-solicitations/show', [
            'assetsSolicitation' => $assetsSolicitation,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    #[Authorize('update', ['assetsSolicitation'])]
    public function edit(Team $current_team, AssetsSolicitation $assetsSolicitation)
    {
        $assetsSolicitation->load(['requester', 'provider', 'assets']);

        $team_members = Auth::user()
            ->currentTeam
            ->members()
            ->whereNot('user_id', Auth::id())
            ->get()
            ->map(fn ($member) => [
                'id' => $member->id,
                'name' => $member->name,
                'email' => $member->email,
                'avatar' => $member->avatar ?? null,
                'role' => $member->pivot->role->value,
                'role_label' => $member->pivot->role?->label(),
            ]);

        return Inertia::render('assets-solicitations/edit', [
            'assetsSolicitation' => $assetsSolicitation,
            'team_members' => $team_members,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateAssetsSolicitationRequest $request, Team $current_team, AssetsSolicitation $assetsSolicitation)
    {
        if ($request->provider_id !== $assetsSolicitation->provider_id) {
            User::find($request->provider_id)->notify(new AssetsSolicitationSended($assetsSolicitation));
        }

        $assetsSolicitation->update($request->safe()->all());

        Inertia::flash('toast', ['type' => 'success', 'message' => __('Assets solicitation updated successfully.')]);

        return to_route('assets-solicitations.edit', [
            'current_team' => $current_team->slug,
            'assetsSolicitation' => $assetsSolicitation->id,
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    #[Authorize('delete', ['assetsSolicitation'])]
    public function destroy(Team $current_team, AssetsSolicitation $assetsSolicitation)
    {
        $assetsSolicitation->delete();

        Inertia::flash('success', __('Assets solicitation deleted successfully.'));

        return to_route('assets-solicitations.index', [
            'current_team' => $current_team->slug,
        ]);
    }
}
