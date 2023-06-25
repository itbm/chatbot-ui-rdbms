import { Prompt } from '@chatbot-ui/core/types/prompt';
export declare const rdbmsGetPrompts: () => Promise<Prompt[]>;
export declare const rdbmsUpdatePrompts: (updatedPrompts: Prompt[]) => Promise<void>;
export declare const rdbmsDeletePrompts: (deletedPrompts: string[]) => Promise<void>;
