"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rdbmsDeleteConversations = exports.rdbmsUpdateConversations = exports.rdbmsGetConversations = void 0;
const rdbmsGetConversations = async () => {
    const response = await fetch('api/storage/conversations', { method: 'POST' });
    return response.json();
};
exports.rdbmsGetConversations = rdbmsGetConversations;
const rdbmsUpdateConversations = async (conversations) => {
    await fetch('api/storage/conversations', {
        method: 'PUT',
        body: JSON.stringify(conversations),
    });
};
exports.rdbmsUpdateConversations = rdbmsUpdateConversations;
const rdbmsDeleteConversations = async () => {
    await fetch('api/storage/conversations', {
        method: 'DELETE',
    });
};
exports.rdbmsDeleteConversations = rdbmsDeleteConversations;
