"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rdbms_1 = require("../types/rdbms");
const openai_1 = require("@chatbot-ui/core/types/openai");
const rdbms_2 = require("../helpers/rdbms");
const handler = async (req, res, user) => {
    const dataSource = await (0, rdbms_2.getDataSource)();
    const rdbmsUser = await (0, rdbms_2.getUser)(dataSource, user.email);
    let body = null;
    if (req.body !== '') {
        body = JSON.parse(req.body);
    }
    if (req.method === 'POST') {
        return await rdbmsGetAllConversations(res, dataSource, rdbmsUser);
    }
    else if (req.method === 'PUT') {
        const updatedConversations = body;
        if (updatedConversations !== undefined) {
            return await rdbmsUpdateConversations(res, dataSource, rdbmsUser, updatedConversations);
        }
        else {
            await dataSource.destroy();
            return res.status(400).json({ error: 'No conversations provided' });
        }
    }
    else if (req.method === 'DELETE') {
        return await rdbmsDeleteAllConversations(res, dataSource, rdbmsUser);
    }
    else {
        await dataSource.destroy();
        return res.status(400).json({ error: 'Method not supported' });
    }
};
const rdbmsGetAllConversations = async (res, dataSource, user) => {
    const conversationRepo = dataSource.getRepository(rdbms_1.RDBMSConversation);
    const messageRepo = dataSource.getRepository(rdbms_1.RDBMSMessage);
    const rdbmsConversations = await conversationRepo.find({
        where: {
            user: { id: user.id },
        },
        order: { timestamp: { direction: 'ASC' } },
        relations: ['folder'],
    });
    const conversations = [];
    for (const rdbmsConversation of rdbmsConversations) {
        const model_id = rdbmsConversation.model_id;
        const model = openai_1.OpenAIModels[model_id];
        const rdbmsMessages = await messageRepo.find({
            where: {
                user: { id: user.id },
                conversation: { id: rdbmsConversation.id },
            },
            order: { timestamp: { direction: 'ASC' } },
        });
        const messages = [];
        rdbmsMessages.forEach((rdbmsMessage) => {
            let message = {
                id: rdbmsMessage.id,
                content: rdbmsMessage.content,
                role: rdbmsMessage.role,
                timestamp: rdbmsMessage.timestamp.toISOString(),
            };
            messages.push(message);
        });
        let conversation = {
            id: rdbmsConversation.id,
            name: rdbmsConversation.name,
            model: model,
            messages: messages,
            folderId: rdbmsConversation.folder !== null ? rdbmsConversation.folder.id : null,
            prompt: rdbmsConversation.prompt,
            temperature: rdbmsConversation.temperature,
            timestamp: rdbmsConversation.timestamp.toISOString(),
        };
        conversations.push(conversation);
    }
    await dataSource.destroy();
    return res.status(200).json(conversations);
};
const rdbmsUpdateConversations = async (res, dataSource, user, updatedConversations) => {
    const rdbmsConversations = [];
    const folderRepo = dataSource.getRepository(rdbms_1.RDBMSFolder);
    for (const conversation of updatedConversations) {
        const rdbmsConversation = new rdbms_1.RDBMSConversation();
        rdbmsConversation.user = user;
        rdbmsConversation.id = conversation.id;
        rdbmsConversation.name = conversation.name;
        rdbmsConversation.model_id = conversation.model.id;
        rdbmsConversation.prompt = conversation.prompt;
        rdbmsConversation.temperature = conversation.temperature;
        rdbmsConversation.timestamp = new Date(conversation.timestamp);
        if (conversation.folderId !== null) {
            const updatedFolder = await folderRepo.findOneBy({
                id: conversation.folderId,
            });
            if (updatedFolder !== null) {
                rdbmsConversation.folder = updatedFolder;
            }
        }
        else {
            rdbmsConversation.folder = null;
        }
        rdbmsConversations.push(rdbmsConversation);
    }
    await dataSource.manager.save(rdbmsConversations);
    await dataSource.destroy();
    return res.status(200).json({
        OK: true,
    });
};
const rdbmsDeleteAllConversations = async (res, dataSource, user) => {
    const conversationRepo = dataSource.getRepository(rdbms_1.RDBMSConversation);
    const deletedConversations = await conversationRepo.findBy({
        user: { id: user.id },
    });
    await conversationRepo.remove(deletedConversations);
    await dataSource.destroy();
    return res.status(200).json({
        OK: true,
    });
};
exports.default = handler;
