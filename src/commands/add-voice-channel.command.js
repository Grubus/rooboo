const { BOT_MASTER } = require(`${__dirname}/../../config`);

module.exports = {
    // name: 'add-voice-channel',
    name: 'ok',
    description: '<name> dodaje kanał głosowy',

    do: (msg, args, client) => {

        if (!msg.member.roles.cache.some(role => role.name === BOT_MASTER)) {
            msg.channel.send('Nie posiadasz uprawnień do utworzenia kanału :(');
            return;
        }

        if (!args[0]) return msg.channel.send('Podaj argumenty :)');

        msg.channel.send('command coming soon ...');
    }
}
