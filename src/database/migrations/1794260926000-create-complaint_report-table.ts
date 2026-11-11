import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateComplaintReportTable1794260926000
    implements MigrationInterface
{
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "complaint_reports",
                columns: [
                    {
                        name: "report_id",
                        type: "uuid",
                        isPrimary: true,
                        generationStrategy: "uuid",
                        default: "uuid_generate_v4()",
                    },
                    {
                        name: "reporter_id",
                        type: "uuid",
                        isNullable: false,
                    },
                    {
                        name: "reported_user_id",
                        type: "uuid",
                        isNullable: true,
                    },
                    {
                        name: "collab_post_id",
                        type: "uuid",
                        isNullable: true,
                    },
                    {
                        name: "reason",
                        type: "varchar",
                        isNullable: false,
                    },
                    {
                        name: "description",
                        type: "varchar",
                        isNullable: true,
                    },
                    {
                        name: "report_status",
                        type: "varchar",
                        isNullable: false,
                    },
                    {
                        name: "reviewed_by_admin_id",
                        type: "uuid",
                        isNullable: true,
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "CURRENT_TIMESTAMP",
                    },
                    {
                        name: "reviewed_at",
                        type: "timestamp",
                        isNullable: true,
                    },
                ],
                foreignKeys: [
                    {
                        columnNames: ["reporter_id"],
                        referencedTableName: "users",
                        referencedColumnNames: ["user_id"],
                    },
                    {
                        columnNames: ["reported_user_id"],
                        referencedTableName: "users",
                        referencedColumnNames: ["user_id"],
                    },
                    {
                        columnNames: ["collab_post_id"],
                        referencedTableName: "collab_posts",
                        referencedColumnNames: ["collab_post_id"],
                    },
                    {
                        columnNames: ["reviewed_by_admin_id"],
                        referencedTableName: "users",
                        referencedColumnNames: ["user_id"],
                    },
                ],
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("complaint_reports");
    }
}