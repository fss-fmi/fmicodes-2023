import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { Snowflake } from 'discord-api-types/globals';
import {
  CacheType,
  ChatInputCommandInteraction,
  ContextMenuCommandInteraction,
  GuildMember,
} from 'discord.js';
import { User } from '@prisma/client';
import { HandleLogging } from '../logger/logger.handler';

@Injectable()
export class AuthService {
  private readonly logger: Logger = new Logger(AuthService.name);
  constructor(private readonly prisma: PrismaService) {}

  private readonly DB_DISCORD_ROLES = {
    ORGANIZER: 'Организатор',
    PARTICIPANT: 'Участник',
  };

  @HandleLogging()
  async getUserByCode(code: number) {
    const user = await this.prisma.user.findUnique({
      where: { discordVerificationCode: code },
    });
    this.logger.log(`User with code ${code} is ${user.name}`);
    return user;
  }

  @HandleLogging()
  async updateUserDiscordId(id, discordId: Snowflake) {
    this.logger.log(`Updating user ${id} with discordId ${discordId}`);
    await this.prisma.user.update({
      where: { id: id },
      data: {
        discordId: discordId,
      },
    });
  }

  @HandleLogging()
  async getGuildMember(
    interaction:
      | ChatInputCommandInteraction<CacheType>
      | ContextMenuCommandInteraction<CacheType>
  ) {
    this.logger.log(`Getting guild member for ${interaction.user.id}`);
    return await interaction.guild.members.fetch(interaction.user.id);
  }

  @HandleLogging()
  async updateUserDiscordNickname(guildMember: GuildMember, nickname: string) {
    this.logger.log(`Updating nickname for ${guildMember.id} to ${nickname}`);
    await guildMember.setNickname(nickname);
  }

  @HandleLogging()
  async addMemberRole(guildMember: GuildMember, user: User) {
    this.logger.log(`Adding member role for ${guildMember.id}`);
    const role = guildMember.guild.roles.cache.find(
      (role) => role.name === this.DB_DISCORD_ROLES[user.role]
    );

    if (!role) {
      this.logger.log(`Member role not found`);
      return;
    }

    this.logger.error(`Membership role id is ${role.id}`);
    await guildMember.roles.add(role);
  }

  @HandleLogging()
  async addTeamRole(guildMember: GuildMember, user: User) {
    if (user.teamId) {
      this.logger.log('Finding user team from database');
      const team = await this.prisma.team.findUnique({
        where: { id: user.teamId },
      });

      this.logger.log(`Team name is ${team.name}`);
      this.logger.log(`Finding team role in guild`);
      const teamRole = guildMember.guild.roles.cache.find(
        (role) => role.name === `Отбор ${team.name}`
      );

      if (!teamRole) {
        this.logger.error(`Team role not found`);
        return;
      }

      this.logger.log(
        `Adding team role with id ${teamRole.id} for ${guildMember.id}`
      );
      await guildMember.roles.add(teamRole);
    }
  }
}
