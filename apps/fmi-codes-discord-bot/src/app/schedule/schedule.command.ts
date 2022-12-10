import {Injectable} from "@nestjs/common";
import {
  Command,
  DiscordTransformedCommand,
  Payload,
  TransformedCommandExecutionContext,
  UsePipes
} from "@discord-nestjs/core";
import {ScheduleService} from "./schedule.service";
import {ScheduleDto} from "./schedule.dto";
import {TransformPipe} from "@discord-nestjs/common";

@Injectable()
@Command({
  name: 'schedule-dump',
  description: 'Изпраща информация за всички събития по време на хакатона',
})
@UsePipes(TransformPipe)
export class ScheduleCommand implements DiscordTransformedCommand<ScheduleDto> {
  constructor(
    private readonly scheduleService: ScheduleService
  ) {}

  async handler(
    @Payload() dto: ScheduleDto,
    {interaction}: TransformedCommandExecutionContext,
  ): Promise<string> {
    const schedule = await this.scheduleService.getSchedule();
    for (const event of schedule) {
      const eventEmbed = this.scheduleService.getEventEmbed(event);

      // Send event embed to the current channel
      await interaction.channel.send({
        embeds: [eventEmbed]
      });

      // Create a Discord event if primary flag is set to true
      if (event.isPrimary && dto.shouldCreateDiscordEvents) {
        await this.scheduleService.createEvent(interaction.guild, event);
      }
    }

    return '';
  }
}
