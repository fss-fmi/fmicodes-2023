import { GatewayIntentBits, Partials } from 'discord.js';

const environment = () => ({
  production: true,
  discord: {
    token: process.env.DISCORD_TOKEN,
    discordClientOptions: {
      intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildPresences,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.GuildMessageTyping,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.GuildInvites,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildScheduledEvents,
      ],
    },
    partials: [
      Partials.Message,
      Partials.Channel,
      Partials.Reaction,
      Partials.User,
      Partials.GuildMember,
    ],
    // registerCommandOptions: [
    //   {
    //     forGuild: process.env.GUILD_ID,
    //     removeCommandsBefore: true
    //   }
    // ],
    guildId: process.env.GUILD_ID,
  },
});

export { environment };
export default environment;
