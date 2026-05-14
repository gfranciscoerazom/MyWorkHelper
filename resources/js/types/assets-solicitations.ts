export type Asset = {
    readonly id: number;
    readonly name: string;
    readonly description: string;
    readonly asset_path: string;
    readonly validation_rules: {
        readonly required?: 'on';
        readonly size?: {
            readonly value?: number;
            readonly minimum?: number;
            readonly maximum?: number;
        };
        readonly dimensions?: {
            readonly width?: number;
            readonly height?: number;
            readonly min_width?: number;
            readonly min_height?: number;
            readonly max_width?: number;
            readonly max_height?: number;
            readonly ratio?: {
                readonly numerator: number;
                readonly denominator: number;
            };
        };

        readonly quantity?: {
            readonly value?: number;
            readonly minimum?: number;
            readonly maximum?: number;
        };

        readonly extension?: {
            readonly allowed?: string;
        };
    };
};

export type AssetsSolicitation = {
    readonly id: number;
    readonly title: string;
    readonly description: string;
    readonly status: string;
    readonly requester: {
        readonly id: number;
        readonly name: string;
    };
    readonly provider: {
        readonly id: number;
        readonly name: string;
    };
    readonly created_at: string;
    readonly updated_at: string;
    readonly files_uploaded_at: string | null;
    readonly assets: Asset[];
};

export type AssetsSolicitations = {
    data: AssetsSolicitation[];
};
