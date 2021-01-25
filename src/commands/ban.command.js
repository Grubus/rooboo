const banned = require(`${__dirname}/../banned-users`);
const fs = require('fs');
const { BOT_MASTER } = require(`${__dirname}/../../config`);

module.exports = {
    name: 'ban',
    description: '<wzmianka> banuje użytkownika',

    do: (msg, args, client) => {

        if (!msg.member.roles.cache.some(role => role.name === BOT_MASTER)) {
            msg.channel.send('Nie posiadasz uprawnień do banowania użytkownika :(');
            return;
        }

        const user = msg.guild.member(msg.mentions.users.first());

        banned.push(user);

        user.ban({ reason: 'ok' });
        msg.reply(`Użytkownik **${user.user.username}** został zbanowany :))) Hura!`);
    }
}
