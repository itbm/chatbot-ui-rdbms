"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServerSideDatabase = void 0;
const conversation_1 = __importDefault(require("./handlers/conversation"));
const conversations_1 = __importDefault(require("./handlers/conversations"));
const folder_1 = __importDefault(require("./handlers/folder"));
const folders_1 = __importDefault(require("./handlers/folders"));
const message_1 = __importDefault(require("./handlers/message"));
const messages_1 = __importDefault(require("./handlers/messages"));
const prompt_1 = __importDefault(require("./handlers/prompt"));
const prompts_1 = __importDefault(require("./handlers/prompts"));
const systemPrompt_1 = __importDefault(require("./handlers/systemPrompt"));
const systemPrompts_1 = __importDefault(require("./handlers/systemPrompts"));
class ServerSideDatabase {
    constructor() {
        this.name = 'chatbot-ui-postgres';
        this.paths = [
            { endpoint: 'conversation', handler: conversation_1.default },
            { endpoint: 'conversations', handler: conversations_1.default },
            { endpoint: 'folder', handler: folder_1.default },
            { endpoint: 'folders', handler: folders_1.default },
            { endpoint: 'message', handler: message_1.default },
            { endpoint: 'messages', handler: messages_1.default },
            { endpoint: 'prompt', handler: prompt_1.default },
            { endpoint: 'prompts', handler: prompts_1.default },
            { endpoint: 'systemPrompt', handler: systemPrompt_1.default },
            { endpoint: 'systemPrompts', handler: systemPrompts_1.default },
        ];
    }
    async connect() { }
    async disconnect() { }
}
exports.ServerSideDatabase = ServerSideDatabase;
