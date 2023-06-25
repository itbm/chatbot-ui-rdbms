"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientSideDatabase = void 0;
const conversation_1 = require("./rdbms/conversation");
const conversations_1 = require("./rdbms/conversations");
const folder_1 = require("./rdbms/folder");
const folders_1 = require("./rdbms/folders");
const message_1 = require("./rdbms/message");
const messages_1 = require("./rdbms/messages");
const prompt_1 = require("./rdbms/prompt");
const prompts_1 = require("./rdbms/prompts");
const systemPrompt_1 = require("./rdbms/systemPrompt");
const systemPrompts_1 = require("./rdbms/systemPrompts");
class ClientSideDatabase {
    constructor() {
        this.name = 'chatbot-ui-postgres';
    }
    async connect() { }
    async disconnect() { }
    // -----------------------------------Conversation-----------------------------------
    async createConversation(user, newConversation) {
        await (0, conversation_1.rdbmsCreateConversation)(newConversation);
        return true;
    }
    async updateConversation(user, updatedConversation) {
        await (0, conversation_1.rdbmsUpdateConversation)(updatedConversation);
        return true;
    }
    async deleteConversation(user, conversationId) {
        await (0, conversation_1.rdbmsDeleteConversation)(conversationId);
        return true;
    }
    // -----------------------------------Conversations-----------------------------------
    async getConversations(user) {
        return await (0, conversations_1.rdbmsGetConversations)();
    }
    async updateConversations(user, updatedConversations) {
        await (0, conversations_1.rdbmsUpdateConversations)(updatedConversations);
        return true;
    }
    async deleteConversations(user) {
        await (0, conversations_1.rdbmsDeleteConversations)();
        return true;
    }
    // -----------------------------------Folder-----------------------------------
    async createFolder(user, newFolder) {
        await (0, folder_1.rdbmsCreateFolder)(newFolder);
        return true;
    }
    async updateFolder(user, updatedFolder) {
        await (0, folder_1.rdbmsUpdateFolder)(updatedFolder);
        return true;
    }
    async deleteFolder(user, folderId) {
        await (0, folder_1.rdbmsDeleteFolder)(folderId);
        return true;
    }
    // -----------------------------------Folders-----------------------------------
    async getFolders(user) {
        return await (0, folders_1.rdbmsGetFolders)();
    }
    async updateFolders(user, updatedFolders) {
        await (0, folders_1.rdbmsUpdateFolders)(updatedFolders);
        return true;
    }
    async deleteFolders(user, folderIds) {
        await (0, folders_1.rdbmsDeleteFolders)(folderIds);
        return true;
    }
    // -----------------------------------Message-----------------------------------
    async createMessage(user, conversationId, newMessage) {
        await (0, message_1.rdbmsCreateMessage)(conversationId, newMessage);
        return true;
    }
    async updateMessage(user, conversationId, updatedMessage) {
        await (0, message_1.rdbmsUpdateMessage)(conversationId, updatedMessage);
        return true;
    }
    async deleteMessage(user, conversationId, messageId) {
        await (0, message_1.rdbmsDeleteMessage)(messageId);
        return true;
    }
    // -----------------------------------Messages-----------------------------------
    async getMessages(user, conversationId) {
        return await (0, messages_1.rdbmsGetMessages)(conversationId);
    }
    async createMessages(user, conversationId, newMessages) {
        await (0, messages_1.rdbmsCreateMessages)(conversationId, newMessages);
        return true;
    }
    async updateMessages(user, conversationId, updatedMessages) {
        await (0, messages_1.rdbmsUpdateMessages)(conversationId, updatedMessages);
        return true;
    }
    async deleteMessages(user, conversationId, messageIds) {
        await (0, messages_1.rdbmsDeleteMessages)(messageIds);
        return true;
    }
    // -----------------------------------Prompt-----------------------------------
    async createPrompt(user, newPrompt) {
        await (0, prompt_1.rdbmsCreatePrompt)(newPrompt);
        return true;
    }
    async updatePrompt(user, updatedPrompt) {
        await (0, prompt_1.rdbmsUpdatePrompt)(updatedPrompt);
        return true;
    }
    async deletePrompt(user, promptId) {
        await (0, prompt_1.rdbmsDeletePrompt)(promptId);
        return true;
    }
    // -----------------------------------Prompts-----------------------------------
    async getPrompts(user) {
        return await (0, prompts_1.rdbmsGetPrompts)();
    }
    async updatePrompts(user, updatedPrompts) {
        await (0, prompts_1.rdbmsUpdatePrompts)(updatedPrompts);
        return true;
    }
    async deletePrompts(user, promptIds) {
        await (0, prompts_1.rdbmsDeletePrompts)(promptIds);
        return true;
    }
    // -----------------------------------SystemPrompt-----------------------------------
    async createSystemPrompt(user, newSystemPrompt) {
        await (0, systemPrompt_1.rdbmsCreateSystemPrompt)(newSystemPrompt);
        return true;
    }
    async updateSystemPrompt(user, updatedSystemPrompt) {
        await (0, systemPrompt_1.rdbmsUpdateSystemPrompt)(updatedSystemPrompt);
        return true;
    }
    async deleteSystemPrompt(user, systemPromptId) {
        await (0, systemPrompt_1.rdbmsDeleteSystemPrompt)(systemPromptId);
        return true;
    }
    // -----------------------------------SystemPrompts-----------------------------------
    async getSystemPrompts(user) {
        return await (0, systemPrompts_1.rdbmsGetSystemPrompts)();
    }
    async updateSystemPrompts(user, updatedSystemPrompts) {
        await (0, systemPrompts_1.rdbmsUpdateSystemPrompts)(updatedSystemPrompts);
        return true;
    }
    async deleteSystemPrompts(user, systemPromptIds) {
        await (0, systemPrompts_1.rdbmsDeleteSystemPrompts)(systemPromptIds);
        return true;
    }
}
exports.ClientSideDatabase = ClientSideDatabase;
