"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rdbmsDeleteConversation = exports.rdbmsUpdateConversation = exports.rdbmsCreateConversation = void 0;
const rdbmsCreateConversation = async (newConversation) => {
    await fetch('api/storage/conversation', {
        method: 'POST',
        body: JSON.stringify(newConversation),
    });
};
exports.rdbmsCreateConversation = rdbmsCreateConversation;
const rdbmsUpdateConversation = async (updatedConversation) => {
    await fetch('api/storage/conversation', {
        method: 'PUT',
        body: JSON.stringify(updatedConversation),
    });
};
exports.rdbmsUpdateConversation = rdbmsUpdateConversation;
const rdbmsDeleteConversation = async (conversationId) => {
    await fetch(`api/storage/conversation?id=${conversationId}`, {
        method: 'DELETE',
    });
};
exports.rdbmsDeleteConversation = rdbmsDeleteConversation;
