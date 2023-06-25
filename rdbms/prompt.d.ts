import { Prompt } from '@chatbot-ui/core/types/prompt';
export declare const rdbmsCreatePrompt: (newPrompt: Prompt) => Promise<void>;
export declare const rdbmsUpdatePrompt: (updatedPrompt: Prompt) => Promise<void>;
export declare const rdbmsDeletePrompt: (promptId: string) => Promise<void>;
