import { ComponentPropsWithoutRef, ReactNode } from "react";
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Switch } from "../ui/switch";

type SwitchContainerProps = {
    readonly name: string;
    readonly title: string;
    readonly description: string;
    readonly disabledCard?: boolean;
    readonly children?: ReactNode;
};

type SharedFieldProps = ComponentPropsWithoutRef<typeof Switch>;

export function SwitchContainer({ name, title, description, disabledCard, children, ...rest }: SwitchContainerProps & Partial<SharedFieldProps>) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>{title}</CardTitle>
                <CardDescription>
                    {description}
                </CardDescription>
                <CardAction>
                    <Switch
                        id={name}
                        name={!children ? name : undefined}
                        {...rest}
                    />
                </CardAction>
            </CardHeader>
            {children && (
                <CardContent hidden={disabledCard}>
                    {children}
                </CardContent>
            )}
        </Card>
    );
}