<?php

namespace App\Notifications\AssetsSolicitation;

use App\Models\AssetsSolicitation;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class AssetsSolicitationSended extends Notification implements ShouldQueue
{
    use Queueable;

    /**
     * Create a new notification instance.
     */
    public function __construct(public AssetsSolicitation $assetsSolicitation)
    {
        //
    }

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['mail'];
    }

    /**
     * Get the mail representation of the notification.
     */
    public function toMail(object $notifiable): MailMessage
    {
        return (new MailMessage)
            ->subject(__('👀 You have a new asset solicitation'))
            ->line(__('The user :requesterName has sent you a new asset solicitation.', [
                'requesterName' => $this->assetsSolicitation->requester->name,
            ]))
            ->action(__('View solicitation'), url(route('assets-solicitations.show', [
                'current_team' => $this->assetsSolicitation->team->slug,
                'assetsSolicitation' => $this->assetsSolicitation->id,
            ])));
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        return [
            'assets_solicitation_id' => $this->assetsSolicitation->id,
            'requester_id' => $this->assetsSolicitation->requester_id,
            'requester_name' => $this->assetsSolicitation->requester->name,
        ];
    }
}
