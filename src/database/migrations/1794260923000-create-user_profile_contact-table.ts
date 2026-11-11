import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateUserProfileContactTable1794260923000
    implements MigrationInterface
{
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "user_profile_contacts",
                columns: [
                    {
                        name: "user_profile_contact_id",
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
                        name: "contact_via",
                        type: "varchar",
                        isNullable: false,
                    },
                    {
                        name: "contact_value",
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
        await queryRunner.dropTable("user_profile_contacts");
    }
}