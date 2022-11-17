import {ConfigModule, ConfigService} from "@nestjs/config";

import {BotModule} from "./bot/bot.module";
import {DiscordModule} from "@discord-nestjs/core";
import {Module} from "@nestjs/common";
import {environment} from "../environments/environment";
import {TeamModule} from "./team/team.module";

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
    BotModule,
    TeamModule
  ]
})
export class AppModule {
}
