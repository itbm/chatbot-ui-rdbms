import { SystemPrompt } from '@chatbot-ui/core/types/system-prompt';
export declare const rdbmsCreateSystemPrompt: (newSystemPrompt: SystemPrompt) => Promise<void>;
export declare const rdbmsUpdateSystemPrompt: (updatedSystemPrompt: SystemPrompt) => Promise<void>;
export declare const rdbmsDeleteSystemPrompt: (promptId: string) => Promise<void>;
