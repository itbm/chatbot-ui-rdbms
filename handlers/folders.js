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
        return await rdbmsGetFolders(res, dataSource, rdbmsUser);
    }
    else if (req.method === 'PUT') {
        const updatedFolders = body;
        if (updatedFolders !== null) {
            return await rdbmsUpdateFolders(res, dataSource, rdbmsUser, updatedFolders);
        }
        else {
            await dataSource.destroy();
            return res.status(400).json({ error: 'No folders provided' });
        }
    }
    else if (req.method === 'DELETE') {
        const rawFolderIds = req.query.ids;
        if (rawFolderIds) {
            const folderIds = JSON.parse(rawFolderIds);
            return await rdbmsDeleteFolders(res, dataSource, rdbmsUser, folderIds);
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
const rdbmsGetFolders = async (res, dataSource, user) => {
    const folderRepo = dataSource.getRepository(rdbms_1.RDBMSFolder);
    const rdbmsFolders = await folderRepo.findBy({
        user: { id: user.id },
    });
    const folders = [];
    for (const rdbmsFolder of rdbmsFolders) {
        let folder = {
            id: rdbmsFolder.id,
            name: rdbmsFolder.name,
            type: rdbmsFolder.folder_type,
        };
        folders.push(folder);
    }
    await dataSource.destroy();
    return res.status(200).json(folders);
};
const rdbmsUpdateFolders = async (res, dataSource, user, updatedFolders) => {
    const rdbmsFolders = [];
    const folderRepo = dataSource.getRepository(rdbms_1.RDBMSFolder);
    for (const folder of updatedFolders) {
        const rdbmsFolder = new rdbms_1.RDBMSFolder();
        rdbmsFolder.user = user;
        rdbmsFolder.id = folder.id;
        rdbmsFolder.name = folder.name;
        rdbmsFolder.folder_type = folder.type;
        rdbmsFolders.push(rdbmsFolder);
    }
    await folderRepo.save(rdbmsFolders);
    await dataSource.destroy();
    return res.status(200).json({
        OK: true,
    });
};
const rdbmsDeleteFolders = async (res, dataSource, user, deletedFolderIds) => {
    const folderRepo = dataSource.getRepository(rdbms_1.RDBMSFolder);
    const deletedFolders = await folderRepo.findBy({
        user: { id: user.id },
        id: (0, typeorm_1.In)(deletedFolderIds),
    });
    await folderRepo.remove(deletedFolders);
    await dataSource.destroy();
    return res.status(200).json({
        OK: true,
    });
};
exports.default = handler;
