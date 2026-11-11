import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateUserProfileSkillTable1794260920000
    implements MigrationInterface
{
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "user_profile_skills",
                columns: [
                    {
                        name: "user_profile_skill_id",
                        type: "uuid",
                        isPrimary: true,
                        generationStrategy: "uuid",
                        default: "uuid_generate_v4()",
                    },
                    {
                        name: "user_profile_id",
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
                        columnNames: ["user_profile_id"],
                        referencedTableName: "user_profiles",
                        referencedColumnNames: ["user_profile_id"],
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
        await queryRunner.dropTable("user_profile_skills");
    }
}