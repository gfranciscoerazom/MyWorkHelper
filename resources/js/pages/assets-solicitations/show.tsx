import { Head } from '@inertiajs/react';
import { Badge } from '@/components/ui/badge';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import assetsSolicitations from '@/routes/assets-solicitations';
import type { AssetsSolicitation } from '@/types';

export default function ShowAssetsSolicitation({
    assetsSolicitation,
}: {
    assetsSolicitation: AssetsSolicitation;
}) {
    return (
        <>
            <Head
                title={`${assetsSolicitation.title} | Assets Solicitations`}
            />
            <div className="p-4">
                <Card
                    key={assetsSolicitation.id}
                    className="mx-auto w-full justify-between"
                >
                    <CardHeader>
                        <Badge variant="secondary">
                            {assetsSolicitation.status}
                        </Badge>
                        <CardTitle>{assetsSolicitation.title}</CardTitle>
                        <CardDescription>
                            Requested by: {assetsSolicitation.requester.name}
                            <br />
                            {assetsSolicitation.files_uploaded_at
                                ? `Provided by: ${assetsSolicitation.provider.name}`
                                : `Responsable to provide: ${assetsSolicitation.provider.name}`}
                            <br />
                            Created at:{' '}
                            {new Date(
                                assetsSolicitation.created_at,
                            ).toLocaleString()}
                            <br />
                            {/* Created at: {Temporal.Instant.from(assetsSolicitation.created_at)
                                .toLocaleString(undefined, { timeZone: Temporal.Now.timeZoneId() })}<br /> */}
                            Last updated at:{' '}
                            {new Date(
                                assetsSolicitation.updated_at,
                            ).toLocaleString()}
                            <br />
                            {assetsSolicitation.files_uploaded_at &&
                                `Files uploaded at: ${new Date(assetsSolicitation.files_uploaded_at).toLocaleString()}`}
                        </CardDescription>
                    </CardHeader>
                    <CardContent>{assetsSolicitation.description}</CardContent>
                </Card>
            </div>
        </>
    );
}

ShowAssetsSolicitation.layout = (props: {
    currentTeam?: {
        slug: string;
    } | null;
    assetsSolicitation: AssetsSolicitation;
}) => ({
    breadcrumbs: [
        {
            title: 'Assets Solicitations',
            href: props.currentTeam
                ? assetsSolicitations.index(props.currentTeam.slug)
                : '/',
        },
        {
            title: props.assetsSolicitation.title,
            href: props.currentTeam
                ? assetsSolicitations.show({
                      current_team: props.currentTeam.slug,
                      assetsSolicitation: props.assetsSolicitation.id,
                  })
                : '/',
        },
    ],
});
