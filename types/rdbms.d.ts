export declare class RDBMSUser {
    id: string;
    pass: string | null;
}
export declare class RDBMSFolder {
    id: string;
    user: RDBMSUser;
    name: string;
    folder_type: string;
}
export declare class RDBMSConversation {
    id: string;
    user: RDBMSUser;
    name: string;
    model_id: string;
    prompt: string | "";
    temperature: number;
    folder: RDBMSFolder | null;
    timestamp: Date;
}
export declare class RDBMSMessage {
    id: string;
    user: RDBMSUser;
    conversation: RDBMSConversation;
    role: string;
    content: string;
    timestamp: Date;
}
export declare class RDBMSPrompt {
    id: string;
    user: RDBMSUser;
    name: string;
    description: string | "";
    content: string | "";
    model_id: string;
    folder: RDBMSFolder | null;
}
export declare class RDBMSSystemPrompt {
    id: string;
    user: RDBMSUser;
    name: string;
    content: string | "";
}
export declare class RDBMSWorkstation {
    id: string;
    name: string;
    user: RDBMSUser;
    conversations: string;
    prompts: string;
    system_prompts: string;
}
