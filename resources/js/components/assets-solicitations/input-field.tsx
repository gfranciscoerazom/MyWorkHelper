import { toDottedName } from "@/lib/utils";
import { useFormContext } from "@inertiajs/react";
import type { ComponentPropsWithoutRef, JSX, ReactNode } from "react";
import InputError from "../input-error";
import { Field, FieldDescription, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectGroup, SelectTrigger, SelectValue } from "../ui/select";
import { Textarea } from "../ui/textarea";

type InputFieldProps = {
    readonly name: string;
    readonly type: string;
    readonly label: string;
    readonly description?: string;
    readonly tabIndex?: number;
    readonly placeholder: string;
    readonly autoFocus?: boolean;
    readonly min?: number;
    readonly children?: ReactNode;
};

type SharedFieldProps = ComponentPropsWithoutRef<typeof Input> &
    ComponentPropsWithoutRef<typeof Textarea> &
    ComponentPropsWithoutRef<typeof Select>;

export function InputField({
    name,
    type,
    label,
    description = "",
    tabIndex,
    placeholder,
    autoFocus = false,
    children,
    ...rest
}: InputFieldProps & Partial<SharedFieldProps>) {
    const form = useFormContext();

    if (!form) {
        throw new Error("InputField must be used within a FormProvider");
    }

    const dottedName = toDottedName(name);

    const { errors, validate, invalid } = form;

    const renderers: Record<string, JSX.Element> = {
        textarea: (
            <Textarea
                id={name}
                name={name}
                autoFocus={autoFocus}
                tabIndex={tabIndex}
                onBlur={() => validate(dottedName)}
                aria-invalid={invalid(dottedName)}
                autoComplete={name}
                placeholder={placeholder}
                {...rest}
            />
        ),
        select: (
            <Select
                name={name}
                autoComplete={name}
                aria-invalid={invalid(dottedName)}
                {...rest}
            >
                <SelectTrigger id={name} tabIndex={tabIndex} autoFocus={autoFocus}>
                    <SelectValue placeholder={placeholder} />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        {children}
                    </SelectGroup>
                </SelectContent>
            </Select>
        ),
        // toggles: (),
        default: (
            <Input
                id={name}
                name={name}
                autoFocus={autoFocus}
                tabIndex={tabIndex}
                onBlur={() => validate(dottedName)}
                aria-invalid={invalid(dottedName)}
                type={type}
                autoComplete={name}
                placeholder={placeholder}
                {...rest}
            />
        ),
    };

    return (
        <Field data-invalid={invalid(dottedName)}>
            <FieldLabel htmlFor={name}>{label}</FieldLabel>
            {renderers[type] ?? renderers.default}
            <FieldDescription>{description}</FieldDescription>
            <InputError message={errors[dottedName]} className="mt-2" />
        </Field>
    );
}