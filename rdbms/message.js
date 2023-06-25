"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rdbmsDeleteMessage = exports.rdbmsUpdateMessage = exports.rdbmsCreateMessage = void 0;
const rdbmsCreateMessage = async (conversationId, newMessage) => {
    await fetch('api/storage/message', {
        method: 'POST',
        body: JSON.stringify({
            message: newMessage,
            conversation_id: conversationId,
        }),
    });
};
exports.rdbmsCreateMessage = rdbmsCreateMessage;
const rdbmsUpdateMessage = async (conversationId, updatedMessage) => {
    await fetch('api/storage/message', {
        method: 'PUT',
        body: JSON.stringify({
            message: updatedMessage,
            conversation_id: conversationId,
        }),
    });
};
exports.rdbmsUpdateMessage = rdbmsUpdateMessage;
const rdbmsDeleteMessage = async (messageId) => {
    await fetch(`api/storage/message?id=${messageId}`, {
        method: 'DELETE',
    });
};
exports.rdbmsDeleteMessage = rdbmsDeleteMessage;
