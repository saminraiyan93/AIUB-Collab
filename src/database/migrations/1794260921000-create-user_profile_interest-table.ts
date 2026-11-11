import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateUserProfileInterestTable1794260921000
    implements MigrationInterface
{
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "user_profile_interests",
                columns: [
                    {
                        name: "user_profile_interest_id",
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
                        name: "interest_id",
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
                        columnNames: ["interest_id"],
                        referencedTableName: "interests",
                        referencedColumnNames: ["interest_id"],
                    },
                ],
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("user_profile_interests");
    }
}