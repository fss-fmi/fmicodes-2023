import {DiscordModule} from '@discord-nestjs/core';
import {Module} from '@nestjs/common';
import {BotGateway} from "./bot.gateway";
import {PrismaService} from "../database/prisma.service";

@Module({
  imports: [
    DiscordModule.forFeature(),
  ],
  providers: [
    BotGateway,
    PrismaService
  ]
})
export class BotModule {}
