import type { Asset } from '@/types';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { InputField } from './input-field';
import { SwitchContainer } from './switch-container';

export function AssetSize({
    index,
    assets,
}: {
    index: number;
    assets?: Asset[];
}) {
    return (
        <SwitchContainer
            name={`assets[${index}][validation_rules][size]`}
            title="Allowed Size"
            description="Toggle whether you want to specify allowed file sizes for this asset."
            defaultChecked={assets && !!assets[index]?.validation_rules?.size}
        >
            <Tabs
                defaultValue={
                    !assets
                        ? 'one-value'
                        : assets[index]?.validation_rules?.size?.value
                          ? 'one-value'
                          : 'range'
                }
            >
                <TabsContent value="one-value">
                    <InputField
                        name={`assets[${index}][validation_rules][size][value]`}
                        type="number"
                        label="Size (KB)"
                        description="Specify the file size in KB for this asset."
                        placeholder="0"
                        min={1}
                        defaultValue={
                            assets &&
                            assets[
                                index
                            ]?.validation_rules?.size?.value?.toString()
                        }
                    />
                </TabsContent>
                <TabsContent
                    value="range"
                    className="grid gap-4 md:grid-cols-2"
                >
                    <InputField
                        name={`assets[${index}][validation_rules][size][minimum]`}
                        type="number"
                        label="Minimum Size (KB)"
                        description="Specify the minimum file size in KB for this asset."
                        placeholder="0"
                        min={1}
                        defaultValue={
                            assets &&
                            assets[
                                index
                            ]?.validation_rules?.size?.minimum?.toString()
                        }
                    />
                    <InputField
                        name={`assets[${index}][validation_rules][size][maximum]`}
                        type="number"
                        label="Maximum Size (KB)"
                        description="Specify the maximum file size in KB for this asset."
                        placeholder="0"
                        min={1}
                        defaultValue={
                            assets &&
                            assets[
                                index
                            ]?.validation_rules?.size?.maximum?.toString()
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
