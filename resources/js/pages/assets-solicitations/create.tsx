import { Form, Head, Link, router, usePage } from '@inertiajs/react';
import { Minus, Plus } from 'lucide-react';
import { useRef, useState } from 'react';
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
import type { TeamMember } from '@/types';

type CreateAssetsSolicitationProps = {
    readonly team_members: TeamMember[];
};

export default function CreateAssetsSolicitation({
    team_members,
}: CreateAssetsSolicitationProps) {
    const { currentTeam } = usePage().props;
    const nextAssetId = useRef(1);

    const [assetsIds, setAssetsIds] = useState(['asset-0']);

    if (!currentTeam) {
        return router.visit(home(), { replace: true });
    }

    return (
        <>
            <Head title="Create | Assets Solicitations" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <Form
                    {...assetsSolicitations.store.form(currentTeam.slug)}
                    resetOnSuccess
                    disableWhileProcessing
                    className="flex flex-col gap-6"
                >
                    {({ processing }) => (
                        <FieldGroup>
                            <FieldSet>
                                <FieldLegend>
                                    Create Assets Solicitation
                                </FieldLegend>
                                <FieldDescription>
                                    Fill out the form below to create a new
                                    assets solicitation.
                                </FieldDescription>
                                <FieldGroup>
                                    {/* Title */}
                                    <InputField
                                        name="title"
                                        type="text"
                                        label="Title of the solicitation"
                                        description="Provide a concise and descriptive title for your solicitation."
                                        placeholder="E.g., Request for New Laptop Photo"
                                    />
                                    {/* Description */}
                                    <InputField
                                        name="description"
                                        type="textarea"
                                        label="Description of the solicitation"
                                        description="Provide a detailed description of the solicitation, including any specific requirements or information."
                                        placeholder="Enter a detailed description of the solicitation"
                                    />
                                    {/* Person that need to provide the assets */}
                                    <InputField
                                        name="provider_id"
                                        type="select"
                                        label="Person responsible for providing the assets"
                                        description="Select the person responsible for providing the assets."
                                        placeholder="Select a person"
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
                                                />
                                                {/* Asset Description */}
                                                <InputField
                                                    name={`assets[${index}][description]`}
                                                    type="textarea"
                                                    label="Description of the asset"
                                                    description="Provide a detailed description of the asset, including any specific requirements or information."
                                                    placeholder="Enter a detailed description of the asset you need"
                                                />
                                                <FieldGroup>
                                                    <SwitchContainer
                                                        name={`assets[${index}][validation_rules][required]`}
                                                        title="Required"
                                                        description="Toggle whether this asset is required or optional for the solicitation."
                                                    />
                                                    <AssetSize index={index} />
                                                    <AssetDimensions
                                                        index={index}
                                                    />
                                                    <AssetQuantity
                                                        index={index}
                                                    />
                                                    <AssetAllowedExtensions
                                                        index={index}
                                                    />
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
                                                `asset-${nextAssetId.current++}`,
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
                                    Send Solicitation
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

CreateAssetsSolicitation.layout = (props: {
    currentTeam?: { slug: string } | null;
}) => ({
    breadcrumbs: [
        {
            title: 'Assets Solicitations',
            href: props.currentTeam
                ? assetsSolicitations.index(props.currentTeam.slug)
                : '/',
        },
        {
            title: 'Create',
            href: props.currentTeam
                ? assetsSolicitations.create(props.currentTeam.slug)
                : '/',
        },
    ],
});
