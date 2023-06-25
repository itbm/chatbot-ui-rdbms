"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rdbmsDeleteSystemPrompts = exports.rdbmsUpdateSystemPrompts = exports.rdbmsGetSystemPrompts = void 0;
const rdbmsGetSystemPrompts = async () => {
    const response = await fetch('api/storage/systemPrompts', { method: 'POST' });
    return response.json();
};
exports.rdbmsGetSystemPrompts = rdbmsGetSystemPrompts;
const rdbmsUpdateSystemPrompts = async (updatedPrompts) => {
    await fetch('api/storage/systemPrompts', {
        method: 'PUT',
        body: JSON.stringify(updatedPrompts),
    });
};
exports.rdbmsUpdateSystemPrompts = rdbmsUpdateSystemPrompts;
const rdbmsDeleteSystemPrompts = async (deletedPrompts) => {
    await fetch(`api/storage/systemPrompts?ids=${JSON.stringify(deletedPrompts)}`, {
        method: 'DELETED',
    });
};
exports.rdbmsDeleteSystemPrompts = rdbmsDeleteSystemPrompts;
