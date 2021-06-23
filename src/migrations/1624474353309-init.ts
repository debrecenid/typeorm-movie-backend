import { MigrationInterface, QueryRunner } from 'typeorm'

export class init1624474353309 implements MigrationInterface {
  name = 'Init1624474353309'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "category" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "name" character varying NOT NULL, CONSTRAINT "PK_9c4e4a89e3674fc9f382d733f03" PRIMARY KEY ("id"))`,
      undefined
    )
    await queryRunner.query(
      `CREATE TABLE "movie" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "title" character varying NOT NULL, CONSTRAINT "PK_cb3bb4d61cf764dc035cbedd422" PRIMARY KEY ("id"))`,
      undefined
    )
    await queryRunner.query(
      `CREATE TABLE "actor" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "name" character varying NOT NULL, CONSTRAINT "PK_05b325494fcc996a44ae6928e5e" PRIMARY KEY ("id"))`,
      undefined
    )
    await queryRunner.query(
      `CREATE TABLE "movie_actors_actor" ("movieId" uuid NOT NULL, "actorId" uuid NOT NULL, CONSTRAINT "PK_a69e570bd35d7cd2139d12270e9" PRIMARY KEY ("movieId", "actorId"))`,
      undefined
    )
    await queryRunner.query(
      `CREATE INDEX "IDX_992f9af300d8c96c46fea4e541" ON "movie_actors_actor" ("movieId") `,
      undefined
    )
    await queryRunner.query(
      `CREATE INDEX "IDX_65be8ded67af2677acfd19854c" ON "movie_actors_actor" ("actorId") `,
      undefined
    )
    await queryRunner.query(
      `CREATE TABLE "movie_categories_category" ("movieId" uuid NOT NULL, "categoryId" uuid NOT NULL, CONSTRAINT "PK_5966afcbb854aef6e0f4d2ae40c" PRIMARY KEY ("movieId", "categoryId"))`,
      undefined
    )
    await queryRunner.query(
      `CREATE INDEX "IDX_0d43cf9426be5b4db28f207179" ON "movie_categories_category" ("movieId") `,
      undefined
    )
    await queryRunner.query(
      `CREATE INDEX "IDX_32d9eb1bb6f1e2bee2411b7226" ON "movie_categories_category" ("categoryId") `,
      undefined
    )
    await queryRunner.query(
      `ALTER TABLE "movie_actors_actor" ADD CONSTRAINT "FK_992f9af300d8c96c46fea4e5419" FOREIGN KEY ("movieId") REFERENCES "movie"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
      undefined
    )
    await queryRunner.query(
      `ALTER TABLE "movie_actors_actor" ADD CONSTRAINT "FK_65be8ded67af2677acfd19854c2" FOREIGN KEY ("actorId") REFERENCES "actor"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
      undefined
    )
    await queryRunner.query(
      `ALTER TABLE "movie_categories_category" ADD CONSTRAINT "FK_0d43cf9426be5b4db28f2071794" FOREIGN KEY ("movieId") REFERENCES "movie"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
      undefined
    )
    await queryRunner.query(
      `ALTER TABLE "movie_categories_category" ADD CONSTRAINT "FK_32d9eb1bb6f1e2bee2411b7226c" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
      undefined
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "movie_categories_category" DROP CONSTRAINT "FK_32d9eb1bb6f1e2bee2411b7226c"`,
      undefined
    )
    await queryRunner.query(
      `ALTER TABLE "movie_categories_category" DROP CONSTRAINT "FK_0d43cf9426be5b4db28f2071794"`,
      undefined
    )
    await queryRunner.query(
      `ALTER TABLE "movie_actors_actor" DROP CONSTRAINT "FK_65be8ded67af2677acfd19854c2"`,
      undefined
    )
    await queryRunner.query(
      `ALTER TABLE "movie_actors_actor" DROP CONSTRAINT "FK_992f9af300d8c96c46fea4e5419"`,
      undefined
    )
    await queryRunner.query(
      `DROP INDEX "IDX_32d9eb1bb6f1e2bee2411b7226"`,
      undefined
    )
    await queryRunner.query(
      `DROP INDEX "IDX_0d43cf9426be5b4db28f207179"`,
      undefined
    )
    await queryRunner.query(`DROP TABLE "movie_categories_category"`, undefined)
    await queryRunner.query(
      `DROP INDEX "IDX_65be8ded67af2677acfd19854c"`,
      undefined
    )
    await queryRunner.query(
      `DROP INDEX "IDX_992f9af300d8c96c46fea4e541"`,
      undefined
    )
    await queryRunner.query(`DROP TABLE "movie_actors_actor"`, undefined)
    await queryRunner.query(`DROP TABLE "actor"`, undefined)
    await queryRunner.query(`DROP TABLE "movie"`, undefined)
    await queryRunner.query(`DROP TABLE "category"`, undefined)
  }
}
