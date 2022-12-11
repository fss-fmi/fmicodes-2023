import {Injectable} from '@nestjs/common';
import {Schedule} from '@prisma/client';
import {PrismaService} from "../database/prisma.service";
import {EmbedBuilder, Guild, GuildScheduledEventEntityType, GuildScheduledEventPrivacyLevel} from "discord.js";

@Injectable()
export class ScheduleService {
  constructor(
    private readonly prisma: PrismaService
  ) {
  }

  async getSchedule(): Promise<Schedule[]> {
    return this.prisma.schedule.findMany();
  }

  getEventEmbed(event: Schedule): EmbedBuilder {
    const embed = new EmbedBuilder()
      .setTitle(event.title)
      .setDescription(event.description)
      .setFields([
        {
          name: '🕑 Начало',
          value: event.startsAt.toLocaleString(
            'bg-BG',
            {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
              hour: '2-digit',
              minute: '2-digit',
            }
          )
        },
        {
          name: '🕝 Край',
          value: event.endsAt.toLocaleString(
            'bg-BG',
            {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
              hour: '2-digit',
              minute: '2-digit',
            }
          )
        },
        {
          name: '📍 Място',
          value: event.location,
        }
      ])

    if (event.image) {
      embed.setImage(event.image);
    }

    return embed;
  }

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
      }
    })
  }
}
