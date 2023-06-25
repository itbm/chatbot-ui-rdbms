import { Conversation } from '@chatbot-ui/core/types/chat';
export declare const rdbmsCreateConversation: (newConversation: Conversation) => Promise<void>;
export declare const rdbmsUpdateConversation: (updatedConversation: Conversation) => Promise<void>;
export declare const rdbmsDeleteConversation: (conversationId: string) => Promise<void>;
