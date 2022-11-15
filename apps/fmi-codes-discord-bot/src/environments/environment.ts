import {IntentsBitField} from "discord.js";

const environment = () => ({
  production: false,
  discord: {
    token: process.env.DISCORD_TOKEN,
    discordClientOptions: {
      intents: [IntentsBitField.Flags.Guilds, IntentsBitField.Flags.GuildMessages]
    },
  }
});

export {environment};
export default environment;
