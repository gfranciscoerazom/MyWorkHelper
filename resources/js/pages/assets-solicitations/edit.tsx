import { AssetAllowedExtensions } from '@/components/assets-solicitations/asset-allowed-extensions';
import { AssetDimensions } from '@/components/assets-solicitations/asset-dimensions';
import { AssetQuantity } from '@/components/assets-solicitations/asset-quantity';
import { AssetSize } from '@/components/assets-solicitations/asset-size';
import { InputField } from '@/components/assets-solicitations/input-field';
import { SwitchContainer } from '@/components/assets-solicitations/switch-container';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardAction,
    CardContent,
    CardHeader,
} from '@/components/ui/card';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLegend,
    FieldSeparator,
    FieldSet,
} from '@/components/ui/field';
import { SelectItem } from '@/components/ui/select';
import { Spinner } from '@/components/ui/spinner';
import { home } from '@/routes';
import assetsSolicitations from '@/routes/assets-solicitations';
import type { AssetsSolicitation, TeamMember } from '@/types';
import { Form, Head, Link, router, usePage } from '@inertiajs/react';
import { Minus, Plus, Trash } from 'lucide-react';
import { useRef, useState } from 'react';

type UpdateAssetsSolicitationProps = {
    readonly team_members: TeamMember[];
    readonly assetsSolicitation: AssetsSolicitation;
};

