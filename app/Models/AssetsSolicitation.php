<?php

namespace App\Models;

use App\Enums\AssetsSolicitationStatus;
use Database\Factories\AssetsSolicitationFactory;
use Dyrynda\Database\Support\CascadeSoftDeletes;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

#[Fillable([
    'title',
    'description',
    'status',
    'requester_id',
    'provider_id',
    'team_id',
    'files_uploaded_at',
])]
class AssetsSolicitation extends Model
{
    /**
     * @use HasFactory<AssetsSolicitationFactory>
     * @use SoftDeletes
     * */
    use CascadeSoftDeletes, HasFactory, SoftDeletes;

    /**
     * The relationships that should be soft deleted.
     */
    protected $cascadeDeletes = ['assets'];

    /**
     * Requester (user who asked for the asset).
     */
    public function requester(): BelongsTo
    {
        return $this->belongsTo(User::class, 'requester_id');
    }

    /**
     * Provider (user who will provide the asset).
     */
    public function provider(): BelongsTo
    {
        return $this->belongsTo(User::class, 'provider_id');
    }

    /**
     * Team to which the solicitation belongs.
     */
    public function team(): BelongsTo
    {
        return $this->belongsTo(Team::class);
    }

    /**
     * Get the assets associated with the solicitation.
     */
    public function assets(): HasMany
    {
        return $this->hasMany(Asset::class);
    }

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'status' => AssetsSolicitationStatus::class,
        ];
    }
}
