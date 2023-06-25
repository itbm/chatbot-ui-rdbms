"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rdbms_1 = require("../types/rdbms");
const rdbms_2 = require("../helpers/rdbms");
const handler = async (req, res, user) => {
    const dataSource = await (0, rdbms_2.getDataSource)();
    const rdbmsUser = await (0, rdbms_2.getUser)(dataSource, user.email);
    let body;
    if (req.body !== '') {
        body = JSON.parse(req.body);
    }
    if (req.method === 'POST') {
        const newPrompt = body;
        if (newPrompt !== null) {
            return await rdbmsCreateSystemPrompt(res, dataSource, rdbmsUser, newPrompt);
        }
        else {
            await dataSource.destroy();
            return res.status(400).json({ error: 'No system prompt provided' });
        }
    }
    else if (req.method === 'PUT') {
        const updatedSystemPrompt = body;
        if (updatedSystemPrompt !== null) {
            return await rdbmsUpdateSystemPrompt(res, dataSource, rdbmsUser, updatedSystemPrompt);
        }
        else {
            await dataSource.destroy();
            return res.status(400).json({ error: 'No system prompt provided' });
        }
    }
    else if (req.method === 'DELETE') {
        const systemPromptId = req.query.id;
        if (systemPromptId !== undefined) {
            return await rdbmsDeleteSystemPrompt(res, dataSource, rdbmsUser, systemPromptId);
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
const rdbmsCreateSystemPrompt = async (res, dataSource, user, systemPrompt) => {
    const systemPromptRepo = dataSource.getRepository(rdbms_1.RDBMSSystemPrompt);
    const rdbmsSystemPrompt = new rdbms_1.RDBMSSystemPrompt();
    rdbmsSystemPrompt.id = systemPrompt.id;
    rdbmsSystemPrompt.user = user;
    rdbmsSystemPrompt.name = systemPrompt.name;
    rdbmsSystemPrompt.content = systemPrompt.content;
    await systemPromptRepo.save(rdbmsSystemPrompt);
    await dataSource.destroy();
    return res.status(200).json({
        OK: true,
    });
};
const rdbmsUpdateSystemPrompt = async (res, dataSource, user, systemPrompt) => {
    const systemPrompRepo = dataSource.getRepository(rdbms_1.RDBMSSystemPrompt);
    const rdbmsSystemPrompt = new rdbms_1.RDBMSSystemPrompt();
    rdbmsSystemPrompt.id = systemPrompt.id;
    rdbmsSystemPrompt.user = user;
    rdbmsSystemPrompt.name = systemPrompt.name;
    rdbmsSystemPrompt.content = systemPrompt.content;
    await systemPrompRepo.save(rdbmsSystemPrompt);
    await dataSource.destroy();
    return res.status(200).json({
        OK: true,
    });
};
const rdbmsDeleteSystemPrompt = async (res, dataSource, user, systemPromptId) => {
    const systemPromptRepo = dataSource.getRepository(rdbms_1.RDBMSSystemPrompt);
    const deletedSystemPrompt = await systemPromptRepo.findOneBy({
        user: { id: user.id },
        id: systemPromptId,
    });
    if (deletedSystemPrompt !== null) {
        await systemPromptRepo.remove(deletedSystemPrompt);
    }
    await dataSource.destroy();
    return res.status(200).json({
        OK: true,
    });
};
exports.default = handler;
