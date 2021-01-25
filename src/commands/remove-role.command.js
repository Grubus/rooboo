const { BOT_MASTER } = require(`${__dirname}/../../config`);

module.exports = {
    name: 'remove-role',
    description: '<wzmianka> <rola> usuwa rolę użytkownikowi',

    do: async (msg, args, client) => {

        if (!msg.member.roles.cache.some(role => role.name === BOT_MASTER)) {
            msg.channel.send('Nie posiadasz uprawnień do odbierania roli :(');
            return;
        }

        if (!args[0] || !args[1]) return msg.channel.send('Podaj argumenty :)');

        const role = msg.guild.roles.cache.find(role => role.name === args[1]);
        const user = msg.guild.member(msg.mentions.users.first());

        if (!user) return msg.channel.send('Podaj nazwę użytkownika :)');

        await user.roles.remove(role);
        msg.channel.send(`${user.user.username} stracił rolę ***${role.name}*** :(`);

    }
}