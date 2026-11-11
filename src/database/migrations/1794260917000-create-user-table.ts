import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateUserTable1794260917000 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "users",
                columns: [
                    {
                        name: "user_id",
                        type: "uuid",
                        isPrimary: true,
                        generationStrategy: "uuid",
                        default: "uuid_generate_v4()",
                    },
                    {
                        name: "user_name",
                        type: "varchar",
                        isNullable: false,
                    },
                    {
                        name: "user_email",
                        type: "varchar",
                        isNullable: false,
                    },
                    {
                        name: "user_password",
                        type: "varchar",
                        isNullable: false,
                    },
                    {
                        name: "user_role",
                        type: "varchar",
                        isNullable: false,
                    },
                    {
                        name: "admin_level",
                        type: "varchar",
                        isNullable: true,
                    },
                    {
                        name: "account_status",
                        type: "varchar",
                        isNullable: false,
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
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("users");
    }
}