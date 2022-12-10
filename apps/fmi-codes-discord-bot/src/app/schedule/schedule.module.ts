import {Module} from '@nestjs/common';
import {ScheduleService} from "./schedule.service";
import {ScheduleCommand} from "./schedule.command";
import {DiscordModule} from "@discord-nestjs/core";
import {PrismaService} from "../database/prisma.service";

@Module({
  imports: [
    DiscordModule.forFeature()
  ],
  providers: [
    ScheduleService,
    ScheduleCommand,
    PrismaService,
  ]
})
export class ScheduleModule {
}
