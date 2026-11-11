import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateUserLinkedProfileTable1794260922000
    implements MigrationInterface
{
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "user_linked_profiles",
                columns: [
                    {
                        name: "linked_profile_id",
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
                        name: "platform_name",
                        type: "varchar",
                        isNullable: false,
                    },
                    {
                        name: "profile_url",
                        type: "varchar",
                        isNullable: false,
                    },
                ],
                foreignKeys: [
                    {
                        columnNames: ["user_profile_id"],
                        referencedTableName: "user_profiles",
                        referencedColumnNames: ["user_profile_id"],
                    },
                ],
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("user_linked_profiles");
    }
}