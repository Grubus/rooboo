const { MessageEmbed } = require('discord.js');
const { PREFIX } = require(`${__dirname}/../../config`);

module.exports = {
    name: 'help',
    description: 'info o komendach',

    do: (msg, args, client) => {

        const commands = [];

        client.commands.forEach(command => {
            if (command.name !== 'help')
                commands.push({
                    name: command.name,
                    desc: command.description
                });
        });

        const embed = new MessageEmbed()
            .setTitle('R O O B O O')
            .setColor(0xff9700)
            .setThumbnail(client.user.displayAvatarURL({ format: 'png' }))
            .setDescription(
                `najsłodsze bobo na tym serwerze ^.^\n*( użyj **${PREFIX}** bezpośrednio przed komendą )*`
            )
            .addField('Komenda', commands.map(cmd => cmd.name), true)
            .addField(`Opis${'\u3000'.repeat(15)}\u2063`, commands.map(cmd => cmd.desc), true);

        msg.channel.send(embed);
    }
}
