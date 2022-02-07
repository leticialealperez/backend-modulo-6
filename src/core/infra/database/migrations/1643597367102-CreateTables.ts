import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateTables1643597367102 implements MigrationInterface {
    name = 'CreateTables1643597367102'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("uid" uuid NOT NULL, "login" character varying(30) NOT NULL, "password" character varying(11) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_6e20ce1edf0678a09f1963f9587" PRIMARY KEY ("uid"))`);
        await queryRunner.query(`CREATE TABLE "tasks" ("uid" uuid NOT NULL, "description" character varying(100) NOT NULL, "details" character varying(200) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "user_uid" uuid, CONSTRAINT "PK_3c374ba37d084d0a7f7a91c5c3b" PRIMARY KEY ("uid"))`);
        await queryRunner.query(`ALTER TABLE "tasks" ADD CONSTRAINT "FK_fdc31b2611b0fbc0c3f427ad828" FOREIGN KEY ("user_uid") REFERENCES "users"("uid") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tasks" DROP CONSTRAINT "FK_fdc31b2611b0fbc0c3f427ad828"`);
        await queryRunner.query(`DROP TABLE "tasks"`);
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
