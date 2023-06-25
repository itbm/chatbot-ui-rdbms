import { Conversation } from '@chatbot-ui/core/types/chat';
export declare const rdbmsGetConversations: () => Promise<Conversation[]>;
export declare const rdbmsUpdateConversations: (conversations: Conversation[]) => Promise<void>;
export declare const rdbmsDeleteConversations: () => Promise<void>;
