import { DiscordModule } from '@discord-nestjs/core';
import { Module } from '@nestjs/common';
import { BotGateway } from './bot.gateway';
import { PrismaService } from '../database/prisma.service';
import { TeamService } from '../team/team.service';
import { PgService } from '../database/pg.service';

@Module({
  imports: [DiscordModule.forFeature()],
  providers: [BotGateway, TeamService, PgService, PrismaService],
})
export class BotModule {}
