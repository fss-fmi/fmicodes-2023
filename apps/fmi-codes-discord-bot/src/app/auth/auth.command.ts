import { Injectable, Logger } from '@nestjs/common';
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
import { HandleLogging } from '../logger/logger.handler';

@Injectable()
@Command({
  name: 'auth',
  description: 'Потвърждавне самоличността',
})
@UsePipes(TransformPipe)
export class AuthCommand implements DiscordTransformedCommand<AuthDto> {
  private readonly logger: Logger = new Logger(AuthCommand.name);

  constructor(private authService: AuthService) {}

  @HandleLogging()
  async handler(
    @Payload() dto: AuthDto,
    { interaction }: TransformedCommandExecutionContext
  ): Promise<string> {
    this.logger.log(`Auth command called with code ${dto.code}.`);
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

    // Add team role to user
    await this.authService.addTeamRole(guildMember, user);

    // Add membership role to user
    setTimeout(async () => {
      await this.authService.addMemberRole(guildMember, user);
    }, 3000);

    return 'Успешно потвърдихте самоличността си';
  }
}
