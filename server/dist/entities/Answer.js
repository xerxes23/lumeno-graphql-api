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
exports.Answer = void 0;
const Question_1 = require("./Question");
const User_1 = require("./User");
const typeorm_1 = require("typeorm");
const type_graphql_1 = require("type-graphql");
let Answer = class Answer extends typeorm_1.BaseEntity {
};
__decorate([
    type_graphql_1.Field(() => type_graphql_1.Int),
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Answer.prototype, "id", void 0);
__decorate([
    typeorm_1.ManyToOne((type) => User_1.User, (user) => user.answers, {
        nullable: true
    }),
    __metadata("design:type", User_1.User)
], Answer.prototype, "user", void 0);
__decorate([
    typeorm_1.ManyToOne((type) => Question_1.Question, (question) => question.answers),
    __metadata("design:type", Question_1.Question)
], Answer.prototype, "question", void 0);
__decorate([
    type_graphql_1.Field(() => type_graphql_1.Int),
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Answer.prototype, "userId", void 0);
__decorate([
    type_graphql_1.Field(() => type_graphql_1.Int),
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Answer.prototype, "questionId", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column(),
    __metadata("design:type", String)
], Answer.prototype, "content", void 0);
__decorate([
    type_graphql_1.Field(() => type_graphql_1.Int),
    typeorm_1.Column("int", { default: 1, nullable: true }),
    __metadata("design:type", Number)
], Answer.prototype, "upvotes", void 0);
__decorate([
    type_graphql_1.Field(() => type_graphql_1.Int),
    typeorm_1.Column("int", { default: 0, nullable: true }),
    __metadata("design:type", Number)
], Answer.prototype, "downvotes", void 0);
Answer = __decorate([
    type_graphql_1.ObjectType(),
    typeorm_1.Entity("answer")
], Answer);
exports.Answer = Answer;
//# sourceMappingURL=Answer.js.map