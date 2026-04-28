<?php

use App\Enums\AssetsSolicitationStatus;
use App\Models\Team;
use App\Models\User;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('assets_solicitations', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->text('description');
            $table->enum('status', AssetsSolicitationStatus::cases())->index()->default(AssetsSolicitationStatus::PENDING->value);
            $table->foreignIdFor(User::class, 'requester_id')->index()->constrained('users')->cascadeOnDelete();
            $table->foreignIdFor(User::class, 'provider_id')->index()->constrained('users')->cascadeOnDelete();
            $table->foreignIdFor(Team::class)->index()->constrained('teams')->cascadeOnDelete();
            $table->timestamp('files_uploaded_at')->nullable();
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('assets_solicitations');
    }
};
