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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuestionResolver = void 0;
const User_1 = require("../entities/User");
const type_graphql_1 = require("type-graphql");
const Question_1 = require("../entities/Question");
let QuestionInput = class QuestionInput {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], QuestionInput.prototype, "text", void 0);
QuestionInput = __decorate([
    type_graphql_1.InputType()
], QuestionInput);
let QuestionUpdateInput = class QuestionUpdateInput {
};
__decorate([
    type_graphql_1.Field(() => String, { nullable: true }),
    __metadata("design:type", String)
], QuestionUpdateInput.prototype, "text", void 0);
__decorate([
    type_graphql_1.Field(() => type_graphql_1.Int, { nullable: true }),
    __metadata("design:type", Number)
], QuestionUpdateInput.prototype, "upvotes", void 0);
__decorate([
    type_graphql_1.Field(() => type_graphql_1.Int, { nullable: true }),
    __metadata("design:type", Number)
], QuestionUpdateInput.prototype, "downvotes", void 0);
QuestionUpdateInput = __decorate([
    type_graphql_1.InputType()
], QuestionUpdateInput);
let QuestionResolver = class QuestionResolver {
    createQuestion(userId, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield User_1.User.findOne({ where: { id: userId } });
            if (!user) {
                throw new Error("No such user exists");
            }
            const enhancedOptions = Object.assign(Object.assign({}, options), { userId });
            const question = yield Question_1.Question.create(enhancedOptions).save();
            return question;
        });
    }
    updateQuestion(id, input) {
        return __awaiter(this, void 0, void 0, function* () {
            yield Question_1.Question.update({ id }, input);
            return true;
        });
    }
    deleteQuestion(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield Question_1.Question.delete({ id });
            return true;
        });
    }
    questions() {
        return Question_1.Question.find({});
    }
};
__decorate([
    type_graphql_1.Mutation(() => Question_1.Question),
    __param(0, type_graphql_1.Arg("userId", () => type_graphql_1.Int)),
    __param(1, type_graphql_1.Arg("options", () => QuestionInput)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, QuestionInput]),
    __metadata("design:returntype", Promise)
], QuestionResolver.prototype, "createQuestion", null);
__decorate([
    type_graphql_1.Mutation(() => Boolean),
    __param(0, type_graphql_1.Arg("id", () => type_graphql_1.Int)),
    __param(1, type_graphql_1.Arg("input", () => QuestionUpdateInput)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, QuestionUpdateInput]),
    __metadata("design:returntype", Promise)
], QuestionResolver.prototype, "updateQuestion", null);
__decorate([
    type_graphql_1.Mutation(() => Boolean),
    __param(0, type_graphql_1.Arg("id", () => type_graphql_1.Int)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], QuestionResolver.prototype, "deleteQuestion", null);
__decorate([
    type_graphql_1.Query(() => [Question_1.Question]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], QuestionResolver.prototype, "questions", null);
QuestionResolver = __decorate([
    type_graphql_1.Resolver()
], QuestionResolver);
exports.QuestionResolver = QuestionResolver;
//# sourceMappingURL=QuestionResolver.js.map