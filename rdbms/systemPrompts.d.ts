import { SystemPrompt } from '@chatbot-ui/core/types/system-prompt';
export declare const rdbmsGetSystemPrompts: () => Promise<SystemPrompt[]>;
export declare const rdbmsUpdateSystemPrompts: (updatedPrompts: SystemPrompt[]) => Promise<void>;
export declare const rdbmsDeleteSystemPrompts: (deletedPrompts: string[]) => Promise<void>;
