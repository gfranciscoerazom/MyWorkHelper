import type { Asset } from '@/types';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { InputField } from './input-field';
import { SwitchContainer } from './switch-container';

export function AssetDimensions({
    index,
    assets,
}: {
    index: number;
    assets?: Asset[];
}) {
    return (
        <SwitchContainer
            name={`assets[${index}][validation_rules][dimensions]`}
            title="Dimensions"
            description="Toggle whether you want to specify a minimum and maximum dimensions in pixels for this asset."
            defaultChecked={
                assets && !!assets[index]?.validation_rules?.dimensions
            }
        >
            <Tabs
                defaultValue={
                    !assets
                        ? 'one-value'
                        : assets[index]?.validation_rules?.dimensions?.width
                          ? 'one-value'
                          : assets[index]?.validation_rules?.dimensions?.ratio
                            ? 'ratio'
                            : 'range'
                }
            >
                <TabsContent
                    value="one-value"
                    className="grid gap-4 md:grid-cols-2"
                >
                    <InputField
                        name={`assets[${index}][validation_rules][dimensions][width]`}
                        type="number"
                        label="Width"
                        description="Specify the width in pixels for this asset."
                        placeholder="0"
                        min={1}
                        defaultValue={
                            assets &&
                            assets[
                                index
                            ]?.validation_rules?.dimensions?.width?.toString()
                        }
                    />
                    <InputField
                        name={`assets[${index}][validation_rules][dimensions][height]`}
                        type="number"
                        label="Height"
                        description="Specify the height in pixels for this asset."
                        placeholder="0"
                        min={1}
                        defaultValue={
                            assets &&
                            assets[
                                index
                            ]?.validation_rules?.dimensions?.height?.toString()
                        }
                    />
                </TabsContent>
                <TabsContent
                    value="range"
                    className="grid gap-4 md:grid-cols-2"
                >
                    <InputField
                        name={`assets[${index}][validation_rules][dimensions][min_width]`}
                        type="number"
                        label="Min Width"
                        description="Specify the minimum width in pixels for this asset."
                        placeholder="0"
                        min={1}
                        defaultValue={
                            assets &&
                            assets[
                                index
                            ]?.validation_rules?.dimensions?.min_width?.toString()
                        }
                    />
                    <InputField
                        name={`assets[${index}][validation_rules][dimensions][max_width]`}
                        type="number"
                        label="Max Width"
                        description="Specify the maximum width in pixels for this asset."
                        placeholder="0"
                        min={1}
                        defaultValue={
                            assets &&
                            assets[
                                index
                            ]?.validation_rules?.dimensions?.max_width?.toString()
                        }
                    />
                    <InputField
                        name={`assets[${index}][validation_rules][dimensions][min_height]`}
                        type="number"
                        label="Min Height"
                        description="Specify the minimum height in pixels for this asset."
                        placeholder="0"
                        min={1}
                        defaultValue={
                            assets &&
                            assets[
                                index
                            ]?.validation_rules?.dimensions?.min_height?.toString()
                        }
                    />
                    <InputField
                        name={`assets[${index}][validation_rules][dimensions][max_height]`}
                        type="number"
                        label="Max Height"
                        description="Specify the maximum height in pixels for this asset."
                        placeholder="0"
                        min={1}
                        defaultValue={
                            assets &&
                            assets[
                                index
                            ]?.validation_rules?.dimensions?.max_height?.toString()
                        }
                    />
                </TabsContent>
                <TabsContent
                    value="ratio"
                    className="grid gap-4 md:grid-cols-2"
                >
                    <InputField
                        name={`assets[${index}][validation_rules][dimensions][ratio][numerator]`}
                        type="number"
                        label="Ratio Numerator"
                        description="Specify the ratio numerator (e.g., for a 16:9 ratio, the numerator is 16)."
                        placeholder="0"
                        min={1}
                        defaultValue={
                            assets &&
                            assets[
                                index
                            ]?.validation_rules?.dimensions?.ratio?.numerator?.toString()
                        }
                    />
                    <InputField
                        name={`assets[${index}][validation_rules][dimensions][ratio][denominator]`}
                        type="number"
                        label="Ratio Denominator"
                        description="Specify the ratio denominator (e.g., for a 16:9 ratio, the denominator is 9)."
                        placeholder="0"
                        min={1}
                        defaultValue={
                            assets &&
                            assets[
                                index
                            ]?.validation_rules?.dimensions?.ratio?.denominator?.toString()
                        }
                    />
                </TabsContent>
                <TabsList>
                    <TabsTrigger value="one-value">One Value</TabsTrigger>
                    <TabsTrigger value="range">Range</TabsTrigger>
                    <TabsTrigger value="ratio">Aspect Ratio</TabsTrigger>
                </TabsList>
            </Tabs>
        </SwitchContainer>
    );
}
