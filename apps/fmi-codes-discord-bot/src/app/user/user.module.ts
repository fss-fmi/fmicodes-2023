import { Module } from '@nestjs/common';
import { DiscordModule } from '@discord-nestjs/core';
import { PrismaService } from '../database/prisma.service';
import { UserService } from './user.service';
import { PgService } from '../database/pg.service';

@Module({
  imports: [DiscordModule.forFeature()],
  providers: [UserService, PgService, PrismaService],
})
export class UserModule {}
