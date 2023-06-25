import { Message } from '@chatbot-ui/core/types/chat';
export declare const rdbmsCreateMessage: (conversationId: string, newMessage: Message) => Promise<void>;
export declare const rdbmsUpdateMessage: (conversationId: string, updatedMessage: Message) => Promise<void>;
export declare const rdbmsDeleteMessage: (messageId: string) => Promise<void>;
