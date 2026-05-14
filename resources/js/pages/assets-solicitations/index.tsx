import { Head, InfiniteScroll, Link, router, usePage } from '@inertiajs/react';
import { Image, Plus } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import {
    Empty,
    EmptyContent,
    EmptyDescription,
    EmptyHeader,
    EmptyMedia,
    EmptyTitle,
} from '@/components/ui/empty';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import assetsSolicitations from '@/routes/assets-solicitations';
import type { AssetsSolicitations } from '@/types';

export default function IndexAssetsSolicitations({
    assetsSolicitationsToBeProvided,
    assetsSolicitationsRequested,
}: {
    assetsSolicitationsToBeProvided: AssetsSolicitations;
    assetsSolicitationsRequested: AssetsSolicitations;
}) {
    const { currentTeam } = usePage().props;

    if (!currentTeam) {
        return router.visit('/', { replace: true });
    }

    const createAssetsSolicitationUrl = assetsSolicitations.create(
        currentTeam.slug,
    );

    return (
        <>
            <Head title="Inbox | Assets Solicitations" />
            <div className="p-4">
                <div className="flex items-center justify-end">
                    <Button asChild>
                        <Link href={createAssetsSolicitationUrl} prefetch>
                            <Plus />
                            New Asset Solicitation
                        </Link>
                    </Button>
                </div>
                <Tabs defaultValue="assets-to-be-provided">
                    <TabsList variant="line" className="mb-4">
                        <TabsTrigger value="assets-to-be-provided">
                            Assets To Be Provided
                        </TabsTrigger>
                        <TabsTrigger value="assets-solicitations">
                            Assets Solicitations
                        </TabsTrigger>
                    </TabsList>
                    <TabsContent value="assets-to-be-provided">
                        {assetsSolicitationsToBeProvided.data.length < 1 ? (
                            <Empty>
                                <EmptyHeader>
                                    <EmptyMedia variant="icon">
                                        <Image />
                                    </EmptyMedia>
                                    <EmptyTitle>
                                        No Assets Solicitations Yet
                                    </EmptyTitle>
                                    <EmptyDescription>
                                        You don&apos;t have pending assets
                                        solicitations. Check back later.
                                    </EmptyDescription>
                                </EmptyHeader>
                            </Empty>
                        ) : (
                            <InfiniteScroll data="assetsSolicitationsToBeProvided">
                                <div className="grid auto-rows-min gap-4 md:grid-cols-2">
                                    {assetsSolicitationsToBeProvided.data.map(
                                        (solicitation) => (
                                            <Card
                                                key={solicitation.id}
                                                className="mx-auto w-full justify-between"
                                            >
                                                <CardHeader>
                                                    <Badge variant="secondary">
                                                        {solicitation.status}
                                                    </Badge>
                                                    <CardTitle>
                                                        {solicitation.title}
                                                    </CardTitle>
                                                    <CardDescription>
                                                        Sended by{' '}
                                                        {
                                                            solicitation
                                                                .requester.name
                                                        }
                                                        .<br />
                                                        {solicitation
                                                            .description
                                                            .length > 100
                                                            ? solicitation.description.substring(
                                                                  0,
                                                                  100,
                                                              ) + '...'
                                                            : solicitation.description}
                                                    </CardDescription>
                                                </CardHeader>
                                                {/* <CardContent>
                                                    </CardContent> */}
                                                <CardFooter>
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        className="w-full"
                                                        asChild
                                                    >
                                                        <Link
                                                            href={assetsSolicitations.show(
                                                                {
                                                                    current_team:
                                                                        currentTeam.slug,
                                                                    assetsSolicitation:
                                                                        solicitation.id,
                                                                },
                                                            )}
                                                            prefetch
                                                        >
                                                            View Details
                                                        </Link>
                                                    </Button>
                                                </CardFooter>
                                            </Card>
                                        ),
                                    )}
                                </div>
                            </InfiniteScroll>
                        )}
                    </TabsContent>
                    <TabsContent value="assets-solicitations">
                        {assetsSolicitationsRequested.data.length < 1 ? (
                            <Empty>
                                <EmptyHeader>
                                    <EmptyMedia variant="icon">
                                        <Image />
                                    </EmptyMedia>
                                    <EmptyTitle>
                                        No Assets Solicitations Created Yet
                                    </EmptyTitle>
                                    <EmptyDescription>
                                        You don&apos;t have created any
                                        solicitations yet. Create your first
                                        one.
                                    </EmptyDescription>
                                </EmptyHeader>
                                <EmptyContent className="flex-row justify-center gap-2">
                                    <Button asChild>
                                        <Link
                                            href={createAssetsSolicitationUrl}
                                            prefetch
                                        >
                                            Create Asset Solicitation
                                        </Link>
                                    </Button>
                                </EmptyContent>
                            </Empty>
                        ) : (
                            <InfiniteScroll data="assetsSolicitationsRequested">
                                <div className="grid auto-rows-min gap-4 md:grid-cols-2">
                                    {assetsSolicitationsRequested.data.map(
                                        (solicitation) => (
                                            <Card
                                                key={solicitation.id}
                                                className="mx-auto w-full justify-between"
                                            >
                                                <CardHeader>
                                                    <Badge variant="secondary">
                                                        {solicitation.status}
                                                    </Badge>
                                                    <CardTitle>
                                                        {solicitation.title}
                                                    </CardTitle>
                                                    <CardDescription>
                                                        Requested to{' '}
                                                        {
                                                            solicitation
                                                                .provider.name
                                                        }
                                                        .<br />
                                                        {solicitation
                                                            .description
                                                            .length > 100
                                                            ? solicitation.description.substring(
                                                                  0,
                                                                  100,
                                                              ) + '...'
                                                            : solicitation.description}
                                                    </CardDescription>
                                                </CardHeader>
                                                {/* <CardContent>
                                                    </CardContent> */}
                                                <CardFooter>
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        className="w-full"
                                                        asChild
                                                    >
                                                        <Link
                                                            href={assetsSolicitations.edit(
                                                                {
                                                                    current_team:
                                                                        currentTeam.slug,
                                                                    assetsSolicitation:
                                                                        solicitation.id,
                                                                },
                                                            )}
                                                            prefetch
                                                        >
                                                            Edit Solicitation
                                                        </Link>
                                                    </Button>
                                                </CardFooter>
                                            </Card>
                                        ),
                                    )}
                                </div>
                            </InfiniteScroll>
                        )}
                    </TabsContent>
                </Tabs>
            </div>
        </>
    );
}

IndexAssetsSolicitations.layout = (props: {
    currentTeam?: {
        slug: string;
    } | null;
}) => ({
    breadcrumbs: [
        {
            title: 'Assets Solicitations',
            href: props.currentTeam
                ? assetsSolicitations.index(props.currentTeam.slug)
                : '/',
        },
    ],
});
