const { BOT_MASTER } = require(`${__dirname}/../../config`);

module.exports = {
    name: 'remove-old-role',
    description: '<rola> usuwa rolę z serwera',

    do: (msg, args, client) => {

        if (!msg.member.roles.cache.some(role => role.name === BOT_MASTER)) {
            msg.channel.send('Nie posiadasz uprawnień do usunięcia roli :(');
            return;
        }

        if (!args[0]) return msg.channel.send('Podaj argumenty :)');

        const roleId = msg.guild.roles.cache.find(role => role.name === args[0]).id;
        if (!roleId) return msg.channel.send('Podaj argumenty :)');

        const role = msg.guild.roles.cache.get(roleId);
        role.delete('unlucky');
        msg.channel.send('Udało się usunąć rolę! :)');
    }
}
