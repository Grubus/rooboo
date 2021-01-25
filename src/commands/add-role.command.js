module.exports = {
    name: 'add-role',
    description: '<wzmianka> <rola> dodaje rolę użytkownikowi',

    do: async (msg, args, client) => {

        if (!msg.member.roles.cache.some(role => role.name === BOT_MASTER)) {
            msg.channel.send('Nie posiadasz uprawnień do ustawienia roli :(');
            return;
        }

        if (!args[0] || !args[1]) return msg.channel.send('Podaj argumenty :)');

        const role = msg.guild.roles.cache.find(role => role.name === args[1]);
        if (!role) return msg.channel.send('Niepoprawna rola :(');

        const user = msg.guild.member(msg.mentions.users.first());
        if (!user) return msg.channel.send('Niepoprawna nazwa użytkownika :(');

        await user.roles.add(role);
        msg.channel.send(`${user.user.username} w końcu dostał swoją wymarzoną rolę ***${role.name}*** <3 !!!`);

    }
}