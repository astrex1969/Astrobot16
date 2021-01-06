const { version } = require("discord.js");
const moment = require("moment");
const BaseEmbed = require("../../modules/BaseEmbed");
const {
  dashboard: { dashboardUrl },
} = require("../../../config.json");
const BotModel = require("../../models/Bot.model");

module.exports = {
  name: "botinfo",
  description: "Shows info about the bot",
  category: "util",
  aliases: ["bot", "ping"],
  async execute(bot, message) {
    const lang = await bot.getGuildLang(message.guild.id);
    const uptime = moment.duration(bot.uptime).format(" D [days], H [hrs], m [mins], s [secs]");
    const nodev = process.version;
    const { total_used_cmds, used_since_up } = await BotModel.findOne({ bot_id: bot.user.id });

    const embed = BaseEmbed(message)
      .setTitle(`${lang.BOT.INFO_2}`)
      .addField(`${lang.MEMBER.USERNAME}:`, bot.user.username)
      .addField(`${lang.BOT.LATENCY}:`, Math.round(bot.ws.ping), true)
      .addField(
        `${lang.HELP.COMMANDS}:`,
        `
**${lang.BOT.USED_SINCE_UP}:** ${used_since_up}
**${lang.BOT.TOTAL_USED_CMDS}:** ${total_used_cmds}`
      )
      .addField(
        `__**${lang.BOT.INFO}:**__`,
        `
**${lang.BOT.USERS}:** ${bot.formatNumber(80000)}
**${lang.BOT.GUILDS}:** ${bot.formatNumber(bot.guilds.cache.size)}
**${lang.BOT.CHANNELS}:** ${bot.formatNumber(bot.channels.cache.size)}
**${lang.BOT.COMMAND_COUNT}:** ${bot.commands.size}
**${lang.BOT.VC_CONNS}:** ${bot.voice.connections.size}
            `,
        true
      )
      .addField(
        `__**${lang.BOT.SYSTEM_INFO}**__`,
        `**${lang.BOT.RAM_USAGE}:**  ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB
**${lang.BOT.UPTIME}:** ${uptime}
**${lang.BOT.NODE_V}:** ${nodev}
**${lang.BOT.DJS_V}:** ${version}`,
        true
      )
      
      .addField(`${lang.UTIL.SUPPORT_SERVER}`, "[Click Here](https://discord.gg/XxHrtkA)", true)
      .addField(`${lang.BOT.DASHBOARD}`, `[Click Here](${dashboardUrl})`, true)
      .setImage(
        "https://raw.githubusercontent.com/Dev-CasperTheGhost/ghostybot/main/.github/Ghostybot-banner.png"
      );

    message.channel.send(embed);
  },
};
