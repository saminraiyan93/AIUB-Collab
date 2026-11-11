import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateCollabPostPreferredInterestTable1794260926300
    implements MigrationInterface
{
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "collab_post_preferred_interests",
                columns: [
                    {
                        name: "post_preferred_interest_id",
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
                        name: "interest_id",
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
                        columnNames: ["interest_id"],
                        referencedTableName: "interests",
                        referencedColumnNames: ["interest_id"],
                    },
                ],
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("collab_post_preferred_interests");
    }
}