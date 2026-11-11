import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateCollabPostRequiredSkillTable1794260926000
    implements MigrationInterface
{
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "collab_post_required_skills",
                columns: [
                    {
                        name: "post_required_skill_id",
                        type: "uuid",
                        isPrimary: true,
                        generationStrategy: "uuid",
                        default: "uuid_generate_v4()",
                    },
                    {
                        name: "collab_post_id",
                        type: "uuid",
                        isNullable: false,
                    },
                    {
                        name: "skill_id",
                        type: "uuid",
                        isNullable: false,
                    },
                ],
                foreignKeys: [
                    {
                        columnNames: ["collab_post_id"],
                        referencedTableName: "collab_posts",
                        referencedColumnNames: ["collab_post_id"],
                    },
                    {
                        columnNames: ["skill_id"],
                        referencedTableName: "skills",
                        referencedColumnNames: ["skill_id"],
                    },
                ],
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("collab_post_required_skills");
    }
}