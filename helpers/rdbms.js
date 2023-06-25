"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUser = exports.getDataSource = void 0;
const const_1 = require("../utils/const");
const rdbms_1 = require("../types/rdbms");
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const tslOptions = {
    host: const_1.RDBMS_SSL_HOST,
    rejectUnauthorized: true,
    ca: const_1.RDBMS_SSL_CA,
    cert: const_1.RDBMS_SSL_CERT,
    key: const_1.RDBMS_SSL_KEY,
};
const getDataSource = async () => {
    let dataSource = null;
    if (const_1.RDBMS_DB_TYPE === 'postgres') {
        dataSource = new typeorm_1.DataSource({
            type: 'postgres',
            applicationName: 'chatbot',
            host: const_1.RDBMS_HOST,
            port: const_1.RDBMS_PORT,
            username: const_1.RDBMS_USER,
            password: const_1.RDBMS_PASS,
            database: const_1.RDBMS_DB,
            entities: [
                rdbms_1.RDBMSUser,
                rdbms_1.RDBMSFolder,
                rdbms_1.RDBMSConversation,
                rdbms_1.RDBMSMessage,
                rdbms_1.RDBMSPrompt,
                rdbms_1.RDBMSSystemPrompt,
                rdbms_1.RDBMSWorkstation,
            ],
            synchronize: const_1.RDBMS_SYNCHRONIZE,
            logging: false,
            ssl: const_1.RDBMS_SSL_ENABLED ? tslOptions : undefined,
        });
    }
    else if (const_1.RDBMS_DB_TYPE === 'cockroachdb') {
        dataSource = new typeorm_1.DataSource({
            type: 'cockroachdb',
            applicationName: 'chatbot',
            host: const_1.RDBMS_HOST,
            port: const_1.RDBMS_PORT,
            username: const_1.RDBMS_USER,
            password: const_1.RDBMS_PASS,
            database: const_1.RDBMS_DB,
            entities: [
                rdbms_1.RDBMSUser,
                rdbms_1.RDBMSFolder,
                rdbms_1.RDBMSConversation,
                rdbms_1.RDBMSMessage,
                rdbms_1.RDBMSPrompt,
                rdbms_1.RDBMSSystemPrompt,
                rdbms_1.RDBMSWorkstation,
            ],
            synchronize: const_1.RDBMS_SYNCHRONIZE,
            logging: false,
            ssl: const_1.RDBMS_SSL_ENABLED ? tslOptions : undefined,
            timeTravelQueries: const_1.RDBMS_COCKROACHDB_TIME_TRAVEL_QUERIES,
        });
    }
    else if (const_1.RDBMS_DB_TYPE === 'mysql') {
        dataSource = new typeorm_1.DataSource({
            type: 'mysql',
            extra: {
                program_name: 'chatbot',
            },
            host: const_1.RDBMS_HOST,
            port: const_1.RDBMS_PORT,
            username: const_1.RDBMS_USER,
            password: const_1.RDBMS_PASS,
            database: const_1.RDBMS_DB,
            entities: [
                rdbms_1.RDBMSUser,
                rdbms_1.RDBMSFolder,
                rdbms_1.RDBMSConversation,
                rdbms_1.RDBMSMessage,
                rdbms_1.RDBMSPrompt,
                rdbms_1.RDBMSSystemPrompt,
                rdbms_1.RDBMSWorkstation,
            ],
            synchronize: const_1.RDBMS_SYNCHRONIZE,
            logging: false,
            ssl: const_1.RDBMS_SSL_ENABLED ? tslOptions : undefined,
        });
    }
    else if (const_1.RDBMS_DB_TYPE === 'mariadb') {
        dataSource = new typeorm_1.DataSource({
            type: 'mariadb',
            extra: {
                program_name: 'chatbot',
            },
            host: const_1.RDBMS_HOST,
            port: const_1.RDBMS_PORT,
            username: const_1.RDBMS_USER,
            password: const_1.RDBMS_PASS,
            database: const_1.RDBMS_DB,
            entities: [
                rdbms_1.RDBMSUser,
                rdbms_1.RDBMSFolder,
                rdbms_1.RDBMSConversation,
                rdbms_1.RDBMSMessage,
                rdbms_1.RDBMSPrompt,
                rdbms_1.RDBMSSystemPrompt,
                rdbms_1.RDBMSWorkstation,
            ],
            synchronize: const_1.RDBMS_SYNCHRONIZE,
            logging: false,
            ssl: const_1.RDBMS_SSL_ENABLED ? tslOptions : undefined,
        });
    }
    if (dataSource !== null) {
        // to initialize initial connection with the database, register all entities
        // and "synchronize" database schema, call "initialize()" method of a newly created database
        // once in your application bootstrap
        await dataSource
            .initialize()
            .then(() => {
            // here you can start to work with your database
        })
            .catch((error) => console.log(error));
        return dataSource;
    }
    else {
        throw new Error('RDBMS type not supported');
    }
};
exports.getDataSource = getDataSource;
const getUser = async (dataSource, id) => {
    // Try to fetch account from database
    const userRepo = dataSource.getRepository(rdbms_1.RDBMSUser);
    let rdbmsUser = await userRepo.findOneBy({ id: id });
    // If no user found, create a new one
    if (!rdbmsUser) {
        rdbmsUser = new rdbms_1.RDBMSUser();
        rdbmsUser.id = id.toLowerCase();
    }
    await userRepo.save(rdbmsUser);
    return rdbmsUser;
};
exports.getUser = getUser;
