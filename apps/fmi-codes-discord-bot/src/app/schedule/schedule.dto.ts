import {Param, ParamType} from "@discord-nestjs/core";

export class ScheduleDto {
  @Param({
    name: 'create-discord-events',
    description: 'Да се създадат ли нови събития в календара на сървъра?',
    required: false,
    type: ParamType.BOOLEAN,
  })
  shouldCreateDiscordEvents: number;
}
