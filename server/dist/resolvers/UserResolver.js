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
exports.UserResolver = void 0;
const sendRefreshToken_1 = require("../sendRefreshToken");
const auth_1 = require("./../auth");
const User_1 = require("./../entities/User");
const type_graphql_1 = require("type-graphql");
const bcryptjs_1 = require("bcryptjs");
const typeorm_1 = require("typeorm");
const jsonwebtoken_1 = require("jsonwebtoken");
const isAuth_1 = require("../isAuth");
let QuestionInput = class QuestionInput {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], QuestionInput.prototype, "text", void 0);
QuestionInput = __decorate([
    type_graphql_1.InputType()
], QuestionInput);
let LoginResponse = class LoginResponse {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], LoginResponse.prototype, "accessToken", void 0);
__decorate([
    type_graphql_1.Field(() => User_1.User),
    __metadata("design:type", User_1.User)
], LoginResponse.prototype, "user", void 0);
LoginResponse = __decorate([
    type_graphql_1.ObjectType()
], LoginResponse);
let UserResolver = class UserResolver {
    register(firstname, lastname, email, username, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const hashedPassword = yield bcryptjs_1.hash(password, 12);
            try {
                yield User_1.User.insert({
                    firstname,
                    lastname,
                    username,
                    email,
                    password: hashedPassword
                });
            }
            catch (err) {
                console.log(err);
                return false;
            }
            return true;
        });
    }
    login(username, password, { res }) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield User_1.User.findOne({ where: { username } });
            if (!user) {
                throw new Error("could not find user");
            }
            const valid = yield bcryptjs_1.compare(password, user.password);
            if (!valid) {
                throw new Error("invalid credentials");
            }
            console.log("cookie was set");
            sendRefreshToken_1.sendRefreshToken(res, auth_1.createRefreshToken(user));
            return {
                accessToken: auth_1.createAccessToken(user),
                user
            };
        });
    }
    deleteUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield User_1.User.findOne({ where: { id } });
            if (!user) {
                throw new Error("Cannot delete user that does not exist");
            }
            yield User_1.User.delete({ id });
            return true;
        });
    }
    users() {
        return User_1.User.find();
    }
    bye({ payload }) {
        console.log(payload);
        return `your user id is: ${payload.userId}`;
    }
    revokeRefreshTokensForUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield typeorm_1.getConnection()
                .getRepository(User_1.User)
                .increment({ id: userId }, "tokenVersion", 1);
            return true;
        });
    }
    logout({ res }) {
        return __awaiter(this, void 0, void 0, function* () {
            sendRefreshToken_1.sendRefreshToken(res, "");
            return true;
        });
    }
    me(context) {
        const authorization = context.req.headers["authorization"];
        if (!authorization) {
            return null;
        }
        try {
            const token = authorization.split(" ")[1];
            const payload = jsonwebtoken_1.verify(token, "secret-key");
            return User_1.User.findOne(payload.userId);
        }
        catch (err) {
            console.log(err);
            return null;
        }
    }
};
__decorate([
    type_graphql_1.Mutation(() => Boolean),
    __param(0, type_graphql_1.Arg("firstname")),
    __param(1, type_graphql_1.Arg("lastname")),
    __param(2, type_graphql_1.Arg("email")),
    __param(3, type_graphql_1.Arg("username")),
    __param(4, type_graphql_1.Arg("password")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String, String]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "register", null);
__decorate([
    type_graphql_1.Mutation(() => LoginResponse),
    __param(0, type_graphql_1.Arg("username")),
    __param(1, type_graphql_1.Arg("password")),
    __param(2, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "login", null);
__decorate([
    type_graphql_1.Mutation(() => Boolean),
    __param(0, type_graphql_1.Arg("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "deleteUser", null);
__decorate([
    type_graphql_1.Query(() => [User_1.User]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UserResolver.prototype, "users", null);
__decorate([
    type_graphql_1.Query(() => String),
    type_graphql_1.UseMiddleware(isAuth_1.isAuth),
    __param(0, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UserResolver.prototype, "bye", null);
__decorate([
    type_graphql_1.Mutation(() => Boolean),
    __param(0, type_graphql_1.Arg("userId", () => type_graphql_1.Int)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "revokeRefreshTokensForUser", null);
__decorate([
    type_graphql_1.Mutation(() => Boolean),
    __param(0, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "logout", null);
__decorate([
    type_graphql_1.Query(() => User_1.User, { nullable: true }),
    __param(0, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UserResolver.prototype, "me", null);
UserResolver = __decorate([
    type_graphql_1.Resolver()
], UserResolver);
exports.UserResolver = UserResolver;
//# sourceMappingURL=UserResolver.js.map