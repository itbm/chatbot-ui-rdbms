import { FolderInterface } from '@chatbot-ui/core/types/folder';
export declare const rdbmsGetFolders: () => Promise<FolderInterface[]>;
export declare const rdbmsUpdateFolders: (updatedFolders: FolderInterface[]) => Promise<void>;
export declare const rdbmsDeleteFolders: (deletedFolderIds: string[]) => Promise<void>;
