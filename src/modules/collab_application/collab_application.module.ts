import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CollabApplicationController } from "./collab_application.controller";
import { CollabApplicationService } from "./collab_application.service";
import { CollabApplication } from "./entities/collab_application.entity";

@Module({
  imports: [TypeOrmModule.forFeature([CollabApplication])],
  controllers: [CollabApplicationController],
  providers: [CollabApplicationService],
  exports: [CollabApplicationService],
})
export class CollabApplicationModule {}