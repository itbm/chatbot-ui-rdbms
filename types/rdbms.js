"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RDBMSWorkstation = exports.RDBMSSystemPrompt = exports.RDBMSPrompt = exports.RDBMSMessage = exports.RDBMSConversation = exports.RDBMSFolder = exports.RDBMSUser = void 0;
const const_1 = require("../utils/const");
const typeorm_1 = require("typeorm");
let textType = "text";
let timestampType = "timestamptz";
let floatType = "real";
if (["mysql", "mariadb"].includes(const_1.RDBMS_DB_TYPE)) {
    textType = "longtext";
    timestampType = "timestamp";
    floatType = "float";
}
let RDBMSUser = class RDBMSUser {
};
__decorate([
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", String)
], RDBMSUser.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: textType, nullable: true }),
    __metadata("design:type", Object)
], RDBMSUser.prototype, "pass", void 0);
RDBMSUser = __decorate([
    (0, typeorm_1.Entity)()
], RDBMSUser);
exports.RDBMSUser = RDBMSUser;
let RDBMSFolder = class RDBMSFolder {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], RDBMSFolder.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => RDBMSUser, { onDelete: "CASCADE", onUpdate: "CASCADE", nullable: false }),
    (0, typeorm_1.JoinColumn)({ referencedColumnName: "id", name: "user_id" }),
    __metadata("design:type", RDBMSUser)
], RDBMSFolder.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], RDBMSFolder.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], RDBMSFolder.prototype, "folder_type", void 0);
RDBMSFolder = __decorate([
    (0, typeorm_1.Entity)()
], RDBMSFolder);
exports.RDBMSFolder = RDBMSFolder;
let RDBMSConversation = class RDBMSConversation {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], RDBMSConversation.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => RDBMSUser, { onDelete: "CASCADE", onUpdate: "CASCADE", nullable: false }),
    (0, typeorm_1.JoinColumn)({ referencedColumnName: "id", name: "user_id" }),
    __metadata("design:type", RDBMSUser)
], RDBMSConversation.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], RDBMSConversation.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], RDBMSConversation.prototype, "model_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: textType }),
    __metadata("design:type", String)
], RDBMSConversation.prototype, "prompt", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: floatType }),
    __metadata("design:type", Number)
], RDBMSConversation.prototype, "temperature", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => RDBMSFolder, { onUpdate: "CASCADE", nullable: true }),
    (0, typeorm_1.JoinColumn)({ referencedColumnName: "id", name: "folder_id" }),
    __metadata("design:type", Object)
], RDBMSConversation.prototype, "folder", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: timestampType, default: () => "NOW()" }),
    __metadata("design:type", Date)
], RDBMSConversation.prototype, "timestamp", void 0);
RDBMSConversation = __decorate([
    (0, typeorm_1.Entity)()
], RDBMSConversation);
exports.RDBMSConversation = RDBMSConversation;
let RDBMSMessage = class RDBMSMessage {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], RDBMSMessage.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => RDBMSUser, { onDelete: "CASCADE", onUpdate: "CASCADE", nullable: false }),
    (0, typeorm_1.JoinColumn)({ referencedColumnName: "id", name: "user_id" }),
    __metadata("design:type", RDBMSUser)
], RDBMSMessage.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => RDBMSConversation, {
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
        nullable: false,
    }),
    (0, typeorm_1.JoinColumn)({ referencedColumnName: "id", name: "conversation_id" }),
    __metadata("design:type", RDBMSConversation)
], RDBMSMessage.prototype, "conversation", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], RDBMSMessage.prototype, "role", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: textType }),
    __metadata("design:type", String)
], RDBMSMessage.prototype, "content", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: timestampType, default: () => "NOW()" }),
    __metadata("design:type", Date)
], RDBMSMessage.prototype, "timestamp", void 0);
RDBMSMessage = __decorate([
    (0, typeorm_1.Entity)()
], RDBMSMessage);
exports.RDBMSMessage = RDBMSMessage;
let RDBMSPrompt = class RDBMSPrompt {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], RDBMSPrompt.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => RDBMSUser, { onDelete: "CASCADE", onUpdate: "CASCADE", nullable: false }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", RDBMSUser)
], RDBMSPrompt.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], RDBMSPrompt.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: textType }),
    __metadata("design:type", String)
], RDBMSPrompt.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: textType }),
    __metadata("design:type", String)
], RDBMSPrompt.prototype, "content", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], RDBMSPrompt.prototype, "model_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => RDBMSFolder, { onUpdate: "CASCADE", nullable: true }),
    (0, typeorm_1.JoinColumn)({ referencedColumnName: "id", name: "folder_id" }),
    __metadata("design:type", Object)
], RDBMSPrompt.prototype, "folder", void 0);
RDBMSPrompt = __decorate([
    (0, typeorm_1.Entity)()
], RDBMSPrompt);
exports.RDBMSPrompt = RDBMSPrompt;
let RDBMSSystemPrompt = class RDBMSSystemPrompt {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], RDBMSSystemPrompt.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => RDBMSUser, { onDelete: "CASCADE", onUpdate: "CASCADE", nullable: false }),
    (0, typeorm_1.JoinColumn)({ referencedColumnName: "id", name: "user_id" }),
    __metadata("design:type", RDBMSUser)
], RDBMSSystemPrompt.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], RDBMSSystemPrompt.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: textType }),
    __metadata("design:type", String)
], RDBMSSystemPrompt.prototype, "content", void 0);
RDBMSSystemPrompt = __decorate([
    (0, typeorm_1.Entity)()
], RDBMSSystemPrompt);
exports.RDBMSSystemPrompt = RDBMSSystemPrompt;
let RDBMSWorkstation = class RDBMSWorkstation {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], RDBMSWorkstation.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], RDBMSWorkstation.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => RDBMSUser, { onDelete: "CASCADE", onUpdate: "CASCADE", nullable: false }),
    (0, typeorm_1.JoinColumn)({ referencedColumnName: "id", name: "user_id" }),
    __metadata("design:type", RDBMSUser)
], RDBMSWorkstation.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: textType }),
    __metadata("design:type", String)
], RDBMSWorkstation.prototype, "conversations", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: textType }),
    __metadata("design:type", String)
], RDBMSWorkstation.prototype, "prompts", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: textType }),
    __metadata("design:type", String)
], RDBMSWorkstation.prototype, "system_prompts", void 0);
RDBMSWorkstation = __decorate([
    (0, typeorm_1.Entity)()
], RDBMSWorkstation);
exports.RDBMSWorkstation = RDBMSWorkstation;
