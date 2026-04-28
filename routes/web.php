<?php

use App\Http\Controllers\AssetsSolicitationController;
use App\Http\Controllers\Teams\TeamInvitationController;
use App\Http\Middleware\EnsureTeamMembership;
use Illuminate\Foundation\Http\Middleware\HandlePrecognitiveRequests;
use Illuminate\Support\Facades\Route;
use Laravel\Fortify\Features;

Route::inertia('/', 'welcome', [
    'canRegister' => Features::enabled(Features::registration()),
])->name('home');

Route::prefix('{current_team}')
    ->middleware(['auth', 'verified', EnsureTeamMembership::class])
    ->group(function () {
        Route::inertia('dashboard', 'dashboard')->name('dashboard');

        Route::get('assets-solicitations', [AssetsSolicitationController::class, 'index'])->name('assets-solicitations.index');
        Route::get('assets-solicitations/create', [AssetsSolicitationController::class, 'create'])->name('assets-solicitations.create');
        Route::post('assets-solicitations', [AssetsSolicitationController::class, 'store'])->name('assets-solicitations.store')->middleware([HandlePrecognitiveRequests::class]);
        Route::get('assets-solicitations/{assetsSolicitation}', [AssetsSolicitationController::class, 'show'])->name('assets-solicitations.show');
        Route::get('assets-solicitations/{assetsSolicitation}/edit', [AssetsSolicitationController::class, 'edit'])->name('assets-solicitations.edit');
        Route::put('assets-solicitations/{assetsSolicitation}', [AssetsSolicitationController::class, 'update'])->name('assets-solicitations.update')->middleware([HandlePrecognitiveRequests::class]);
        Route::delete('assets-solicitations/{assetsSolicitation}', [AssetsSolicitationController::class, 'destroy'])->name('assets-solicitations.destroy');
    });

Route::middleware(['auth'])->group(function () {
    Route::get('invitations/{invitation}/accept', [TeamInvitationController::class, 'accept'])->name('invitations.accept');
});

require __DIR__.'/settings.php';
