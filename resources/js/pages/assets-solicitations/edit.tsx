import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Field, FieldDescription, FieldGroup, FieldLabel, FieldLegend, FieldSet } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Spinner } from '@/components/ui/spinner';
import { Textarea } from '@/components/ui/textarea';
import { home } from '@/routes';
import assetsSolicitations from '@/routes/assets-solicitations';
import type { AssetsSolicitation, TeamMember } from '@/types';
import { Form, Head, Link, router, usePage } from '@inertiajs/react';
import { Trash } from 'lucide-react';

type UpdateAssetsSolicitationProps = {
    readonly team_members: TeamMember[];
    readonly assetsSolicitation: AssetsSolicitation;
};

export default function UpdateAssetsSolicitation({ team_members, assetsSolicitation }: UpdateAssetsSolicitationProps) {
    const { currentTeam } = usePage().props;

    if (!currentTeam) {
        return router.visit(home(), { replace: true });
    }

    return (
        <>
            <Head title="Update | Assets Solicitations" />
            <div className='p-4'>
                <div className="flex items-center justify-end mb-4">
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button variant="destructive">
                                <Trash />
                                Delete Solicitation
                            </Button>
                        </DialogTrigger>
                        <DialogContent showCloseButton={false}>
                            <DialogHeader>
                                <DialogTitle>¿Do you want to delete this assets solicitation?</DialogTitle>
                                <DialogDescription>
                                    This action cannot be undone. This will permanently delete the assets solicitation.
                                </DialogDescription>
                            </DialogHeader>
                            <DialogFooter>
                                <Button variant="destructive" asChild>
                                    <Link href={assetsSolicitations.destroy({
                                        current_team: currentTeam.slug,
                                        assetsSolicitation: assetsSolicitation.id
                                    })}>
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
                            assetsSolicitation: assetsSolicitation.id
                        })}
                        setDefaultsOnSuccess
                        disableWhileProcessing
                        className="flex flex-col gap-6"
                    >
                        {({ processing, errors, validate, invalid }) => (
                            <FieldGroup>
                                <FieldSet>
                                    <FieldLegend>Update Assets Solicitation</FieldLegend>
                                    <FieldDescription>
                                        Fill out the form below to update the assets solicitation.
                                    </FieldDescription>
                                    <FieldGroup>
                                        {/* Title */}
                                        <Field data-invalid={invalid('title')}>
                                            <FieldLabel htmlFor="title">
                                                Title of the solicitation
                                            </FieldLabel>
                                            <Input
                                                id="title"
                                                type='text'
                                                required
                                                autoFocus
                                                tabIndex={1}
                                                autoComplete="title"
                                                name="title"
                                                placeholder="E.g., Request for New Laptop Photo"
                                                defaultValue={assetsSolicitation.title}
                                                onBlur={() => validate('title')}
                                                aria-invalid={invalid('title')}
                                            />
                                            <FieldDescription>
                                                Provide a concise and descriptive title for your solicitation.
                                            </FieldDescription>
                                            <InputError
                                                message={errors.title}
                                                className="mt-2"
                                            />
                                        </Field>
                                        {/* Description */}
                                        <Field data-invalid={invalid('description')}>
                                            <FieldLabel htmlFor="description">
                                                Description of the solicitation
                                            </FieldLabel>
                                            <Textarea
                                                id="description"
                                                required
                                                tabIndex={2}
                                                autoComplete="description"
                                                name="description"
                                                placeholder="Enter a detailed description of the solicitation"
                                                defaultValue={assetsSolicitation.description}
                                                onBlur={() => validate('description')}
                                                aria-invalid={invalid('description')}
                                            />
                                            <FieldDescription>
                                                Provide a detailed description of the solicitation, including any specific requirements or information.
                                            </FieldDescription>
                                            <InputError
                                                message={errors.description}
                                                className="mt-2"
                                            />
                                        </Field>
                                        {/* Person that need to provide the assets */}
                                        <Field data-invalid={invalid('provider_id')}>
                                            <FieldLabel htmlFor="provider_id">
                                                Person responsible for providing the assets
                                            </FieldLabel>
                                            <Select
                                                name="provider_id"
                                                autoComplete="provider_id"
                                                defaultValue={assetsSolicitation.provider.id.toString()}
                                                aria-invalid={invalid('provider_id')}
                                            >
                                                <SelectTrigger id="provider_id" tabIndex={3}>
                                                    <SelectValue />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectGroup>
                                                        {team_members.map((member) => (
                                                            <SelectItem key={member.id} value={member.id.toString()}>
                                                                {member.name} ({member.email})
                                                            </SelectItem>
                                                        ))}
                                                    </SelectGroup>
                                                </SelectContent>
                                            </Select>
                                            <FieldDescription>
                                                Select the person responsible for providing the assets.
                                            </FieldDescription>
                                            <InputError
                                                message={errors.provider_id}
                                                className="mt-2"
                                            />
                                        </Field>
                                    </FieldGroup>
                                </FieldSet>
                                <Field orientation="horizontal">
                                    <Button type="submit" tabIndex={4} disabled={processing}>
                                        {processing && <Spinner />}
                                        Update Solicitation
                                    </Button>
                                    <Button variant="outline" type="button" tabIndex={5} asChild>
                                        <Link href={assetsSolicitations.index(currentTeam.slug)} prefetch>
                                            Cancel
                                        </Link>
                                    </Button>
                                </Field>
                            </FieldGroup>
                        )}
                    </Form>
                </div>
            </div>
        </>
    );
}

UpdateAssetsSolicitation.layout = (props: { currentTeam?: { slug: string; } | null, assetsSolicitation: AssetsSolicitation; }) => ({
    breadcrumbs: [
        {
            title: 'Assets Solicitations',
            href: props.currentTeam ? assetsSolicitations.index(props.currentTeam.slug) : '/',
        },
        {
            title: `Edit ${props.assetsSolicitation.title}`,
            href: props.currentTeam ? assetsSolicitations.edit({
                current_team: props.currentTeam.slug,
                assetsSolicitation: props.assetsSolicitation.id
            }) : '/',
        }
    ],
});

