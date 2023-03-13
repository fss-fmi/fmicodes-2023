import { Module } from '@nestjs/common';
import { AuthCommand } from './auth.command';
import { DiscordModule } from '@discord-nestjs/core';
import { PrismaService } from '../database/prisma.service';
import { AuthService } from './auth.service';

@Module({
  imports: [DiscordModule.forFeature()],
  providers: [AuthCommand, AuthService, PrismaService],
})
export class AuthModule {}
