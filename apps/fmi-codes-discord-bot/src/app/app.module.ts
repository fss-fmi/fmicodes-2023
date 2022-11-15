import {ConfigModule, ConfigService} from "@nestjs/config";

import {BotModule} from "./bot/bot.module";
import {DiscordModule} from "@discord-nestjs/core";
import {Module} from "@nestjs/common";
import {environment} from "../environments/environment";

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [environment]
    }),
    DiscordModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => (configService.get('discord')),
      inject: [ConfigService],
    }),
    BotModule
  ]
})
export class AppModule {
}
