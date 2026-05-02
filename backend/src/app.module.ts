import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { RequestModule } from './request/request.module';
import { AssetModule } from './asset/asset.module';
import { AccountModule } from './account/account.module';
import { AssignmentModule } from './assignment/assignment.module';

@Module({
  imports: [
    PrismaModule,
    RequestModule,
    AssetModule,
    AccountModule,
    AssignmentModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
