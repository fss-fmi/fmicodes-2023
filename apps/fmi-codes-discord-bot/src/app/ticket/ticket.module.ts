import {Module} from '@nestjs/common';
import {TicketGateway} from "./ticket.gateway";
import {DiscordModule} from "@discord-nestjs/core";

@Module({
  imports: [
    DiscordModule.forFeature(),
  ],
  providers: [TicketGateway],
})
export class TicketModule {}
