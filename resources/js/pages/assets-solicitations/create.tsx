import { InputField } from '@/components/assets-solicitations/input-field';
import { SwitchContainer } from '@/components/assets-solicitations/switch-container';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Field, FieldDescription, FieldGroup, FieldLegend, FieldSeparator, FieldSet } from '@/components/ui/field';
import { SelectItem } from '@/components/ui/select';
import { Spinner } from '@/components/ui/spinner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { home } from '@/routes';
import assetsSolicitations from '@/routes/assets-solicitations';
import type { TeamMember } from '@/types';
import { Form, Head, Link, router, usePage } from '@inertiajs/react';
import { Minus, Plus } from 'lucide-react';
import { useState } from 'react';

type CreateAssetsSolicitationProps = {
    readonly team_members: TeamMember[];
};

export default function CreateAssetsSolicitation({ team_members }: CreateAssetsSolicitationProps) {
    const { currentTeam } = usePage().props;

    if (!currentTeam) {
        return router.visit(home(), { replace: true });
    }

    const [assetsFieldsSettings, setAssetsFieldsSettings] = useState([
        {
            required: true,
            size: true,
            dimensions: true,
            extension: true,
            quantity: true,
        }
    ]);

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
                                <FieldLegend>Create Assets Solicitation</FieldLegend>
                                <FieldDescription>
                                    Fill out the form below to create a new assets solicitation.
                                </FieldDescription>
                                <FieldGroup>
                                    {/* Title */}
                                    <InputField
                                        name="title"
                                        type="text"
                                        label="Title of the solicitation"
                                        description="Provide a concise and descriptive title for your solicitation."
                                        tabIndex={1}
                                        placeholder="E.g., Request for New Laptop Photo"
                                        autoFocus
                                    />
                                    {/* Description */}
                                    <InputField
                                        name="description"
                                        type="textarea"
                                        label="Description of the solicitation"
                                        description="Provide a detailed description of the solicitation, including any specific requirements or information."
                                        tabIndex={2}
                                        placeholder="Enter a detailed description of the solicitation"
                                    />
                                    {/* Person that need to provide the assets */}
                                    <InputField
                                        name="provider_id"
                                        type="select"
                                        label="Person responsible for providing the assets"
                                        description="Select the person responsible for providing the assets."
                                        tabIndex={3}
                                        placeholder="Select a person"
                                    >
                                        {team_members.map((member) => (
                                            <SelectItem key={member.id} value={member.id.toString()}>
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
                                    Specify the assets you need for this solicitation. You can add multiple assets by clicking the "Add" button.
                                </FieldDescription>
                                {
                                    assetsFieldsSettings.map((settings, index) => (
                                        <Card key={index}>
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
                                                        {/* Asset Requirements */}
                                                        <SwitchContainer
                                                            name={`assets[${index}][validation_rules][required]`}
                                                            title="Required"
                                                            description="Toggle whether this asset is required or optional for the solicitation."
                                                            defaultChecked={settings.required}
                                                            onCheckedChange={(checked) => {
                                                                setAssetsFieldsSettings((prev) => {
                                                                    const newSettings = [...prev];
                                                                    newSettings[index].required = checked;
                                                                    return newSettings;
                                                                });
                                                            }}
                                                        />
                                                        {/* Asset Size */}
                                                        <SwitchContainer
                                                            name={`assets[${index}][validation_rules][size]`}
                                                            title="Allowed Size"
                                                            description="Toggle whether you want to specify allowed file sizes for this asset."
                                                            defaultChecked={settings.size}
                                                            disabledCard={!settings.size}
                                                            onCheckedChange={(checked) => {
                                                                setAssetsFieldsSettings((prev) => {
                                                                    const newSettings = [...prev];
                                                                    newSettings[index].size = checked;
                                                                    return newSettings;
                                                                });
                                                            }}
                                                        >
                                                            <Tabs defaultValue="one-value">
                                                                <TabsContent value="one-value">
                                                                    <InputField
                                                                        name={`assets[${index}][validation_rules][size][value]`}
                                                                        type="number"
                                                                        label="Size (KB)"
                                                                        description="Specify the file size in KB for this asset."
                                                                        placeholder="0"
                                                                        min={1}
                                                                        disabled={!settings.size}
                                                                    />
                                                                </TabsContent>
                                                                <TabsContent value="range" className="grid md:grid-cols-2 gap-4">
                                                                    <InputField
                                                                        name={`assets[${index}][validation_rules][size][minimum]`}
                                                                        type="number"
                                                                        label="Minimum Size (KB)"
                                                                        description="Specify the minimum file size in KB for this asset."
                                                                        placeholder="0"
                                                                        min={1}
                                                                        disabled={!settings.size}
                                                                    />
                                                                    <InputField
                                                                        name={`assets[${index}][validation_rules][size][maximum]`}
                                                                        type="number"
                                                                        label="Maximum Size (KB)"
                                                                        description="Specify the maximum file size in KB for this asset."
                                                                        placeholder="0"
                                                                        min={1}
                                                                        disabled={!settings.size}
                                                                    />
                                                                </TabsContent>
                                                                <TabsList>
                                                                    <TabsTrigger value="one-value">One Value</TabsTrigger>
                                                                    <TabsTrigger value="range">Range</TabsTrigger>
                                                                </TabsList>
                                                            </Tabs>
                                                        </SwitchContainer>
                                                        {/* Asset Dimensions */}
                                                        <SwitchContainer
                                                            name={`assets[${index}][validation_rules][dimensions]`}
                                                            title="Dimensions"
                                                            description="Toggle whether you want to specify a minimum and maximum dimensions in pixels for this asset."
                                                            defaultChecked={settings.dimensions}
                                                            disabledCard={!settings.dimensions}
                                                            onCheckedChange={(checked) => {
                                                                setAssetsFieldsSettings((prev) => {
                                                                    const newSettings = [...prev];
                                                                    newSettings[index].dimensions = checked;
                                                                    return newSettings;
                                                                });
                                                            }}
                                                        >
                                                            <Tabs defaultValue="one-value">
                                                                <TabsContent value="one-value" className="grid md:grid-cols-2 gap-4">
                                                                    <InputField
                                                                        name={`assets[${index}][validation_rules][dimensions][width]`}
                                                                        type="number"
                                                                        label="Width"
                                                                        description="Specify the width in pixels for this asset."
                                                                        placeholder="0"
                                                                        min={1}
                                                                        disabled={!settings.dimensions}
                                                                    />
                                                                    <InputField
                                                                        name={`assets[${index}][validation_rules][dimensions][height]`}
                                                                        type="number"
                                                                        label="Height"
                                                                        description="Specify the height in pixels for this asset."
                                                                        placeholder="0"
                                                                        min={1}
                                                                        disabled={!settings.dimensions}
                                                                    />
                                                                </TabsContent>
                                                                <TabsContent value="range" className="grid md:grid-cols-2 gap-4">
                                                                    <InputField
                                                                        name={`assets[${index}][validation_rules][dimensions][min_width]`}
                                                                        type="number"
                                                                        label="Min Width"
                                                                        description="Specify the minimum width in pixels for this asset."
                                                                        placeholder="0"
                                                                        min={1}
                                                                        disabled={!settings.dimensions}
                                                                    />
                                                                    <InputField
                                                                        name={`assets[${index}][validation_rules][dimensions][max_width]`}
                                                                        type="number"
                                                                        label="Max Width"
                                                                        description="Specify the maximum width in pixels for this asset."
                                                                        placeholder="0"
                                                                        min={1}
                                                                        disabled={!settings.dimensions}
                                                                    />
                                                                    <InputField
                                                                        name={`assets[${index}][validation_rules][dimensions][min_height]`}
                                                                        type="number"
                                                                        label="Min Height"
                                                                        description="Specify the minimum height in pixels for this asset."
                                                                        placeholder="0"
                                                                        min={1}
                                                                        disabled={!settings.dimensions}
                                                                    />
                                                                    <InputField
                                                                        name={`assets[${index}][validation_rules][dimensions][max_height]`}
                                                                        type="number"
                                                                        label="Max Height"
                                                                        description="Specify the maximum height in pixels for this asset."
                                                                        placeholder="0"
                                                                        min={1}
                                                                        disabled={!settings.dimensions}
                                                                    />
                                                                </TabsContent>
                                                                <TabsContent value="ratio" className="grid md:grid-cols-2 gap-4">
                                                                    <InputField
                                                                        name={`assets[${index}][validation_rules][dimensions][ratio][numerator]`}
                                                                        type="number"
                                                                        label="Ratio Numerator"
                                                                        description="Specify the ratio numerator (e.g., for a 16:9 ratio, the numerator is 16)."
                                                                        placeholder="0"
                                                                        min={1}
                                                                        disabled={!settings.dimensions}
                                                                    />
                                                                    <InputField
                                                                        name={`assets[${index}][validation_rules][dimensions][ratio][denominator]`}
                                                                        type="number"
                                                                        label="Ratio Denominator"
                                                                        description="Specify the ratio denominator (e.g., for a 16:9 ratio, the denominator is 9)."
                                                                        placeholder="0"
                                                                        min={1}
                                                                        disabled={!settings.dimensions}
                                                                    />
                                                                </TabsContent>
                                                                <TabsList>
                                                                    <TabsTrigger value="one-value">One Value</TabsTrigger>
                                                                    <TabsTrigger value="range">Range</TabsTrigger>
                                                                    <TabsTrigger value="ratio">Aspect Ratio</TabsTrigger>
                                                                </TabsList>
                                                            </Tabs>
                                                        </SwitchContainer>
                                                        {/* Asset Quantity */}
                                                        <SwitchContainer
                                                            name={`assets[${index}][validation_rules][quantity]`}
                                                            title="Quantity"
                                                            description="Toggle whether you want to specify a quantity for this asset."
                                                            defaultChecked={settings.quantity}
                                                            disabledCard={!settings.quantity}
                                                            onCheckedChange={(checked) => {
                                                                setAssetsFieldsSettings((prev) => {
                                                                    const newSettings = [...prev];
                                                                    newSettings[index].quantity = checked;
                                                                    return newSettings;
                                                                });
                                                            }}
                                                        >
                                                            <Tabs defaultValue="one-value">
                                                                <TabsContent value="one-value">
                                                                    <InputField
                                                                        name={`assets[${index}][validation_rules][quantity][value]`}
                                                                        type="number"
                                                                        label="Quantity"
                                                                        description="Specify the quantity for this asset."
                                                                        placeholder="0"
                                                                        min={1}
                                                                        disabled={!settings.quantity}
                                                                    />
                                                                </TabsContent>
                                                                <TabsContent value="range" className="grid md:grid-cols-2 gap-4">
                                                                    <InputField
                                                                        name={`assets[${index}][validation_rules][quantity][minimum]`}
                                                                        type="number"
                                                                        label="Minimum Quantity"
                                                                        description="Specify the minimum quantity for this asset."
                                                                        placeholder="0"
                                                                        min={1}
                                                                        disabled={!settings.quantity}
                                                                    />
                                                                    <InputField
                                                                        name={`assets[${index}][validation_rules][quantity][maximum]`}
                                                                        type="number"
                                                                        label="Maximum Quantity"
                                                                        description="Specify the maximum quantity for this asset."
                                                                        placeholder="0"
                                                                        min={1}
                                                                        disabled={!settings.quantity}
                                                                    />
                                                                </TabsContent>
                                                                <TabsList>
                                                                    <TabsTrigger value="one-value">One Value</TabsTrigger>
                                                                    <TabsTrigger value="range">Range</TabsTrigger>
                                                                </TabsList>
                                                            </Tabs>
                                                        </SwitchContainer>
                                                        {/* Asset Allowed Extensions */}
                                                        <SwitchContainer
                                                            name={`assets[${index}][validation_rules][extension]`}
                                                            title="Allowed Extensions"
                                                            description="Toggle whether you want to specify allowed file extensions for this asset."
                                                            defaultChecked={settings.extension}
                                                            disabledCard={!settings.extension}
                                                            onCheckedChange={(checked) => {
                                                                setAssetsFieldsSettings((prev) => {
                                                                    const newSettings = [...prev];
                                                                    newSettings[index].extension = checked;
                                                                    return newSettings;
                                                                });
                                                            }}
                                                        >
                                                            <InputField
                                                                name={`assets[${index}][validation_rules][extension][allowed]`}
                                                                type="text"
                                                                label="Allowed Extensions"
                                                                description="Specify the allowed file extensions for this asset, separated by commas (e.g., jpg, png, pdf)."
                                                                placeholder="E.g., jpg, png, pdf"
                                                                disabled={!settings.extension}
                                                            />
                                                        </SwitchContainer>
                                                    </FieldGroup>
                                                </FieldGroup>
                                            </CardContent>
                                        </Card>
                                    ))
                                }
                                <Field orientation="horizontal">
                                    <Button type="button" onClick={() => setAssetsFieldsSettings((prev) => [
                                        ...prev,
                                        {
                                            required: true,
                                            size: true,
                                            dimensions: true,
                                            extension: true,
                                            quantity: true,
                                        }
                                    ])}>
                                        <Plus />
                                        Add Another Asset
                                    </Button>
                                    <Button type="button" variant="outline" onClick={() => setAssetsFieldsSettings((prev) => prev.slice(0, -1))} disabled={assetsFieldsSettings.length === 1}>
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
                                    <Link href={assetsSolicitations.index(currentTeam.slug)} prefetch>
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

CreateAssetsSolicitation.layout = (props: { currentTeam?: { slug: string; } | null; }) => ({
    breadcrumbs: [
        {
            title: 'Assets Solicitations',
            href: props.currentTeam ? assetsSolicitations.index(props.currentTeam.slug) : '/',
        },
        {
            title: 'Create',
            href: props.currentTeam ? assetsSolicitations.create(props.currentTeam.slug) : '/',
        }
    ],
});
