"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rdbmsDeleteFolder = exports.rdbmsUpdateFolder = exports.rdbmsCreateFolder = void 0;
const rdbmsCreateFolder = async (newFolder) => {
    await fetch('api/storage/folder', {
        method: 'POST',
        body: JSON.stringify(newFolder),
    });
};
exports.rdbmsCreateFolder = rdbmsCreateFolder;
const rdbmsUpdateFolder = async (updatedFolder) => {
    await fetch('api/storage/folder', {
        method: 'PUT',
        body: JSON.stringify(updatedFolder),
    });
};
exports.rdbmsUpdateFolder = rdbmsUpdateFolder;
const rdbmsDeleteFolder = async (folderId) => {
    await fetch(`api/storage/folder?id=${folderId}`, {
        method: 'DELETE',
    });
};
exports.rdbmsDeleteFolder = rdbmsDeleteFolder;
