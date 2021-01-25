const { MessageEmbed } = require('discord.js');
const { BOT_MASTER } = require(`${__dirname}/../../config`);

module.exports = {
    name: 'add-text-channel',
    description: '<name> dodaje kanał tekstowy',

    do: (msg, args, client) => {

        if (!msg.member.roles.cache.some(role => role.name === BOT_MASTER)) {
            msg.channel.send('Nie posiadasz uprawnień do utworzenia kanału :(');
            return;
        }

        if (!args[0]) return msg.channel.send('Podaj argumenty :)');

        msg.guild.channels.create(args[0])
            .then(channel => {
                const category = msg.guild.channels.cache
                    .find(channel => channel.name == 'Kanały tekstowe' && channel.type == 'category');

                if (!category) throw new Error('Nie istnieje taka kategoria kanałów :(');
                channel.setParent(category.id);

            }).catch(console.error);

        msg.channel.send(`Pomyślnie dodano nowy kanał tekstowy ***${args[0]}*** :)`);
    }
}
