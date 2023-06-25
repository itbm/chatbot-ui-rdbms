"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rdbms_1 = require("../types/rdbms");
const rdbms_2 = require("../helpers/rdbms");
const handler = async (req, res, user) => {
    const dataSource = await (0, rdbms_2.getDataSource)();
    const rdbmsUser = await (0, rdbms_2.getUser)(dataSource, user.email);
    let body = null;
    if (req.body !== '') {
        body = JSON.parse(req.body);
    }
    if (req.method === 'POST') {
        const newConversation = body;
        if (newConversation !== null) {
            return await rdbmsCreateConversation(res, dataSource, rdbmsUser, newConversation);
        }
        else {
            await dataSource.destroy();
            return res.status(400).json({ error: 'No conversation provided' });
        }
    }
    else if (req.method === 'PUT') {
        const updatedConversation = body;
        if (updatedConversation !== null) {
            return await rdbmsUpdateConversation(res, dataSource, rdbmsUser, updatedConversation);
        }
        else {
            await dataSource.destroy();
            return res.status(400).json({ error: 'No conversation provided' });
        }
    }
    else if (req.method === 'DELETE') {
        const conversationId = req.query.id;
        if (conversationId) {
            return await rdbmsDeleteConversation(res, dataSource, rdbmsUser, conversationId);
        }
        else {
            await dataSource.destroy();
            return res.status(400).json({ error: 'No id provided' });
        }
    }
    else {
        await dataSource.destroy();
        return res.status(400).json({ error: 'Method not supported' });
    }
};
const rdbmsCreateConversation = async (res, dataSource, user, conversation) => {
    const folderRepo = dataSource.getRepository(rdbms_1.RDBMSFolder);
    const conversationRepo = dataSource.getRepository(rdbms_1.RDBMSConversation);
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
    await conversationRepo.save(rdbmsConversation);
    await dataSource.destroy();
    return res.status(200).json({
        OK: true,
    });
};
const rdbmsUpdateConversation = async (res, dataSource, user, conversation) => {
    const folderRepo = dataSource.getRepository(rdbms_1.RDBMSFolder);
    const conversationRepo = dataSource.getRepository(rdbms_1.RDBMSConversation);
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
    await conversationRepo.save(rdbmsConversation);
    await dataSource.destroy();
    return res.status(200).json({
        OK: true,
    });
};
const rdbmsDeleteConversation = async (res, dataSource, user, conversationId) => {
    const conversationRepo = dataSource.getRepository(rdbms_1.RDBMSConversation);
    const deletedConversation = await conversationRepo.findOneBy({
        user: { id: user.id },
        id: conversationId,
    });
    if (deletedConversation !== null) {
        await conversationRepo.remove(deletedConversation);
    }
    await dataSource.destroy();
    return res.status(200).json({
        OK: true,
    });
};
exports.default = handler;
