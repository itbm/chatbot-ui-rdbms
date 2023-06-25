"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RDBMS_COCKROACHDB_TIME_TRAVEL_QUERIES = exports.RDBMS_SSL_KEY = exports.RDBMS_SSL_CERT = exports.RDBMS_SSL_CA = exports.RDBMS_SSL_HOST = exports.RDBMS_SSL_ENABLED = exports.RDBMS_SYNCHRONIZE = exports.RDBMS_PASS = exports.RDBMS_USER = exports.RDBMS_DB = exports.RDBMS_PORT = exports.RDBMS_HOST = exports.RDBMS_DB_TYPE = void 0;
const docker_1 = require("@chatbot-ui/core/utils/docker");
exports.RDBMS_DB_TYPE = (0, docker_1.dockerEnvVarFix)(process.env.RDBMS_DB_TYPE) || 'postgres';
exports.RDBMS_HOST = (0, docker_1.dockerEnvVarFix)(process.env.RDBMS_HOST) || '127.0.0.1';
exports.RDBMS_PORT = parseInt((0, docker_1.dockerEnvVarFix)(process.env.RDBMS_PORT) || '5432');
exports.RDBMS_DB = (0, docker_1.dockerEnvVarFix)(process.env.RDBMS_DB) || 'postgres';
exports.RDBMS_USER = (0, docker_1.dockerEnvVarFix)(process.env.RDBMS_USER) || 'postgres';
exports.RDBMS_PASS = (0, docker_1.dockerEnvVarFix)(process.env.RDBMS_PASS) || 'password';
exports.RDBMS_SYNCHRONIZE = !((0, docker_1.dockerEnvVarFix)(process.env.RDBMS_SYNCHRONIZE) == 'false') || true;
exports.RDBMS_SSL_ENABLED = (0, docker_1.dockerEnvVarFix)(process.env.RDBMS_SSL_ENABLED) == 'true' || false;
exports.RDBMS_SSL_HOST = (0, docker_1.dockerEnvVarFix)(process.env.RDBMS_SSL_HOST) || '';
exports.RDBMS_SSL_CA = (0, docker_1.dockerEnvVarFix)(process.env.RDBMS_SSL_CA) || '';
exports.RDBMS_SSL_CERT = (0, docker_1.dockerEnvVarFix)(process.env.RDBMS_SSL_CERT) || '';
exports.RDBMS_SSL_KEY = (0, docker_1.dockerEnvVarFix)(process.env.RDBMS_SSL_KEY) || '';
exports.RDBMS_COCKROACHDB_TIME_TRAVEL_QUERIES = (0, docker_1.dockerEnvVarFix)(process.env.RDBMS_COCKROACHDB_TIME_TRAVEL_QUERIES) ==
    'true' || false;
