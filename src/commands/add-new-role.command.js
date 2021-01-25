const { BOT_MASTER } = require(`${__dirname}/../../config`);

module.exports = {
    name: 'add-new-role',
    description: '<rola> <color> dodaje nową rolę do serwera',

    do: (msg, args, client) => {

        if (!msg.member.roles.cache.some(role => role.name === BOT_MASTER)) {
            msg.channel.send('Nie posiadasz uprawnień do dodania roli :(');
            return;
        }

        const name = args[0];
        const color = args[1];
        if (!name || !color) return msg.channel.send('Podaj argumenty :)');


        msg.guild.roles.create({
            data: {
                name,
                color: color.toUpperCase()
            },
            reason: 'nowa grupka testowa',
        });

        msg.channel.send(`Super! Udało się stworzyć nową rolę: ***${name}***`);

    }
}