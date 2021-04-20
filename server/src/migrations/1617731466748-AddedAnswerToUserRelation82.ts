import {MigrationInterface, QueryRunner} from "typeorm";

export class AddedAnswerToUserRelation821617731466748 implements MigrationInterface {
    name = 'AddedAnswerToUserRelation821617731466748'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "question" ALTER COLUMN "upvotes" SET DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "question" ALTER COLUMN "downvotes" SET DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "question" ALTER COLUMN "downvotes" SET DEFAULT '1'`);
        await queryRunner.query(`ALTER TABLE "question" ALTER COLUMN "upvotes" SET DEFAULT '1'`);
    }

}
