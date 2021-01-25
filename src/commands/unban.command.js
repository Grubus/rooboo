const banned = require(`${__dirname}/../banned-users`);
const { BOT_MASTER } = require(`${__dirname}/../../config`);

module.exports = {
    name: 'unban',
    description: '<nazwa> odbanowuje użytkownika',

    do: (msg, args, client) => {

        if (!msg.member.roles.cache.some(role => role.name === BOT_MASTER)) {
            msg.channel.send('Nie posiadasz uprawnień do odbanowania użytkownika :(');
            return;
        }

        const userId = banned.find(user => user.user.username === args[0]).user.id;
        msg.guild.members.unban(userId);

        msg.reply(`Użytkownik ${args[0]} został odbanowany :((`);
    }
}
