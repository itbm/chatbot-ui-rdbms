"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rdbmsDeletePrompts = exports.rdbmsUpdatePrompts = exports.rdbmsGetPrompts = void 0;
const rdbmsGetPrompts = async () => {
    const response = await fetch('api/storage/prompts', { method: 'POST' });
    return response.json();
};
exports.rdbmsGetPrompts = rdbmsGetPrompts;
const rdbmsUpdatePrompts = async (updatedPrompts) => {
    await fetch('api/storage/prompts', {
        method: 'PUT',
        body: JSON.stringify(updatedPrompts),
    });
};
exports.rdbmsUpdatePrompts = rdbmsUpdatePrompts;
const rdbmsDeletePrompts = async (deletedPrompts) => {
    await fetch(`api/storage/prompts?ids=${JSON.stringify(deletedPrompts)}`, {
        method: 'DELETE',
    });
};
exports.rdbmsDeletePrompts = rdbmsDeletePrompts;
