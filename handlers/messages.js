"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rdbms_1 = require("../types/rdbms");
const rdbms_2 = require("../helpers/rdbms");
const typeorm_1 = require("typeorm");
const handler = async (req, res, user) => {
    const dataSource = await (0, rdbms_2.getDataSource)();
    const rdbmsUser = await (0, rdbms_2.getUser)(dataSource, user.email);
    let body = null;
    if (req.body !== '') {
        body = JSON.parse(req.body);
    }
    if (req.method === 'POST') {
        const messages = body['messages'];
        const conversationId = body['conversation_id'];
        if (messages) {
            return await rdbmsCreateMessages(res, dataSource, rdbmsUser, messages, conversationId);
        }
        else {
            await dataSource.destroy();
            return res.status(400).json({ error: 'No messages provided' });
        }
    }
    else if (req.method === 'PUT') {
        if (body) {
            const messages = body['updatedMessages'];
            const conversationId = body['conversation_id'];
            if (messages && conversationId) {
                return await rdbmsUpdateMessages(res, dataSource, rdbmsUser, messages, conversationId);
            }
            else {
                return res
                    .status(400)
                    .json({ error: 'No messages or conversation_id provided' });
            }
        }
    }
    else if (req.method === 'DELETE') {
        const rawMessageIds = req.query.ids;
        if (rawMessageIds) {
            const messageIds = JSON.parse(rawMessageIds);
            return await rdbmsDeleteMessages(res, dataSource, rdbmsUser, messageIds);
        }
        else {
            await dataSource.destroy();
            return res.status(400).json({ error: 'No ids provided' });
        }
    }
    else {
        await dataSource.destroy();
        return res.status(400).json({ error: 'Method not supported' });
    }
};
const rdbmsCreateMessages = async (res, dataSource, user, messages, conversationId) => {
    const conversationRepo = dataSource.getRepository(rdbms_1.RDBMSConversation);
    const messageRepo = dataSource.getRepository(rdbms_1.RDBMSMessage);
    const rdbmsConversation = await conversationRepo.findOneBy({
        user: { id: user.id },
        id: conversationId,
    });
    const newRdbmsMessages = [];
    if (rdbmsConversation !== null) {
        for (const message of messages) {
            const rdbmsMessage = new rdbms_1.RDBMSMessage();
            rdbmsMessage.user = user;
            rdbmsMessage.id = message.id;
            rdbmsMessage.role = message.role;
            rdbmsMessage.content = message.content;
            rdbmsMessage.conversation = rdbmsConversation;
            rdbmsMessage.timestamp = new Date(message.timestamp);
            newRdbmsMessages.push(rdbmsMessage);
        }
        await messageRepo.save(newRdbmsMessages);
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
const rdbmsUpdateMessages = async (res, dataSource, user, messages, conversationId) => {
    const conversationRepo = dataSource.getRepository(rdbms_1.RDBMSConversation);
    const messageRepo = dataSource.getRepository(rdbms_1.RDBMSMessage);
    const updatedRdbmsMessages = [];
    const rdbmsConversation = await conversationRepo.findOneBy({
        user: { id: user.id },
        id: conversationId,
    });
    if (rdbmsConversation) {
        for (const message of messages) {
            const rdbmsMessage = new rdbms_1.RDBMSMessage();
            rdbmsMessage.user = user;
            rdbmsMessage.id = message.id;
            rdbmsMessage.role = message.role;
            rdbmsMessage.content = message.content;
            rdbmsMessage.timestamp = new Date(message.timestamp);
            rdbmsMessage.conversation = rdbmsConversation;
            updatedRdbmsMessages.push(rdbmsMessage);
        }
    }
    else {
        await dataSource.destroy();
        return res.status(500).send({
            error: 'Conversation not found',
        });
    }
    await messageRepo.save(updatedRdbmsMessages);
    await dataSource.destroy();
    return res.status(200).json({
        OK: true,
    });
};
const rdbmsDeleteMessages = async (res, dataSource, user, messageIds) => {
    const messageRepo = dataSource.getRepository(rdbms_1.RDBMSMessage);
    const deletedMessages = await messageRepo.findBy({
        user: { id: user.id },
        id: (0, typeorm_1.In)(messageIds),
    });
    if (deletedMessages.length > 0) {
        await messageRepo.remove(deletedMessages);
        await dataSource.destroy();
        return res.status(200).json({
            OK: true,
        });
    }
    await dataSource.destroy();
    return res.status(500).send({ error: 'Messages not found' });
};
exports.default = handler;
