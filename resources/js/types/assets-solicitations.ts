export type AssetsSolicitation = {
    id: number;
    title: string;
    description: string;
    status: string;
    requester: {
        id: number;
        name: string;
    };
    provider: {
        id: number;
        name: string;
    };
    created_at: string;
    updated_at: string;
    files_uploaded_at: string | null;
};

export type AssetsSolicitations = {
    data: AssetsSolicitation[]
};