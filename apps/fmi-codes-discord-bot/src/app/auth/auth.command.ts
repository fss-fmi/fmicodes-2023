import { Injectable } from '@nestjs/common';
import { AuthDto } from './auth.dto';
import { TransformPipe } from '@discord-nestjs/common';
import {
  Command,
  DiscordTransformedCommand,
  Payload,
  TransformedCommandExecutionContext,
  UsePipes,
} from '@discord-nestjs/core';
import { AuthService } from './auth.service';

@Injectable()
@Command({
  name: 'auth',
  description: 'Потвърждавне самоличността',
})
@UsePipes(TransformPipe)
export class AuthCommand implements DiscordTransformedCommand<AuthDto> {
  constructor(private authService: AuthService) {}

  async handler(
    @Payload() dto: AuthDto,
    { interaction }: TransformedCommandExecutionContext
  ): Promise<string> {
    // Get user by code
    const user = await this.authService.getUserByCode(dto.code);

    // Error handling
    if (!user) {
      return 'Невалиден код';
    }

    if (user.discordId && user.discordId !== interaction.user.id) {
      return 'Вече сте свързали друг Discord акаунт с вашия профил.';
    }

    // Update user in the database with their Discord ID
    await this.authService.updateUserDiscordId(user.id, interaction.user.id);

    // Get the guild member
    const guildMember = await this.authService.getGuildMember(interaction);

    // Set discord username
    await this.authService.updateUserDiscordNickname(guildMember, user.name);

    // Add membership role to user
    await this.authService.addMemberRole(guildMember, user);

    // Add team role to user
    await this.authService.addTeamRole(guildMember, user);

    return 'Успешно потвърдихте самоличността си';
  }
}
