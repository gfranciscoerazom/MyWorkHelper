import { ComponentPropsWithoutRef, ReactNode } from "react";
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Switch } from "../ui/switch";

interface SwitchContainerProps {
    name: string;
    title: string;
    description: string;
    disabledCard?: boolean;
    children?: ReactNode;
}

type SharedFieldProps = ComponentPropsWithoutRef<typeof Switch>;

export function SwitchContainer({ name, title, description, disabledCard, children, ...rest }: SwitchContainerProps & Partial<SharedFieldProps>) {
    // TODO Revisar si colocar un scrollarea para no alargar tanto los componentes
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