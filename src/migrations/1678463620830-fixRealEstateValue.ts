import { MigrationInterface, QueryRunner } from "typeorm";

export class fixRealEstateValue1678463620830 implements MigrationInterface {
    name = 'fixRealEstateValue1678463620830'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "real_estate" ALTER COLUMN "value" TYPE numeric(12,2)`);
        await queryRunner.query(`ALTER TABLE "real_estate" ALTER COLUMN "value" SET DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "real_estate" ALTER COLUMN "value" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "real_estate" ALTER COLUMN "value" TYPE numeric`);
    }

}
