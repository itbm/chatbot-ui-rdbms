"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rdbmsDeleteSystemPrompt = exports.rdbmsUpdateSystemPrompt = exports.rdbmsCreateSystemPrompt = void 0;
const rdbmsCreateSystemPrompt = async (newSystemPrompt) => {
    await fetch('api/storage/systemPrompt', {
        method: 'POST',
        body: JSON.stringify(newSystemPrompt),
    });
};
exports.rdbmsCreateSystemPrompt = rdbmsCreateSystemPrompt;
const rdbmsUpdateSystemPrompt = async (updatedSystemPrompt) => {
    await fetch('api/storage/systemPrompt', {
        method: 'PUT',
        body: JSON.stringify(updatedSystemPrompt),
    });
};
exports.rdbmsUpdateSystemPrompt = rdbmsUpdateSystemPrompt;
const rdbmsDeleteSystemPrompt = async (promptId) => {
    await fetch(`api/storage/systemPrompt?id=${promptId}`, {
        method: 'DELETE',
    });
};
exports.rdbmsDeleteSystemPrompt = rdbmsDeleteSystemPrompt;
