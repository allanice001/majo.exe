const { MessageEmbed } = require("discord.js");

module.exports = {
 name: "beep",
 aliases: [],
 description: "Beep-Boop!",
 category: "Fun",
 usage: "beep",
 run: async (client, message, args) => {
  try {
   const embed = new MessageEmbed() // Prettier
    .setColor("RANDOM")
    .setTitle(`${client.bot_emojis.clock} Boop!`)
    .setImage(`https://c.tenor.com/xEv4LjI27pkAAAAC/time-clock.gif`)
    .setFooter({
     text: `Requested by ${message.author.username}`,
     iconURL: message.author.displayAvatarURL({
      dynamic: true,
      format: "png",
      size: 2048,
     }),
    });
   message.reply({ embeds: [embed] });
  } catch (err) {
   console.log(err);
   return client.createCommandError(message, err);
  }
 },
};
