import { Injectable } from '@nestjs/common';
import {
  Command,
  DiscordTransformedCommand,
  Payload,
  TransformedCommandExecutionContext,
  UsePipes,
} from '@discord-nestjs/core';
import { ChannelType } from 'discord-api-types/v10';
import { ScheduleService } from './schedule.service';
import { ScheduleDto } from './schedule.dto';
import { TransformPipe } from '@discord-nestjs/common';
import { HandleLogging } from '../logger/logger.handler';
import { Schedule } from '@prisma/client';

@Injectable()
@Command({
  name: 'schedule-dump',
  description: 'Изпраща информация за всички събития по време на хакатона',
})
@UsePipes(TransformPipe)
export class ScheduleCommand implements DiscordTransformedCommand<ScheduleDto> {
  constructor(private readonly scheduleService: ScheduleService) {}

  @HandleLogging()
  async handler(
    @Payload() dto: ScheduleDto,
    { interaction }: TransformedCommandExecutionContext
  ): Promise<string> {
    if (interaction.channel.type !== ChannelType.GuildText) {
      return 'Тази команда може да се използва само в текстови канали.';
    }

    const schedule = await this.scheduleService.getSchedule();

    // Send banner image
    await interaction.channel.send({
      files: [this.scheduleService.getImage('schedule')],
    });

    let previousEvent: Schedule | null = null;
    for (const event of schedule) {
      if (
        !previousEvent ||
        previousEvent.startsAt.getDate() != event.startsAt.getDate()
      ) {
        const date = `${event.startsAt.getFullYear()}-0${
          event.startsAt.getMonth() + 1
        }-${event.startsAt.getDate()}`; //TODO: Fix this abomination

        // Send banner image
        await interaction.channel.send({
          files: [this.scheduleService.getImage(date)],
        });
      }
      previousEvent = event;

      const eventEmbed = this.scheduleService.getEventEmbed(event);

      // Send event embed to the current channel
      await interaction.channel.send({
        embeds: [eventEmbed],
      });

      // Create a Discord event if primary flag is set to true
      if (event.isPrimary && dto.shouldCreateDiscordEvents) {
        await this.scheduleService.createEvent(interaction.guild, event);
      }
    }

    return '';
  }
}
