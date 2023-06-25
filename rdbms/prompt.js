"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rdbmsDeletePrompt = exports.rdbmsUpdatePrompt = exports.rdbmsCreatePrompt = void 0;
const rdbmsCreatePrompt = async (newPrompt) => {
    await fetch('api/storage/prompt', {
        method: 'POST',
        body: JSON.stringify(newPrompt),
    });
};
exports.rdbmsCreatePrompt = rdbmsCreatePrompt;
const rdbmsUpdatePrompt = async (updatedPrompt) => {
    await fetch('api/storage/prompt', {
        method: 'PUT',
        body: JSON.stringify(updatedPrompt),
    });
};
exports.rdbmsUpdatePrompt = rdbmsUpdatePrompt;
const rdbmsDeletePrompt = async (promptId) => {
    await fetch(`api/storage/prompt?id=${promptId}`, {
        method: 'DELETE',
    });
};
exports.rdbmsDeletePrompt = rdbmsDeletePrompt;
