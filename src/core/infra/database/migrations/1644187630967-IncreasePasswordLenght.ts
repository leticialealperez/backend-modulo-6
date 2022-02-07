import {MigrationInterface, QueryRunner} from "typeorm";

export class IncreasePasswordLenght1644187630967 implements MigrationInterface {
    name = 'IncreasePasswordLenght1644187630967'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE users ALTER COLUMN password TYPE varchar(100)`
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE users ALTER COLUMN password TYPE varchar(50)`
        );
    }

}
