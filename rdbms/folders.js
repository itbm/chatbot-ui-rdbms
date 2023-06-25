"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rdbmsDeleteFolders = exports.rdbmsUpdateFolders = exports.rdbmsGetFolders = void 0;
const rdbmsGetFolders = async () => {
    const response = await fetch('api/storage/folders', { method: 'POST' });
    return response.json();
};
exports.rdbmsGetFolders = rdbmsGetFolders;
const rdbmsUpdateFolders = async (updatedFolders) => {
    await fetch('api/storage/folders', {
        method: 'PUT',
        body: JSON.stringify(updatedFolders),
    });
};
exports.rdbmsUpdateFolders = rdbmsUpdateFolders;
const rdbmsDeleteFolders = async (deletedFolderIds) => {
    await fetch(`api/storage/folders?ids=${JSON.stringify(deletedFolderIds)}`, {
        method: 'DELETE',
    });
};
exports.rdbmsDeleteFolders = rdbmsDeleteFolders;
