import { ServerDatabase } from '@chatbot-ui/core';
export declare class ServerSideDatabase implements ServerDatabase {
    name: string;
    connect(): Promise<void>;
    disconnect(): Promise<void>;
    paths: {
        endpoint: string;
        handler: (req: import("next").NextApiRequest, res: import("next").NextApiResponse, user: import("@chatbot-ui/core/types/auth").User) => Promise<void>;
    }[];
}
