<?php

namespace App\Enums;

enum AssetsSolicitationStatus: string
{
    case PENDING = 'pending';
    case COMPLETED = 'completed';
    case REJECTED = 'rejected';

    // public function label(): string
    // {
    //     return match ($this) {
    //         self::PENDING => 'Pendente',
    //         self::COMPLETED => 'Concluída',
    //         self::REJECTED => 'Rejeitada',
    //     };
    // }
}
