import { Injectable, Logger } from '@nestjs/common';
import { PgService } from '../database/pg.service';
import { InjectDiscordClient } from '@discord-nestjs/core';
import { Client, Guild } from 'discord.js';
import environment from '../environments/environment';
import { PrismaService } from '../database/prisma.service';
import { User } from '@prisma/client';
import { HandleLogging } from '../logger/logger.handler';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(
    private readonly pg: PgService,
    private readonly prisma: PrismaService,
    @InjectDiscordClient() private readonly client: Client
  ) {
    // Subscribe to database user updated event
    pg.client.query('LISTEN user_updated');
    pg.client.on('notification', async (msg) => {
      if (msg.channel !== 'user_updated') return;

      this.logger.log(`Starting user update...`);
      const userDto = JSON.parse(msg.payload);
      const user = await this.prisma.user.findUnique({
        where: { id: userDto.id },
      });
      const guild = this.client.guilds.cache.get(environment().discord.guildId);
      await this.updateUserTeamRole(guild, user);
    });
  }

  @HandleLogging()
  private async updateUserTeamRole(guild: Guild, user: User) {
    // Check if user has connected a discord account
    if (!user.discordId) return;

    // Remove all team roles from user
    const member = await guild.members.fetch(user.discordId);
    const roles = await guild.roles.guild.roles.fetch();
    await member.roles.remove(
      roles.filter((role) => role.name.startsWith('Отбор'))
    );
    this.logger.log(`Removed all team roles from user ${member.user.username}`);

    // Add team role to the user if they have a team
    if (user.teamId) {
      const team = await this.prisma.team.findUnique({
        where: { id: user.teamId },
      });
      const teamRole = guild.roles.cache.find(
        (role) => role.name === `Отбор ${team.name}`
      );
      await member.roles.add(teamRole);
      this.logger.log(
        `Added team role ${teamRole.name} to user ${member.user.username}`
      );
    }
  }
}
