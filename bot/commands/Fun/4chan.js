const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const https = require("https");
const striptags = require("striptags");

module.exports = {
 name: "4chan",
 aliases: [],
 description: "Shows a random image from the selected 4chan board",
 category: "Fun",
 timeout: "1000",
 usage: "4chan <board/boards>",
 run: async (client, message, args) => {
  try {
   if (!message.channel.nsfw) {
    const nsfwembed = new MessageEmbed() // Prettier
     .setColor("RED")
     .setDescription(`${client.bot_emojis.anger} | You can use this command only in an NSFW Channel!`)
     .setFooter({ text: "Requested by " + message.author.username, iconURL: message.author.displayAvatarURL() })
     .setImage("https://media.discordapp.net/attachments/721019707607482409/855827123616481300/nsfw.gif");
    return message.reply({ embeds: [nsfwembed] });
   }
   const chanargs = args.slice(0).join(" ");
   const boards = ["a", "c", "w", "m", "cgl", "cm", "f", "n", "jp", "vt", "v", "vg", "vm", "vmg", "vp", "vr", "vrpg", "vst", "co", "g", "tv", "k", "o", "an", "tg", "sp", "xs", "pw", "sci", "his", "int", "out", "toy", "i", "po", "p", "ck", "ic", "wg", "lit", "mu", "fa", 3, "gd", "diy", "wsg", "qst", "biz", "trv", "fit", "x", "adv", "lgbt", "mlp", "news", "wsr", "vip", "b", "r9k", "pol", "bant", "soc", "s4s", "s", "hc", "hm", "h", "e", "u", "d", "y", "t", "hr", "gif", "aco", "r"];
   const board_error = new MessageEmbed() // Prettier
    .setTitle(`${client.bot_emojis.anger} Please enter a vaild board!\n\n**Usage:** \`${client.prefix} 4chan <board>\``)
    .setColor("RED")
    .setDescription(`All boards (${boards.length}): \`${boards.join("`, `")}\``);
   if (!chanargs) {
    return message.reply({ embeds: [board_error] });
   }
   if (boards.indexOf(chanargs) == -1) {
    return message.reply({ embeds: [board_error] });
   }
   const wait_embed = new MessageEmbed() // Prettier
    .setColor("5865f2")
    .setDescription(`${client.bot_emojis.loading} | I'm downloading random image from \`/${chanargs}/\`. Please wait...`);
   message.reply({ embeds: [wait_embed] }).then((process_message) => {
    var board = chanargs;
    var page = Math.floor(Math.random() * 10 + 1);
    var url = "https://a.4cdn.org/" + board + "/" + page + ".json";
    https.get(url, (res) => {
     res.setEncoding("utf8");
     let body = "";
     res.on("data", (data) => {
      body += data;
     });
     res.on("end", (end) => {
      body = JSON.parse(body);
      var postNr = Math.floor(Math.random() * body.threads.length);
      var imgId = body.threads[postNr].posts[0].tim;
      var imgExt = body.threads[postNr].posts[0].ext;
      var com = body.threads[postNr].posts[0].com;
      var sub = body.threads[postNr].posts[0].sub;
      var replies = body.threads[postNr].posts[0].replies;
      var images = body.threads[postNr].posts[0].images;
      if (!sub) {
       sub = "Random 4chan thread";
      }
      if (com == null) {
       com = "**No description!**";
      } else {
       com = striptags(com);
      }
      var thread = "https://boards.4chan.org/" + board + "/thread/";
      thread += body.threads[postNr].posts[0].no;
      var imgUrl = "https://i.4cdn.org/" + board + "/";
      imgUrl += imgId + "" + imgExt;
      let embed = new MessageEmbed() // Prettier
       .setColor("RANDOM")
       .setTitle(
        `${client.bot_emojis.chan} ` + sub,
        message.guild.iconURL({
         dynamic: true,
         format: "png",
        }),
        thread
       )
       .setDescription(`>>> ${com}`)
       // .addField(`${client.bot_emojis.edit} Thread: `, thread)
       // .addField(`${client.bot_emojis.picture_frame} Image: `, imgUrl)
       .setURL(thread)
       .setTimestamp()
       .setFooter({
        text: `${client.bot_emojis.chat} ${replies} replies | ${client.bot_emojis.picture_frame} ${images} images | Requested by ${message.author.username}`,
        iconURL: message.author.displayAvatarURL({
         dynamic: true,
         format: "png",
         size: 2048,
        }),
       });
      if (embed.description.length >= 2048) {
       embed.description = `${embed.description.substr(0, 2045)}...`;
      }
      const row = new MessageActionRow() // Prettier
       .addComponents(
        new MessageButton() // Prettier
         .setURL(thread)
         .setLabel("Board")
         .setStyle("LINK")
       )
       .addComponents(
        new MessageButton() // Prettier
         .setURL(imgUrl)
         .setLabel("Image")
         .setStyle("LINK")
       );
      process_message.edit({ embeds: [embed], files: [imgUrl], components: [row] });
     });
    });
   });
  } catch (err) {
   console.log(err);
   return client.createCommandError(message, err);
  }
 },
};
