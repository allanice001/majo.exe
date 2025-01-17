const { MessageEmbed } = require("discord.js");

module.exports = {
 name: "pp",
 aliases: [],
 description: "Show user PP size",
 category: "Fun",
 usage: "pp <user>",
 run: async (client, message, args) => {
  try {
   const user = (await message.mentions.members.first()) || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find((r) => r.user.username.toLowerCase().includes() === args.join(" ").toLocaleLowerCase()) || message.guild.members.cache.find((r) => r.displayName.toLowerCase().includes() === args.join(" ").toLocaleLowerCase()) || message.author;
   const pepe = "8" + "=".repeat(Math.floor(Math.random() * 15)) + "D";
   const embed = new MessageEmbed() // Prettier
    .setTitle(
     `Pe-pe :smirk:`,
     user.displayAvatarURL({
      dynamic: true,
     })
    )
    .setDescription(`${client.bot_emojis.flushed} | ${user}, you're pepe is **${pepe}** long!`)
    .setTimestamp()
    .setColor("RANDOM")
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
