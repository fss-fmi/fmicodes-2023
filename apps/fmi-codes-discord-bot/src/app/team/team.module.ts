import {Module} from '@nestjs/common';
import {TeamService} from "./team.service";
import {PgService} from "../database/pg.service";
import {DiscordModule} from "@discord-nestjs/core";
import {PrismaService} from "../database/prisma.service";

@Module({
  imports: [
    DiscordModule.forFeature()
  ],
  providers: [
    TeamService,
    PgService,
    PrismaService
  ],
})
export class TeamModule {}
