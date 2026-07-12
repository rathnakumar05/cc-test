import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddHomePageTbl1783799362097 implements MigrationInterface {
  name = 'AddHomePageTbl1783799362097';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "homepage_top_videos" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "post_id" character varying,
        "title" character varying,
        "summary" text,
        "facebook_link" character varying,
        "twitter_link" character varying,
        "created_at" TIMESTAMP NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
        CONSTRAINT "PK_b9ae95a4b6c8ba4e290a7687f56" PRIMARY KEY ("id")
      )
    `);

    await queryRunner.query(`
      CREATE INDEX "idx_post_id"
      ON "homepage_top_videos" ("post_id")
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX "public"."idx_post_id"`);
    await queryRunner.query(`DROP TABLE "homepage_top_videos"`);
  }
}
