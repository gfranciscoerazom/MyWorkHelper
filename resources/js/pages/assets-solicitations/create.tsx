import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Field, FieldDescription, FieldGroup, FieldLabel, FieldLegend, FieldSet } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Spinner } from '@/components/ui/spinner';
import { Textarea } from '@/components/ui/textarea';
import { home } from '@/routes';
import assetsSolicitations from '@/routes/assets-solicitations';
import { TeamMember } from '@/types';
import { Form, Head, Link, router, usePage } from '@inertiajs/react';

export default function CreateAssetsSolicitation({ team_members }: { team_members: TeamMember[] }) {
    const { currentTeam } = usePage().props;

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
                    {({ processing, errors, validate, invalid }) => (
                        <FieldGroup>
                            <FieldSet>
                                <FieldLegend>Create Assets Solicitation</FieldLegend>
                                <FieldDescription>
                                    Fill out the form below to create a new assets solicitation.
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
                                            required
                                            autoComplete="provider_id"
                                            aria-invalid={invalid('provider_id')}
                                        >
                                            <SelectTrigger id="provider_id" tabIndex={3}>
                                                <SelectValue placeholder="Select a person" />
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
                                    Send Solicitation
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
        </>
    );
}

CreateAssetsSolicitation.layout = (props: { currentTeam?: { slug: string } | null }) => ({
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
