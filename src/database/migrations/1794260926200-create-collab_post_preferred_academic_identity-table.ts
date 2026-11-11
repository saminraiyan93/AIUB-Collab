import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateCollabPostPreferredAcademicIdentityTable1794260926200
    implements MigrationInterface
{
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "collab_post_preferred_academic_identities",
                columns: [
                    {
                        name: "post_preferred_academic_identity_id",
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
                        name: "academic_identity",
                        type: "varchar",
                        isNullable: false,
                    },
                ],
                foreignKeys: [
                    {
                        columnNames: ["collab_post_id"],
                        referencedTableName: "collab_posts",
                        referencedColumnNames: ["collab_post_id"],
                    },
                ],
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable(
            "collab_post_preferred_academic_identities",
        );
    }
}