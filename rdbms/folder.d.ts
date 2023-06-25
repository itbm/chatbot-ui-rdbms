import { FolderInterface } from '@chatbot-ui/core/types/folder';
export declare const rdbmsCreateFolder: (newFolder: FolderInterface) => Promise<void>;
export declare const rdbmsUpdateFolder: (updatedFolder: FolderInterface) => Promise<void>;
export declare const rdbmsDeleteFolder: (folderId: string) => Promise<void>;
