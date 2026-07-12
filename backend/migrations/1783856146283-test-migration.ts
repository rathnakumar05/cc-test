import { MigrationInterface, QueryRunner } from "typeorm";

export class TestMigration1783856146283 implements MigrationInterface {
    name = 'TestMigration1783856146283'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "homepage_top_videos" ADD "test_link" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "homepage_top_videos" DROP COLUMN "test_link"`);
    }

}
