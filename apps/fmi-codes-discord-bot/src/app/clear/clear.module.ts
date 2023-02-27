import {Module} from '@nestjs/common';
import {DiscordModule} from "@discord-nestjs/core";

@Module({
  imports: [
    DiscordModule.forFeature()
  ],
  providers: [
  ]
})
export class ClearModule {}
