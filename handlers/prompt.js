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
            return await rdbmsCreatePrompt(res, dataSource, rdbmsUser, newPrompt);
        }
        else {
            await dataSource.destroy();
            return res.status(400).json({ error: 'No prompt provided' });
        }
    }
    else if (req.method === 'PUT') {
        const updatedPrompt = body;
        if (updatedPrompt !== null) {
            return await rdbmsUpdatePrompt(res, dataSource, rdbmsUser, updatedPrompt);
        }
        else {
            await dataSource.destroy();
            return res.status(400).json({ error: 'No prompt provided' });
        }
    }
    else if (req.method === 'DELETE') {
        const promptId = req.query.id;
        if (promptId !== undefined) {
            return await rdbmsDeletePrompt(res, dataSource, rdbmsUser, promptId);
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
const rdbmsCreatePrompt = async (res, dataSource, user, prompt) => {
    const folderRepo = dataSource.getRepository(rdbms_1.RDBMSFolder);
    const promptRepo = dataSource.getRepository(rdbms_1.RDBMSPrompt);
    const rdbmsPrompt = new rdbms_1.RDBMSPrompt();
    rdbmsPrompt.id = prompt.id;
    rdbmsPrompt.user = user;
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
    await promptRepo.save(rdbmsPrompt);
    await dataSource.destroy();
    return res.status(200).json({
        OK: true,
    });
};
const rdbmsUpdatePrompt = async (res, dataSource, user, prompt) => {
    const folderRepo = dataSource.getRepository(rdbms_1.RDBMSFolder);
    const promptRepo = dataSource.getRepository(rdbms_1.RDBMSPrompt);
    const rdbmsPrompt = new rdbms_1.RDBMSPrompt();
    rdbmsPrompt.id = prompt.id;
    rdbmsPrompt.user = user;
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
    await promptRepo.save(rdbmsPrompt);
    await dataSource.destroy();
    return res.status(200).json({
        OK: true,
    });
};
const rdbmsDeletePrompt = async (res, dataSource, user, promptId) => {
    const promptRepo = dataSource.getRepository(rdbms_1.RDBMSPrompt);
    const deletedPrompt = await promptRepo.findOneBy({
        user: { id: user.id },
        id: promptId,
    });
    if (deletedPrompt !== null) {
        await promptRepo.remove(deletedPrompt);
    }
    await dataSource.destroy();
    return res.status(200).json({
        OK: true,
    });
};
exports.default = handler;
