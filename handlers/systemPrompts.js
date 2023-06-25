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
        return await rdbmsGetSystemPrompts(res, dataSource, rdbmsUser);
    }
    else if (req.method === 'PUT') {
        const updatedPrompts = body;
        if (body !== null) {
            return await rdbmsUpdateSystemPrompts(res, dataSource, rdbmsUser, updatedPrompts);
        }
        else {
            await dataSource.destroy();
            return res.status(400).json({ error: 'No Prompts provided' });
        }
    }
    else if (req.method === 'DELETE') {
        const rawPromptIds = req.query.ids;
        if (rawPromptIds) {
            const promptIds = JSON.parse(rawPromptIds);
            return await rdbmsDeleteSystemPrompts(res, dataSource, rdbmsUser, promptIds);
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
const rdbmsGetSystemPrompts = async (res, dataSource, user) => {
    const systemPromptRepo = dataSource.getRepository(rdbms_1.RDBMSSystemPrompt);
    const rdbmsSystemPrompts = await systemPromptRepo.find({
        where: {
            user: { id: user.id },
        },
    });
    const systemPrompts = [];
    for (const rdbmsSystemPrompt of rdbmsSystemPrompts) {
        let systemPrompt = {
            id: rdbmsSystemPrompt.id,
            name: rdbmsSystemPrompt.name,
            content: rdbmsSystemPrompt.content,
        };
        systemPrompts.push(systemPrompt);
    }
    await dataSource.destroy();
    return res.status(200).json(systemPrompts);
};
const rdbmsUpdateSystemPrompts = async (res, dataSource, user, updatedSystemPrompts) => {
    const rdbmsSystemPrompts = [];
    const systemPromptRepo = dataSource.getRepository(rdbms_1.RDBMSSystemPrompt);
    for (const systemPrompt of updatedSystemPrompts) {
        const rdbmsSystemPrompt = new rdbms_1.RDBMSSystemPrompt();
        rdbmsSystemPrompt.user = user;
        rdbmsSystemPrompt.id = systemPrompt.id;
        rdbmsSystemPrompt.name = systemPrompt.name;
        rdbmsSystemPrompt.content = systemPrompt.content;
        rdbmsSystemPrompts.push(rdbmsSystemPrompt);
    }
    await systemPromptRepo.save(rdbmsSystemPrompts);
    await dataSource.destroy();
    return res.status(200).json({
        OK: true,
    });
};
const rdbmsDeleteSystemPrompts = async (res, dataSource, user, deletedPromptIds) => {
    const systemPromptRepo = dataSource.getRepository(rdbms_1.RDBMSSystemPrompt);
    const deletedPrompts = await systemPromptRepo.findBy({
        user: { id: user.id },
        id: (0, typeorm_1.In)(deletedPromptIds),
    });
    await systemPromptRepo.remove(deletedPrompts);
    await dataSource.destroy();
    return res.status(200).json({
        OK: true,
    });
};
exports.default = handler;
