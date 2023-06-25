"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rdbms_1 = require("../types/rdbms");
const openai_1 = require("@chatbot-ui/core/types/openai");
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
        return await rdbmsGetPrompts(res, dataSource, rdbmsUser);
    }
    else if (req.method === 'PUT') {
        const updatedPrompts = body;
        if (body !== null) {
            return await rdbmsUpdatePrompts(res, dataSource, rdbmsUser, updatedPrompts);
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
            return await rdbmsDeletePrompts(res, dataSource, rdbmsUser, promptIds);
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
const rdbmsGetPrompts = async (res, dataSource, user) => {
    const promptRepo = dataSource.getRepository(rdbms_1.RDBMSPrompt);
    const rdbmsPrompts = await promptRepo.find({
        where: {
            user: { id: user.id },
        },
        relations: ['folder'],
    });
    const prompts = [];
    for (const rdbmsPrompt of rdbmsPrompts) {
        const model_id = rdbmsPrompt.model_id;
        const model = openai_1.OpenAIModels[model_id];
        let prompt = {
            id: rdbmsPrompt.id,
            name: rdbmsPrompt.name,
            description: rdbmsPrompt.description,
            content: rdbmsPrompt.content,
            model: model,
            folderId: rdbmsPrompt.folder !== null ? rdbmsPrompt.folder.id : null,
        };
        prompts.push(prompt);
    }
    await dataSource.destroy();
    return res.status(200).json(prompts);
};
const rdbmsUpdatePrompts = async (res, dataSource, user, updatedPrompts) => {
    const rdbmsPrompts = [];
    const promptRepo = dataSource.getRepository(rdbms_1.RDBMSPrompt);
    const folderRepo = dataSource.getRepository(rdbms_1.RDBMSFolder);
    for (const prompt of updatedPrompts) {
        const rdbmsPrompt = new rdbms_1.RDBMSPrompt();
        rdbmsPrompt.user = user;
        rdbmsPrompt.id = prompt.id;
        rdbmsPrompt.name = prompt.name;
        rdbmsPrompt.description = prompt.description;
        rdbmsPrompt.content = prompt.content;
        rdbmsPrompt.model_id = prompt.model.id;
        if (prompt.folderId !== null) {
            const updatedFolder = await folderRepo.findOneBy({
                id: prompt.folderId,
            });
            if (updatedFolder !== null) {
                rdbmsPrompt.folder = updatedFolder;
            }
        }
        else {
            rdbmsPrompt.folder = null;
        }
        rdbmsPrompts.push(rdbmsPrompt);
    }
    await promptRepo.save(rdbmsPrompts);
    await dataSource.destroy();
    return res.status(200).json({
        OK: true,
    });
};
const rdbmsDeletePrompts = async (res, dataSource, user, deletedPromptIds) => {
    const promptRepo = dataSource.getRepository(rdbms_1.RDBMSPrompt);
    const deletedPrompts = await promptRepo.findBy({
        user: { id: user.id },
        id: (0, typeorm_1.In)(deletedPromptIds),
    });
    await promptRepo.remove(deletedPrompts);
    await dataSource.destroy();
    return res.status(200).json({
        OK: true,
    });
};
exports.default = handler;
