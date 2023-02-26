import { ConfigModule, ConfigService } from '@nestjs/config';

import { BotModule } from './bot/bot.module';
import { DiscordModule } from '@discord-nestjs/core';
import { Module } from '@nestjs/common';
import { environment } from '../environments/environment';
import { AuthModule } from './auth/auth.module';
import { TeamModule } from './team/team.module';
import { TicketModule } from './ticket/ticket.module';
import { ScheduleModule } from './schedule/schedule.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [environment],
    }),
    DiscordModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) =>
        configService.get('discord'),
      inject: [ConfigService],
    }),
    BotModule,
    AuthModule,
    TeamModule,
    TicketModule,
    ScheduleModule,
    UserModule,
  ],
})
export class AppModule {}
