import { Message } from '@chatbot-ui/core/types/chat';
export declare const rdbmsGetMessages: (conversationId: string) => Promise<Message[]>;
export declare const rdbmsCreateMessages: (conversationId: string, newMessages: Message[]) => Promise<void>;
export declare const rdbmsUpdateMessages: (conversationId: string, updatedMessages: Message[]) => Promise<void>;
export declare const rdbmsDeleteMessages: (messageIds: string[]) => Promise<void>;
