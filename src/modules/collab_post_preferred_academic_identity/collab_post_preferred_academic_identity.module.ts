import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CollabPostPreferredAcademicIdentityController } from "./collab_post_preferred_academic_identity.controller";
import { CollabPostPreferredAcademicIdentityService } from "./collab_post_preferred_academic_identity.service";
import { CollabPostPreferredAcademicIdentity } from "./entities/collab_post_preferred_academic_identity.entity";

@Module({
  imports: [TypeOrmModule.forFeature([CollabPostPreferredAcademicIdentity])],
  controllers: [CollabPostPreferredAcademicIdentityController],
  providers: [CollabPostPreferredAcademicIdentityService],
  exports: [CollabPostPreferredAcademicIdentityService],
})
export class CollabPostPreferredAcademicIdentityModule {}