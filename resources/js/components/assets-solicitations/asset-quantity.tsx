import type { Asset } from '@/types';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { InputField } from './input-field';
import { SwitchContainer } from './switch-container';

export function AssetQuantity({
    index,
    assets,
}: {
    index: number;
    assets?: Asset[];
}) {
    return (
        <SwitchContainer
            name={`assets[${index}][validation_rules][quantity]`}
            title="Quantity"
            description="Toggle whether you want to specify a quantity for this asset."
            defaultChecked={
                assets && !!assets[index]?.validation_rules?.quantity
            }
        >
            <Tabs
                defaultValue={
                    !assets
                        ? 'one-value'
                        : assets[index]?.validation_rules?.quantity?.value
                          ? 'one-value'
                          : 'range'
                }
            >
                <TabsContent value="one-value">
                    <InputField
                        name={`assets[${index}][validation_rules][quantity][value]`}
                        type="number"
                        label="Quantity"
                        description="Specify the quantity for this asset."
                        placeholder="0"
                        min={1}
                        defaultValue={
                            assets &&
                            assets[
                                index
                            ]?.validation_rules?.quantity?.value?.toString()
                        }
                    />
                </TabsContent>
                <TabsContent
                    value="range"
                    className="grid gap-4 md:grid-cols-2"
                >
                    <InputField
                        name={`assets[${index}][validation_rules][quantity][minimum]`}
                        type="number"
                        label="Minimum Quantity"
                        description="Specify the minimum quantity for this asset."
                        placeholder="0"
                        min={1}
                        defaultValue={
                            assets &&
                            assets[
                                index
                            ]?.validation_rules?.quantity?.minimum?.toString()
                        }
                    />
                    <InputField
                        name={`assets[${index}][validation_rules][quantity][maximum]`}
                        type="number"
                        label="Maximum Quantity"
                        description="Specify the maximum quantity for this asset."
                        placeholder="0"
                        min={1}
                        defaultValue={
                            assets &&
                            assets[
                                index
                            ]?.validation_rules?.quantity?.maximum?.toString()
                        }
                    />
                </TabsContent>
                <TabsList>
                    <TabsTrigger value="one-value">One Value</TabsTrigger>
                    <TabsTrigger value="range">Range</TabsTrigger>
                </TabsList>
            </Tabs>
        </SwitchContainer>
    );
}
