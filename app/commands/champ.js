const { MessageAttachment, MessageEmbed } = require('discord.js');
const fetchMobaFireAPI = require('../scripts/fetchMobaFireAPI');
const { url } = require('../config.json');

module.exports = async (client, msg) => {
  const args = msg.content.split(' ');
  let champs = [];
  const pickRateArr = [];
  const winRateArr = [];
  if (args.length >= 2) {
    console.log(`O argumento é:${args[1]}`);
    const championFilter = await fetchMobaFireAPI(
      url.championsFilter + args[1]
    );
    const championObject = JSON.parse(championFilter.data);
    let winRate = championObject.roleWinRate;
    let pickRate = championObject.rolePickRate;
    if (
      championObject.rolePickRate.length > 3 &&
      championObject.roleWinRate.length > 3
    ) {
      pickRateArr.push(championObject.rolePickRate.slice(0, 3));
      pickRateArr.push(championObject.rolePickRate.slice(3, 6));
      winRateArr.push(championObject.roleWinRate.slice(0, 3));
      winRateArr.push(championObject.roleWinRate.slice(3, 6));
      winRate = winRateArr.join(' - ');
      pickRate = pickRateArr.join(' - ');
    }

    console.log(championObject);
    const attachment = new MessageAttachment(championObject.avatar);
    const embed = new MessageEmbed()
      .setColor('#ff6200')
      .setThumbnail(championObject.avatar)
      .setTitle(`${championObject.name} - ${championObject.nameTitle}`)
      .setDescription(`Builds:\n${championObject.linkBuild}`)
      .addFields(
        {
          name: 'Role',
          value: `${championObject.role}`,
          inline: true,
        },
        { name: 'Win Rate', value: winRate, inline: true },
        { name: 'Pick Rate', value: pickRate, inline: true }
      )
      .setFooter('Created by matheusprogbr');

    return msg.channel.send(msg.author, embed, attachment);
  }

  try {
    champs = await fetchMobaFireAPI(url.champions);
  } catch (err) {
    console.log(`Deu ERRO:${err}`);
  }

  console.log(champs.data);

  msg.reply(
    `Lista de campeões:\n${champs.data}\nNumero Total: ${champs.data.length}`
  );
};
