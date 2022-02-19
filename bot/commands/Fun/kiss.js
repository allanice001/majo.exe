const { MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
 name: "kiss",
 aliases: [],
 description: "Kiss Kiss Kiss <3 | Cari... I love you, after all this time. I still love you. Come back to me.. Please",
 category: "Fun",
 usage: "kiss <user>",
 run: async (client, message, args) => {
  const user = (await message.mentions.members.first()) || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find((r) => r.user.username.toLowerCase().includes() === args.join(" ").toLocaleLowerCase()) || message.guild.members.cache.find((r) => r.displayName.toLowerCase().includes() === args.join(" ").toLocaleLowerCase());
  if (!user) {
   return client.createError(message, `${client.bot_emojis.broken_heart} | You must mention user to kiss ;-;\n\n**Usage:** \`${client.prefix} kiss <user>\``);
  }
  if (message.author === user || message.member == user) {
   return client.createError(message, `${client.bot_emojis.broken_heart} | You cant kiss yourself ;-; (Try kissing someone else, your love. Maybe you need some help?)`);
  }
  (async () => {
   try {
    const response = await fetch("https://nekos.life/api/v2/img/kiss");
    const body = await response.json();
    const embed = new MessageEmbed() // Prettier
     .setAuthor({
      name: `${user.displayName} just got a kiss from ${message.author.username}`,
      iconURL: message.author.displayAvatarURL({
       dynamic: true,
       format: "png",
       size: 2048,
      }),
     })
     .setDescription(`>>> So sweeet :3${Math.floor(Math.random() * 100 + 1) == 1 ? "\n||I want someone I can kiss...||" : ""}`)
     .setImage(body.url)
     .setColor("RANDOM")
     .setFooter({
      text: `Requested by ${message.author.username}`,
      iconURL: message.author.displayAvatarURL({
       dynamic: true,
       format: "png",
       size: 2048,
      }),
     })
     .setTimestamp()
     .setURL(body.url);
    message.reply({ embeds: [embed] });
   } catch (err) {
    console.log(err);
    return client.createCommandError(message, err);
   }
  })();
 },
};
