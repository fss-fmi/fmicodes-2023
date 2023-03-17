import { Injectable } from '@nestjs/common';
import { Schedule } from '@prisma/client';
import { PrismaService } from '../database/prisma.service';
import {
  EmbedBuilder,
  Guild,
  GuildScheduledEventEntityType,
  GuildScheduledEventPrivacyLevel,
} from 'discord.js';
import { HandleLogging } from '../logger/logger.handler';

@Injectable()
export class ScheduleService {
  constructor(private readonly prisma: PrismaService) {}

  @HandleLogging()
  async getSchedule(): Promise<Schedule[]> {
    return this.prisma.schedule.findMany({
      orderBy: { startsAt: 'asc' },
    });
  }

  @HandleLogging()
  getEventEmbed(event: Schedule): EmbedBuilder {
    const fields = [
      {
        name: '🕑 Начало',
        value: event.startsAt.toLocaleString('bg-BG', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
        }),
      },
    ];

    if (event.endsAt) {
      fields.push({
        name: '🕝 Край',
        value: event.endsAt.toLocaleString('bg-BG', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
        }),
      });
    }

    if (event.location) {
      fields.push({
        name: '📍 Място',
        value: event.location,
      });
    }

    const embed = new EmbedBuilder()
      .setTitle(event.title)
      .setDescription(event.description)
      .setFields(fields);

    if (event.image) {
      embed.setImage(event.image);
    }

    return embed;
  }

  @HandleLogging()
  async createEvent(guild: Guild, event: Schedule) {
    await guild.scheduledEvents.create({
      name: event.title,
      description: event.description,
      entityType: GuildScheduledEventEntityType.External,
      privacyLevel: GuildScheduledEventPrivacyLevel.GuildOnly,
      scheduledStartTime: event.startsAt,
      scheduledEndTime: event.endsAt,
      image: event.image,
      entityMetadata: {
        location: event.location,
      },
    });
  }

  @HandleLogging()
  getImage(name: string) {
    return {
      attachment: `https://fmicodes.com/images/schedule/${name}.png`,
      name: `${name}.png`,
    };
  }
}
