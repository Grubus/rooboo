const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'roles',
    description: 'lista roli',

    do: (msg, args, client) => {
        const roles = msg.guild.roles.cache.map(role => {
            if (role.name !== '@everyone')
                return role.name
        });

        const embed = new MessageEmbed()
            .setColor(0xff9700)
            .addField('Role', roles);

        msg.channel.send(embed);
    }
}