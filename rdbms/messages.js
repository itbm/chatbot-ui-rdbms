"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rdbmsDeleteMessages = exports.rdbmsUpdateMessages = exports.rdbmsCreateMessages = exports.rdbmsGetMessages = void 0;
const rdbmsGetMessages = async (conversationId) => {
    const response = await fetch('api/storage/messages', {
        method: 'POST',
        body: JSON.stringify({ conversation_id: conversationId }),
    });
    return response.json();
};
exports.rdbmsGetMessages = rdbmsGetMessages;
const rdbmsCreateMessages = async (conversationId, newMessages) => {
    await fetch('api/storage/messages', {
        method: 'POST',
        body: JSON.stringify({
            messages: newMessages,
            conversation_id: conversationId,
        }),
    });
};
exports.rdbmsCreateMessages = rdbmsCreateMessages;
const rdbmsUpdateMessages = async (conversationId, updatedMessages) => {
    await fetch('api/storage/messages', {
        method: 'PUT',
        body: JSON.stringify({
            updatedMessages: updatedMessages,
            conversation_id: conversationId,
        }),
    });
};
exports.rdbmsUpdateMessages = rdbmsUpdateMessages;
const rdbmsDeleteMessages = async (messageIds) => {
    await fetch(`api/storage/messages?ids=${JSON.stringify(messageIds)}`, {
        method: 'DELETE',
    });
};
exports.rdbmsDeleteMessages = rdbmsDeleteMessages;
