"use strict";
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
exports.AddedAnswerToUserRelation821617731466748 = void 0;
class AddedAnswerToUserRelation821617731466748 {
    constructor() {
        this.name = 'AddedAnswerToUserRelation821617731466748';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "question" ALTER COLUMN "upvotes" SET DEFAULT '0'`);
            yield queryRunner.query(`ALTER TABLE "question" ALTER COLUMN "downvotes" SET DEFAULT '0'`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "question" ALTER COLUMN "downvotes" SET DEFAULT '1'`);
            yield queryRunner.query(`ALTER TABLE "question" ALTER COLUMN "upvotes" SET DEFAULT '1'`);
        });
    }
}
exports.AddedAnswerToUserRelation821617731466748 = AddedAnswerToUserRelation821617731466748;
//# sourceMappingURL=1617731466748-AddedAnswerToUserRelation82.js.map