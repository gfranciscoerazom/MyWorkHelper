import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import { useState } from 'react';
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '../ui/card';
import { Switch } from '../ui/switch';

type SwitchContainerProps = {
    readonly name: string;
    readonly title: string;
    readonly description: string;
    readonly children?: ReactNode;
};

type SharedFieldProps = ComponentPropsWithoutRef<typeof Switch>;

export function SwitchContainer({
    name,
    title,
    description,
    children,
    ...rest
}: SwitchContainerProps & Partial<SharedFieldProps>) {
    const [isChecked, setIsChecked] = useState<boolean>(
        rest.defaultChecked ?? false,
    );

    return (
        <Card>
            <CardHeader>
                <CardTitle>{title}</CardTitle>
                <CardDescription>{description}</CardDescription>
                <CardAction>
                    <Switch
                        id={name}
                        name={!children ? name : undefined}
                        checked={isChecked}
                        onCheckedChange={setIsChecked}
                        {...rest}
                    />
                </CardAction>
            </CardHeader>
            {children && isChecked && <CardContent>{children}</CardContent>}
        </Card>
    );
}
