import {Injectable, Logger} from '@nestjs/common';
import {InjectDiscordClient, On} from '@discord-nestjs/core';
import {Client, EmbedBuilder, ForumChannel, Message, TextChannel, ThreadChannel} from 'discord.js';
import {ChannelType} from "discord-api-types/v10";

@Injectable()
export class TicketGateway {
  private readonly logger = new Logger(TicketGateway.name);

  constructor(
    @InjectDiscordClient() private readonly client: Client,
  ) {
  }

  @On('threadCreate')
  async onMentorForumPost(thread: ThreadChannel) {
    // Get mentor channel from guild
    const mentorChannel = thread.guild.channels.cache.find(
      mentorChannel => mentorChannel.name === '❓︱въпроси' && mentorChannel.parent.name === '💡 Ментори 💡'
    ) as TextChannel

    if (thread.type == ChannelType.PublicThread && thread.parent.name === '❓︱въпроси-към-менторите') {
      let threadMessage: Message;

      // For large file uploads, starter message might take a few seconds to send
      // This loop ensures the message is processed whenever it is received
      // TODO: This is a dumb hack, somebody needs to fix this!
      while (!threadMessage) {
        try {
          threadMessage = await thread.fetchStarterMessage();
        } catch (DiscordAPIError) {
          await new Promise(r => setTimeout(r, 1000));
        }
      }

      // Get author and team discord objects
      const threadAuthor = await thread.guild.members.fetch(threadMessage.author);
      const threadTeamRole = threadAuthor.roles.cache.find((role) => role.name.includes("Отбор"));

      // Build an embed with the question information from the forum post
      const mentorMessageEmbed = new EmbedBuilder()
        .setTitle(thread.name)
        .setDescription(threadMessage.content)
        .setAuthor({
          name: threadAuthor.displayName,
          iconURL: threadMessage.author.avatarURL(),
        })

      // If there are image attachments, set the image to the
      const imageAttachments = threadMessage.attachments.filter(attachment => attachment.contentType.includes('image/'));
      if (imageAttachments.size !== 0) {
        mentorMessageEmbed.setImage(imageAttachments.at(0).url)
      }

      // Get names of all tags applied to the forum post
      const appliedTagNames = thread.appliedTags.map(
        (appliedTag) => (thread.parent as ForumChannel).availableTags.find(
          (availableTag) => availableTag.id === appliedTag
        ).name
      );

      // Create a list of technology roles from the applied tags
      const technologyRoles = appliedTagNames.map(
        (appliedTagName) => thread.guild.roles.cache.find(
          (role) => role.name === appliedTagName
        )
      );

      // Send question to mentor channel
      const mentorMessage = await mentorChannel.send({
        content: (
          threadTeamRole
            ? ` ❓️ Въпрос от <@&${threadTeamRole.id}>\n`
            : ` ❓️ Въпрос от <@${threadAuthor.id}\n>`
        ).concat(...technologyRoles.map(technologyRole => ` <@&${technologyRole.id}>`)),
        embeds: [mentorMessageEmbed],
      })

      // Add ticket reaction to the message
      await mentorMessage.react("🎟️")
    }
  }
}
