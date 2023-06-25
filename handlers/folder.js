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
        const newFolder = body;
        if (newFolder !== null) {
            return await rdbmsCreateFolder(res, dataSource, rdbmsUser, newFolder);
        }
        else {
            await dataSource.destroy();
            return res.status(400).json({ error: 'No name or folder_type provided' });
        }
    }
    else if (req.method === 'PUT') {
        const updatedFolder = body;
        if (updatedFolder !== null) {
            return await rdbmsUpdateFolder(res, dataSource, rdbmsUser, updatedFolder);
        }
        else {
            await dataSource.destroy();
            return res.status(400).json({ error: 'No name or folder_id provided' });
        }
    }
    else if (req.method === 'DELETE') {
        const folderId = req.query.id;
        if (folderId !== undefined) {
            return await rdbmsDeleteFolder(res, dataSource, rdbmsUser, folderId);
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
const rdbmsCreateFolder = async (res, dataSource, user, newFolder) => {
    const folderRepo = dataSource.getRepository(rdbms_1.RDBMSFolder);
    const rdbmsFolder = new rdbms_1.RDBMSFolder();
    rdbmsFolder.id = newFolder.id;
    rdbmsFolder.user = user;
    rdbmsFolder.name = newFolder.name;
    rdbmsFolder.folder_type = newFolder.type.toString();
    await folderRepo.save(rdbmsFolder);
    await dataSource.destroy();
    return res.status(200).json({
        OK: true,
    });
};
const rdbmsUpdateFolder = async (res, dataSource, user, updatedFolder) => {
    const folderRepo = dataSource.getRepository(rdbms_1.RDBMSFolder);
    const rdbmsFolder = await folderRepo.findOneBy({
        user: { id: user.id },
        id: updatedFolder.id,
    });
    if (rdbmsFolder !== null) {
        rdbmsFolder.name = updatedFolder.name;
        await folderRepo.save(rdbmsFolder);
        await dataSource.destroy();
        return res.status(200).json({
            OK: true,
        });
    }
    await dataSource.destroy();
    return res.status(500).send({ error: 'Folder not found' });
};
const rdbmsDeleteFolder = async (res, dataSource, user, folderId) => {
    const folderRepo = dataSource.getRepository(rdbms_1.RDBMSFolder);
    const deletedFolder = await folderRepo.findOneBy({
        user: { id: user.id },
        id: folderId,
    });
    if (deletedFolder !== null) {
        await folderRepo.remove(deletedFolder);
        await dataSource.destroy();
        return res.status(200).json({
            OK: true,
        });
    }
    await dataSource.destroy();
    return res.status(500).send({ error: 'Folder not found' });
};
exports.default = handler;