export default function UpdateAssetsSolicitation({
    team_members,
    assetsSolicitation,
}: UpdateAssetsSolicitationProps) {
    const { currentTeam } = usePage().props;

    const nextAssetId = useRef(0);

    const assetsIdsInit = assetsSolicitation.assets.map(
        (asset) => `asset-${asset.id}`,
    );

    const [assetsIds, setAssetsIds] = useState(assetsIdsInit);

    if (!currentTeam) {
        return router.visit(home(), { replace: true });
    }

    return (
        <>
            <Head title="Update | Assets Solicitations" />
            <div className="m-4 flex items-center justify-end">
                <Dialog>
                    <DialogTrigger asChild>
                        <Button variant="destructive">
                            <Trash />
                            Delete Solicitation
                        </Button>
                    </DialogTrigger>
                    <DialogContent showCloseButton={false}>
                        <DialogHeader>
                            <DialogTitle>
                                ¿Do you want to delete this assets solicitation?
                            </DialogTitle>
                            <DialogDescription>
                                This action cannot be undone. This will
                                permanently delete the assets solicitation.
                            </DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                            <Button variant="destructive" asChild>
                                <Link
                                    href={assetsSolicitations.destroy({
                                        current_team: currentTeam.slug,
                                        assetsSolicitation:
                                            assetsSolicitation.id,
                                    })}
                                >
                                    <Trash />
                                    Delete
                                </Link>
                            </Button>
                            <DialogClose asChild>
                                <Button variant="outline">Cancel</Button>
                            </DialogClose>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <Form
                    {...assetsSolicitations.update.form({
                        current_team: currentTeam.slug,
                        assetsSolicitation: assetsSolicitation.id,
                    })}
                    setDefaultsOnSuccess
                    disableWhileProcessing
                    className="flex flex-col gap-6"
                >
                    {({ processing }) => (
                        <FieldGroup>
                            <FieldSet>
                                <FieldLegend>
                                    Update Assets Solicitation
                                </FieldLegend>
                                <FieldDescription>
                                    Fill out the form below to update the assets
                                    solicitation.
                                </FieldDescription>
                                <FieldGroup>
                                    {/* Title */}
                                    <InputField
                                        name="title"
                                        type="text"
                                        label="Title of the solicitation"
                                        description="Provide a concise and descriptive title for your solicitation."
                                        placeholder="E.g., Request for New Laptop Photo"
                                        defaultValue={assetsSolicitation.title}
                                    />
                                    {/* Description */}
                                    <InputField
                                        name="description"
                                        type="textarea"
                                        label="Description of the solicitation"
                                        description="Provide a detailed description of the solicitation, including any specific requirements or information."
                                        placeholder="Enter a detailed description of the solicitation"
                                        defaultValue={
                                            assetsSolicitation.description
                                        }
                                    />
                                    {/* Person that need to provide the assets */}
                                    <InputField
                                        name="provider_id"
                                        type="select"
                                        label="Person responsible for providing the assets"
                                        description="Select the person responsible for providing the assets."
                                        defaultValue={assetsSolicitation.provider.id.toString()}
                                    >
                                        {team_members.map((member) => (
                                            <SelectItem
                                                key={member.id}
                                                value={member.id.toString()}
                                            >
                                                {member.name} ({member.email})
                                            </SelectItem>
                                        ))}
                                    </InputField>
                                </FieldGroup>
                            </FieldSet>

                            <FieldSeparator />

                            <FieldSet>
                                <FieldLegend>Assets Needed</FieldLegend>
                                <FieldDescription>
                                    Specify the assets you need for this
                                    solicitation. You can add multiple assets by
                                    clicking the "Add" button.
                                </FieldDescription>
                                {assetsIds.map((id, index) => (
                                    <Card key={id}>
                                        <CardHeader>
                                            <CardAction>
                                                <Button
                                                    type="button"
                                                    variant="outline"
                                                    onClick={() =>
                                                        setAssetsIds((prev) =>
                                                            prev.filter(
                                                                (_, i) =>
                                                                    i !== index,
                                                            ),
                                                        )
                                                    }
                                                    disabled={
                                                        assetsIds.length === 1
                                                    }
                                                >
                                                    <Minus />
                                                    Remove
                                                </Button>
                                            </CardAction>
                                        </CardHeader>
                                        <CardContent>
                                            <FieldGroup>
                                                {/* Asset Name */}
                                                <InputField
                                                    name={`assets[${index}][name]`}
                                                    type="text"
                                                    label="Name of the asset"
                                                    description="Provide a concise and descriptive name for your asset  (This name is going to be used when you download the asset after it is provided)."
                                                    placeholder="E.g., Request for New Laptop Photo"
                                                    defaultValue={
                                                        assetsSolicitation
                                                            .assets[index]?.name
                                                    }
                                                />
                                                {/* Asset Description */}
                                                <InputField
                                                    name={`assets[${index}][description]`}
                                                    type="textarea"
                                                    label="Description of the asset"
                                                    description="Provide a detailed description of the asset, including any specific requirements or information."
                                                    placeholder="Enter a detailed description of the asset you need"
                                                    defaultValue={
                                                        assetsSolicitation
                                                            .assets[index]
                                                            ?.description
                                                    }
                                                />
                                                <FieldGroup>
                                                    {/* Asset Requirements */}
                                                    <SwitchContainer
                                                        name={`assets[${index}][validation_rules][required]`}
                                                        title="Required"
                                                        description="Toggle whether this asset is required or optional for the solicitation."
                                                        defaultChecked={
                                                            assetsSolicitation
                                                                .assets[index]
                                                                ?.validation_rules
                                                                ?.required ===
                                                            'on'
                                                        }
                                                    />
                                                    {/* Asset Size */}
                                                    <AssetSize
                                                        index={index}
                                                        assets={
                                                            assetsSolicitation.assets
                                                        }
                                                    />
                                                    {/* Asset Dimensions */}
                                                    <AssetDimensions
                                                        index={index}
                                                        assets={
                                                            assetsSolicitation.assets
                                                        }
                                                    />
                                                    <AssetQuantity
                                                        index={index}
                                                        assets={
                                                            assetsSolicitation.assets
                                                        }
                                                    />
                                                    <AssetAllowedExtensions
                                                        index={index}
                                                        assets={
                                                            assetsSolicitation.assets
                                                        }
                                                    />
                                                    {
                                                        assetsSolicitation.assets[index]?.id && (
                                                            <input type="hidden" name={`assets[${index}][id]`} defaultValue={assetsSolicitation.assets[index].id} />
                                                        )
                                                    }
                                                </FieldGroup>
                                            </FieldGroup>
                                        </CardContent>
                                    </Card>
                                ))}
                                <Field orientation="horizontal">
                                    <Button
                                        type="button"
                                        onClick={() =>
                                            setAssetsIds((prev) => [
                                                ...prev,
                                                `new-asset-${nextAssetId.current++}`,
                                            ])
                                        }
                                    >
                                        <Plus />
                                        Add Another Asset
                                    </Button>
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() =>
                                            setAssetsIds((prev) =>
                                                prev.slice(0, -1),
                                            )
                                        }
                                        disabled={assetsIds.length === 1}
                                    >
                                        <Minus />
                                        Remove Last Asset
                                    </Button>
                                </Field>
                            </FieldSet>
                            <Field orientation="horizontal">
                                <Button type="submit" disabled={processing}>
                                    {processing && <Spinner />}
                                    Update Solicitation
                                </Button>
                                <Button variant="outline" type="button" asChild>
                                    <Link
                                        href={assetsSolicitations.index(
                                            currentTeam.slug,
                                        )}
                                        prefetch
                                    >
                                        Cancel
                                    </Link>
                                </Button>
                            </Field>
                        </FieldGroup>
                    )}
                </Form>
            </div>
        </>
    );
}

UpdateAssetsSolicitation.layout = (props: {
    currentTeam?: { slug: string; } | null;
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
            title: `Edit ${props.assetsSolicitation.title}`,
            href: props.currentTeam
                ? assetsSolicitations.edit({
                    current_team: props.currentTeam.slug,
                    assetsSolicitation: props.assetsSolicitation.id,
                })
                : '/',
        },
    ],
});
