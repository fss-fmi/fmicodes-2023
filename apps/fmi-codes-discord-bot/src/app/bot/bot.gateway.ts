import { Injectable, Logger } from '@nestjs/common';
import { InjectDiscordClient, Once } from '@discord-nestjs/core';
import { Client, ColorResolvable } from 'discord.js';
import environment from '../environments/environment';
import { PrismaService } from '../database/prisma.service';
import { HandleLogging } from '../logger/logger.handler';
import { TeamService } from '../team/team.service';

@Injectable()
export class BotGateway {
  private readonly logger = new Logger(BotGateway.name);

  constructor(
    @InjectDiscordClient()
    private readonly client: Client,
    private readonly prisma: PrismaService,
    private readonly teamService: TeamService
  ) {}

  @Once('ready')
  @HandleLogging()
  async onReady() {
    // Log the bot is ready
    this.logger.log(`Bot ${this.client.user.tag} was started!`);

    // Create technology roles if they don't exist
    this.logger.log('Creating technology roles...');
    const guild = this.client.guilds.cache.get(environment().discord.guildId);
    const technologies = await this.prisma.technology.findMany();
    for (const technology of technologies) {
      const role = guild.roles.cache.find(
        (role) => role.name === technology.name
      );
      if (!role) {
        this.logger.log(`Creating role ${technology.name}`);

        await guild.roles.create({
          name: technology.name,
          color: technology.color as ColorResolvable,
        });
      }
    }

    // Create team roles if they don't exist
    this.logger.log('Creating team roles and channels...');
    const teams = await this.prisma.team.findMany();

    const roles = await guild.roles.fetch();
    const channels = await guild.channels.fetch();
    for (const team of teams) {
      let role = roles.find((role) => role.name.includes(team.name));
      if (!role) {
        this.logger.log(`Creating role ${team.name}`);
        role = await this.teamService.createTeamRole(guild, team);
      }

      const channel = channels.find(
        (channel) => channel.name === `✨ ${team.name} ✨`
      );

      if (!channel) {
        this.logger.log(`Creating channel ${team.name}`);
        await this.teamService.createTeamChannels(guild, team, role);
      }
    }
  }
}
