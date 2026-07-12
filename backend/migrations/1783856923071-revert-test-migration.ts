import { MigrationInterface, QueryRunner } from "typeorm";

export class RevertTestMigration1783856923071 implements MigrationInterface {
    name = 'RevertTestMigration1783856923071'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "homepage_top_videos" DROP COLUMN "test_link"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "homepage_top_videos" ADD "test_link" character varying`);
    }

}
