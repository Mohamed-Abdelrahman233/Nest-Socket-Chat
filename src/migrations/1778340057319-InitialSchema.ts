import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialSchema1778340057319 implements MigrationInterface {
    name = 'InitialSchema1778340057319'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`group_members\` DROP FOREIGN KEY \`FK_2c840df5db52dc6b4a1b0b69c6e\``);
        await queryRunner.query(`ALTER TABLE \`group_members\` DROP FOREIGN KEY \`FK_ca71c031c6cb9c370cb1dec53b7\``);
        await queryRunner.query(`ALTER TABLE \`group_members\` ADD \`groupId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`group_members\` ADD CONSTRAINT \`FK_ca71c031c6cb9c370cb1dec53b7\` FOREIGN KEY (\`creator_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`group_members\` ADD CONSTRAINT \`FK_1aa8d31831c3126947e7a713c2b\` FOREIGN KEY (\`groupId\`) REFERENCES \`groups\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`group_members\` DROP FOREIGN KEY \`FK_1aa8d31831c3126947e7a713c2b\``);
        await queryRunner.query(`ALTER TABLE \`group_members\` DROP FOREIGN KEY \`FK_ca71c031c6cb9c370cb1dec53b7\``);
        await queryRunner.query(`ALTER TABLE \`group_members\` DROP COLUMN \`groupId\``);
        await queryRunner.query(`ALTER TABLE \`group_members\` ADD CONSTRAINT \`FK_ca71c031c6cb9c370cb1dec53b7\` FOREIGN KEY (\`creator_id\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`group_members\` ADD CONSTRAINT \`FK_2c840df5db52dc6b4a1b0b69c6e\` FOREIGN KEY (\`group_id\`) REFERENCES \`groups\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
