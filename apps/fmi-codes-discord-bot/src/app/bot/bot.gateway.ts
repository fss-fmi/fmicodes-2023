import { Injectable, Logger } from '@nestjs/common';
import { InjectDiscordClient, Once } from '@discord-nestjs/core';
import { Client, ColorResolvable } from 'discord.js';
import environment from '../environments/environment';
import { PrismaService } from '../database/prisma.service';
import { HandleLogging } from '../logger/logger.handler';

@Injectable()
export class BotGateway {
  private readonly logger = new Logger(BotGateway.name);

  constructor(
    @InjectDiscordClient()
    private readonly client: Client,
    private readonly prisma: PrismaService
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
  }
}
