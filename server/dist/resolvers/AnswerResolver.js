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
exports.AnswerResolver = void 0;
const User_1 = require("./../entities/User");
const type_graphql_1 = require("type-graphql");
const Answer_1 = require("../entities/Answer");
let AnswerInput = class AnswerInput {
};
__decorate([
    type_graphql_1.Field(() => type_graphql_1.Int),
    __metadata("design:type", Number)
], AnswerInput.prototype, "questionId", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], AnswerInput.prototype, "content", void 0);
AnswerInput = __decorate([
    type_graphql_1.InputType()
], AnswerInput);
let AnswerUpdateInput = class AnswerUpdateInput {
};
__decorate([
    type_graphql_1.Field(() => String, { nullable: true }),
    __metadata("design:type", String)
], AnswerUpdateInput.prototype, "content", void 0);
__decorate([
    type_graphql_1.Field(() => type_graphql_1.Int, { nullable: true }),
    __metadata("design:type", Number)
], AnswerUpdateInput.prototype, "upvotes", void 0);
__decorate([
    type_graphql_1.Field(() => type_graphql_1.Int, { nullable: true }),
    __metadata("design:type", Number)
], AnswerUpdateInput.prototype, "downvotes", void 0);
AnswerUpdateInput = __decorate([
    type_graphql_1.InputType()
], AnswerUpdateInput);
let AnswerResolver = class AnswerResolver {
    createAnswer(userId, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield User_1.User.findOne({ where: { id: userId } });
            if (!user) {
                throw new Error("No such user exists");
            }
            const enhancedOptions = Object.assign(Object.assign({}, options), { userId });
            try {
                const ans = yield Answer_1.Answer.create(enhancedOptions).save();
                console.log(ans);
            }
            catch (error) {
                console.log(error);
                return false;
            }
            return true;
        });
    }
    updateAnswer(id, input) {
        return __awaiter(this, void 0, void 0, function* () {
            const answer = yield Answer_1.Answer.findOne({ where: { id } });
            if (!answer) {
                throw new Error("No such question exists");
            }
            yield Answer_1.Answer.update({ id }, input);
            return true;
        });
    }
    deleteAnswer(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield Answer_1.Answer.delete({ id });
            return true;
        });
    }
    answers() {
        return Answer_1.Answer.find();
    }
};
__decorate([
    type_graphql_1.Mutation(() => Boolean),
    __param(0, type_graphql_1.Arg("userId", () => type_graphql_1.Int)),
    __param(1, type_graphql_1.Arg("options", () => AnswerInput)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, AnswerInput]),
    __metadata("design:returntype", Promise)
], AnswerResolver.prototype, "createAnswer", null);
__decorate([
    type_graphql_1.Mutation(() => Boolean),
    __param(0, type_graphql_1.Arg("id", () => type_graphql_1.Int)),
    __param(1, type_graphql_1.Arg("input", () => AnswerUpdateInput)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, AnswerUpdateInput]),
    __metadata("design:returntype", Promise)
], AnswerResolver.prototype, "updateAnswer", null);
__decorate([
    type_graphql_1.Mutation(() => Boolean),
    __param(0, type_graphql_1.Arg("id", () => type_graphql_1.Int)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], AnswerResolver.prototype, "deleteAnswer", null);
__decorate([
    type_graphql_1.Query(() => [Answer_1.Answer]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AnswerResolver.prototype, "answers", null);
AnswerResolver = __decorate([
    type_graphql_1.Resolver()
], AnswerResolver);
exports.AnswerResolver = AnswerResolver;
//# sourceMappingURL=AnswerResolver.js.map