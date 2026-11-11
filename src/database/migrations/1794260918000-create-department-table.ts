import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateDepartmentTable1794260918000 implements MigrationInterface
{
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "departments",
                columns: [
                    {
                        name: "department_id",
                        type: "uuid",
                        isPrimary: true,
                        generationStrategy: "uuid",
                        default: "uuid_generate_v4()",
                    },
                    {
                        name: "department_name",
                        type: "varchar",
                        isNullable: false,
                    },
                ],
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("departments");
    }
}