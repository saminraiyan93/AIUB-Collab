import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateCollabPostTable1794260925000
    implements MigrationInterface
{
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "collab_posts",
                columns: [
                    {
                        name: "collab_post_id",
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
                        name: "post_title",
                        type: "varchar",
                        isNullable: false,
                    },
                    {
                        name: "post_description",
                        type: "varchar",
                        isNullable: true,
                    },
                    {
                        name: "collab_category",
                        type: "varchar",
                        isNullable: false,
                    },
                    {
                        name: "collab_type",
                        type: "varchar",
                        isNullable: false,
                    },
                    {
                        name: "collaborators_needed",
                        type: "integer",
                        isNullable: false,
                    },
                    {
                        name: "application_deadline",
                        type: "timestamp",
                        isNullable: false,
                    },
                    {
                        name: "location_type",
                        type: "varchar",
                        isNullable: false,
                    },
                    {
                        name: "post_status",
                        type: "varchar",
                        isNullable: false,
                    },
                    {
                        name: "post_contact_id",
                        type: "uuid",
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
                foreignKeys: [
                    {
                        columnNames: ["user_profile_id"],
                        referencedTableName: "user_profiles",
                        referencedColumnNames: ["user_profile_id"],
                    },
                    {
                        columnNames: ["post_contact_id"],
                        referencedTableName: "user_profile_contacts",
                        referencedColumnNames: ["user_profile_contact_id"],
                    },
                ],
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("collab_posts");
    }
}