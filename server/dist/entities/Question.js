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
exports.Question = void 0;
const User_1 = require("./User");
const typeorm_1 = require("typeorm");
const type_graphql_1 = require("type-graphql");
const Answer_1 = require("./Answer");
let Question = class Question extends typeorm_1.BaseEntity {
};
__decorate([
    type_graphql_1.Field(() => type_graphql_1.Int),
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Question.prototype, "id", void 0);
__decorate([
    typeorm_1.ManyToOne((type) => User_1.User, (user) => user.questions, { nullable: true }),
    __metadata("design:type", User_1.User)
], Question.prototype, "user", void 0);
__decorate([
    type_graphql_1.Field(() => [Answer_1.Answer]),
    typeorm_1.OneToMany((type) => Answer_1.Answer, (answer) => answer.question, {
        nullable: true,
        cascade: true,
        eager: true
    }),
    __metadata("design:type", Array)
], Question.prototype, "answers", void 0);
__decorate([
    type_graphql_1.Field(() => type_graphql_1.Int),
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Question.prototype, "userId", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column(),
    __metadata("design:type", String)
], Question.prototype, "text", void 0);
__decorate([
    type_graphql_1.Field(() => type_graphql_1.Int),
    typeorm_1.Column("int", { default: 0, nullable: true }),
    __metadata("design:type", Number)
], Question.prototype, "upvotes", void 0);
__decorate([
    type_graphql_1.Field(() => type_graphql_1.Int),
    typeorm_1.Column("int", { default: 0, nullable: true }),
    __metadata("design:type", Number)
], Question.prototype, "downvotes", void 0);
Question = __decorate([
    type_graphql_1.ObjectType(),
    typeorm_1.Entity("question")
], Question);
exports.Question = Question;
//# sourceMappingURL=Question.js.map