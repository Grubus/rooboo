const { BOT_AUTHOR } = require(`${__dirname}/../../config`);
const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'author',
    description: 'Info o autorze',

    do: (msg, args) => {
        // msg.channel.send(`Moim tatom jest ***${BOT_AUTHOR}*** :orange_heart: :sunglasses:`);
        const embed = new MessageEmbed()
            .setTitle(`Moim tatom jest ***${BOT_AUTHOR}*** :orange_heart: :sunglasses:`)
            .setColor(0xff9700);

        msg.channel.send(embed);
    }
}
