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
        const newMessage = body['message'];
        const conversationId = body['conversation_id'];
        if (newMessage && conversationId) {
            return await rdbmsCreateMessage(res, dataSource, rdbmsUser, newMessage, conversationId);
        }
        else {
            return res
                .status(400)
                .json({ error: 'No message or conversationId provided' });
        }
    }
    if (req.method === 'PUT') {
        const updatedMessage = body['message'];
        const conversationId = body['conversation_id'];
        if (updatedMessage && conversationId) {
            return await rdbmsUpdateMessage(res, dataSource, rdbmsUser, updatedMessage, conversationId);
        }
        else {
            return res
                .status(400)
                .json({ error: 'No message or conversationId provided' });
        }
    }
    else if (req.method === 'DELETE') {
        const messageId = req.query.id;
        if (messageId) {
            return await rdbmsDeleteMessage(res, dataSource, rdbmsUser, messageId);
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
const rdbmsCreateMessage = async (res, dataSource, user, newMessage, conversationId) => {
    const conversationRepo = dataSource.getRepository(rdbms_1.RDBMSConversation);
    const messageRepo = dataSource.getRepository(rdbms_1.RDBMSMessage);
    const rdbmsConversation = await conversationRepo.findOneBy({
        user: { id: user.id },
        id: conversationId,
    });
    if (rdbmsConversation !== null) {
        const rdbmsMessage = new rdbms_1.RDBMSMessage();
        rdbmsMessage.user = user;
        rdbmsMessage.id = newMessage.id;
        rdbmsMessage.role = newMessage.role;
        rdbmsMessage.content = newMessage.content;
        rdbmsMessage.conversation = rdbmsConversation;
        rdbmsMessage.timestamp = new Date(newMessage.timestamp);
        await messageRepo.save(rdbmsMessage);
        await dataSource.destroy();
        return res.status(200).json({
            OK: true,
        });
    }
    await dataSource.destroy();
    return res.status(500).send({
        error: 'Conversation not found',
    });
};
const rdbmsUpdateMessage = async (res, dataSource, user, updatedMessage, conversationId) => {
    const messageRepo = dataSource.getRepository(rdbms_1.RDBMSMessage);
    const rdbmsMessage = await messageRepo.findOneBy({
        user: { id: user.id },
        id: updatedMessage.id,
        conversation: { id: conversationId },
        timestamp: new Date(updatedMessage.timestamp),
    });
    if (rdbmsMessage) {
        rdbmsMessage.content = updatedMessage.content;
        await messageRepo.save(rdbmsMessage);
        await dataSource.destroy();
        return res.status(200).json({
            OK: true,
        });
    }
    await dataSource.destroy();
    return res.status(500).send({
        error: 'Conversation not found',
    });
};
const rdbmsDeleteMessage = async (res, dataSource, user, messageId) => {
    const messageRepo = dataSource.getRepository(rdbms_1.RDBMSMessage);
    const deletedMessage = await messageRepo.findOneBy({
        user: { id: user.id },
        id: messageId,
    });
    if (deletedMessage !== null) {
        await messageRepo.remove(deletedMessage);
        await dataSource.destroy();
        return res.status(200).json({
            OK: true,
        });
    }
    await dataSource.destroy();
    return res.status(500).send({ error: 'Message not found' });
};
exports.default = handler;
