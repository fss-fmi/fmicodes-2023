import { Injectable, Logger } from '@nestjs/common';
import { PgService } from '../database/pg.service';
import { InjectDiscordClient } from '@discord-nestjs/core';
import { Client, Guild, Role } from 'discord.js';
import { ChannelType } from 'discord-api-types/v10';
import environment from '../environments/environment';
import { PrismaService } from '../database/prisma.service';
import { HandleLogging } from '../logger/logger.handler';

interface Team {
  id: number;
  name: string;
}

@Injectable()
export class TeamService {
  private readonly logger = new Logger(TeamService.name);

  constructor(
    private readonly pg: PgService,
    private readonly prisma: PrismaService,
    @InjectDiscordClient() private readonly client: Client
  ) {
    // Subscribe to database team added event
    pg.client.query('LISTEN team_added');
    pg.client.on('notification', async (msg) => {
      if (msg.channel !== 'team_added') return;

      const team = JSON.parse(msg.payload);
      const guild = this.client.guilds.cache.get(environment().discord.guildId);
      this.logger.log(`Team ${team.name} was added!`);

      // Check if team role and channels already exist
      const role =
        guild.roles.cache.find((role) => role.name === `Отбор ${team.name}`) ??
        (await this.createTeamRole(guild, team));
      this.logger.log(`Team role for ${team.name} was created/found!`);

      const teamCategory = guild.channels.cache.find(
        (channel) => channel.name === `✨ ${team.name} ✨`
      );

      if (!teamCategory) {
        await this.createTeamChannels(guild, team, role);
        this.logger.log(`Team channels for ${team.name} were created!`);
      } else {
        this.logger.log(`Team category for ${team.name} was found!`);
      }
    });
  }

  @HandleLogging()
  async createTeamRole(guild: Guild, team: Team): Promise<Role> {
    // Create team role
    this.logger.log(`Creating role for team ${team.name}...`);
    return await guild.roles.create({
      name: `Отбор ${team.name}`,
      color: '#607D8B',
      reason: 'Team role',
    });
  }

  @HandleLogging()
  async createTeamChannels(guild: Guild, team: Team, role: Role) {
    // Create channel category
    this.logger.log(`Creating category channel for team ${team.name}...`);
    const category = await guild.channels.create({
      name: `✨ ${team.name} ✨`,
      type: ChannelType.GuildCategory,
    });

    // Create team text channel
    this.logger.log(`Creating text channel for team ${team.name}...`);
    const textChannel = await guild.channels.create({
      name: `💬︱отбор-${team.name}`,
      topic: `Канал за комуникация между участниците на отбор ${team.name}`,
      type: ChannelType.GuildText,
      parent: category.id,
    });

    // Create team mentor questions channel
    const technologies = await this.prisma.technology.findMany({
      select: { name: true },
      take: 20,
    });

    this.logger.log(
      `Creating mentor questions channel for team ${team.name}...`
    );
    const questionsChannel = await guild.channels.create({
      name: `❓︱въпроси-към-менторите`,
      topic: `Канал за въпроси на отбор ${team.name} към менторите`,
      // availableTags: technologies.map((t) => ({ name: t.name.slice(0, 19) })),
      type: ChannelType.GuildForum,
      parent: category.id,
    });

    // Create team voice channel
    this.logger.log(`Creating voice channel for team ${team.name}...`);
    const voiceChannel = await guild.channels.create({
      name: `🔊︱отбор-${team.name}`,
      topic: `Канал за гласова комуникация между участниците на отбор ${team.name}`,
      type: ChannelType.GuildVoice,
      parent: category.id,
    });

    // Set channels to be visible only to team members
    this.logger.log(`Setting permissions for team ${team.name}...`);
    const everyone = guild.roles.cache.find(
      (role) => role.name === '@everyone'
    );

    this.logger.log(`Setting @everyone permissions for team ${team.name}...`);
    await category.permissionOverwrites.create(everyone, {
      ViewChannel: false,
    });

    this.logger.log(
      `Setting @${role.name} permissions for team ${team.name}...`
    );
    await category.permissionOverwrites.create(role, {
      ViewChannel: true,
    });

    return { category, textChannel, questionsChannel, voiceChannel };
  }
}
