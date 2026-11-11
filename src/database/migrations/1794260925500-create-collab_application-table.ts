import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateCollabApplicationTable1794260925500
    implements MigrationInterface
{
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "collab_applications",
                columns: [
                    {
                        name: "collab_application_id",
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
                        name: "applicant_profile_id",
                        type: "uuid",
                        isNullable: false,
                    },
                    {
                        name: "applicant_message",
                        type: "varchar",
                        isNullable: false,
                    },
                    {
                        name: "application_status",
                        type: "varchar",
                        isNullable: false,
                    },
                    {
                        name: "applicant_contact_id",
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
                        columnNames: ["collab_post_id"],
                        referencedTableName: "collab_posts",
                        referencedColumnNames: ["collab_post_id"],
                    },
                    {
                        columnNames: ["applicant_profile_id"],
                        referencedTableName: "user_profiles",
                        referencedColumnNames: ["user_profile_id"],
                    },
                    {
                        columnNames: ["applicant_contact_id"],
                        referencedTableName: "user_profile_contacts",
                        referencedColumnNames: ["user_profile_contact_id"],
                    },
                ],
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("collab_applications");
    }
}