import type { Asset } from '@/types';
import { InputField } from './input-field';
import { SwitchContainer } from './switch-container';

export function AssetAllowedExtensions({
    index,
    assets,
}: {
    index: number;
    assets?: Asset[];
}) {
    return (
        <SwitchContainer
            name={`assets[${index}][validation_rules][extension]`}
            title="Allowed Extensions"
            description="Toggle whether you want to specify allowed file extensions for this asset."
            defaultChecked={
                assets && !!assets[index]?.validation_rules?.extension
            }
        >
            <InputField
                name={`assets[${index}][validation_rules][extension][allowed]`}
                type="text"
                label="Allowed Extensions"
                description="Specify the allowed file extensions for this asset, separated by commas (e.g., jpg, png, pdf)."
                placeholder="E.g., jpg, png, pdf"
                defaultValue={
                    assets &&
                    assets[index]?.validation_rules?.extension?.allowed
                }
            />
        </SwitchContainer>
    );
}
