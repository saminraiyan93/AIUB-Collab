import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateInterestTable1794260920500
    implements MigrationInterface
{
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "interests",
                columns: [
                    {
                        name: "interest_id",
                        type: "uuid",
                        isPrimary: true,
                        generationStrategy: "uuid",
                        default: "uuid_generate_v4()",
                    },
                    {
                        name: "interest_name",
                        type: "varchar",
                        isNullable: false,
                    },
                ],
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("interests");
    }
}