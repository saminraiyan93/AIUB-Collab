import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { PostgresDatabaseProviderModule } from "@/providers/database/postgres/provider.module";
import { AppController } from "@/src/app.controller";
import { AppService } from "@/src/app.service";
import global_config from "@/config/global_config";
import { BullModule } from "@nestjs/bull";
import { UserModule } from "./modules/user/user.module";
import { ComplaintReportModule } from "./modules/complaint_report/complaint_report.module";
import { UserProfileModule } from "./modules/user_profile/user_profile.module";
import { DepartmentModule } from "./modules/department/department.module";

@Module({
  imports: [
    PostgresDatabaseProviderModule,

    ConfigModule.forRoot({
      isGlobal: true,
      load: [],
    }),
    BullModule.forRoot({
      url: process.env.REDIS_URL,
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [global_config],
    }),
    UserModule, ComplaintReportModule,
    UserProfileModule,
    DepartmentModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
