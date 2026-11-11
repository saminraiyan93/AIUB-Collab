import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateSkillTable1794260919500 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "skills",
                columns: [
                    {
                        name: "skill_id",
                        type: "uuid",
                        isPrimary: true,
                        generationStrategy: "uuid",
                        default: "uuid_generate_v4()",
                    },
                    {
                        name: "skill_name",
                        type: "varchar",
                        isNullable: false,
                    },
                ],
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("skills");
    }
}