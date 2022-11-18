import {IntentsBitField} from "discord.js";

const environment = () => ({
  production: false,
  discord: {
    token: process.env.DISCORD_TOKEN,
    discordClientOptions: {
      intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildPresences,
        IntentsBitField.Flags.GuildMessageReactions,
        IntentsBitField.Flags.GuildMessageTyping,
        IntentsBitField.Flags.GuildVoiceStates,
        IntentsBitField.Flags.GuildInvites,
        IntentsBitField.Flags.MessageContent,
        IntentsBitField.Flags.GuildScheduledEvents,
      ]
    },
    registerCommandOptions: [
      {
        forGuild: process.env.GUILD_ID,
        removeCommandsBefore: true
      }
    ],
    guildId: process.env.GUILD_ID,
  }
});

export {environment};
export default environment;
