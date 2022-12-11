import {Injectable} from "@nestjs/common";
import {PrismaService} from "../database/prisma.service";
import {Snowflake} from "discord-api-types/globals";
import {CacheType, ChatInputCommandInteraction, ContextMenuCommandInteraction, GuildMember} from "discord.js";
import {User} from "@prisma/client";

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService
  ) {}

  private readonly DB_DISCORD_ROLES = {
    ORGANIZER: 'Организатор',
    PARTICIPANT: 'Участник',
  }

  async getUserByCode(code: number) {
    return await this.prisma.user.findUnique({where: {discordVerificationCode: code}});
  }

  async updateUserDiscordId(id, discordId: Snowflake) {
    await this.prisma.user.update({
      where: {id: id},
      data: {
        discordId: discordId,
      }
    });
  }

  async getGuildMember(interaction: ChatInputCommandInteraction<CacheType> | ContextMenuCommandInteraction<CacheType>) {
    return await interaction.guild.members.fetch(interaction.user.id);
  }

  async updateUserDiscordNickname(guildMember: GuildMember, nickname: string) {
    await guildMember.setNickname(nickname);
  }

  async addMemberRole(guildMember: GuildMember, user: User) {
    const role = guildMember.guild.roles.cache.find(
      role => role.name === this.DB_DISCORD_ROLES[user.role],
    );
    await guildMember.roles.add(role);
  }


  async addTeamRole(guildMember: GuildMember, user: User) {
    if (user.teamId) {
      const team = await this.prisma.team.findUnique({where: {id: user.teamId}});
      const teamRole = guildMember.guild.roles.cache.find(
        role => role.name === `Отбор ${team.name}`,
      );
      await guildMember.roles.add(teamRole);
    }
  }
}
