import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateUserProfileTable1794260919000
    implements MigrationInterface
{
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "user_profiles",
                columns: [
                    {
                        name: "user_profile_id",
                        type: "uuid",
                        isPrimary: true,
                        generationStrategy: "uuid",
                        default: "uuid_generate_v4()",
                    },
                    {
                        name: "user_id",
                        type: "uuid",
                        isUnique: true,
                        isNullable: false,
                    },
                    {
                        name: "profile_image",
                        type: "varchar",
                        isNullable: false,
                    },
                    {
                        name: "academic_identity",
                        type: "varchar",
                        isNullable: false,
                    },
                    {
                        name: "department_id",
                        type: "uuid",
                        isNullable: false,
                    },
                    {
                        name: "bio",
                        type: "varchar",
                        isNullable: true,
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "CURRENT_TIMESTAMP",
                    },
                    {
                        name: "updated_at",
                        type: "timestamp",
                        default: "CURRENT_TIMESTAMP",
                    },
                ],
                foreignKeys: [
                    {
                        columnNames: ["user_id"],
                        referencedTableName: "users",
                        referencedColumnNames: ["user_id"],
                    },
                    {
                        columnNames: ["department_id"],
                        referencedTableName: "departments",
                        referencedColumnNames: ["department_id"],
                    },
                ],
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("user_profiles");
    }
}