const songService = require(`${__dirname}/../song.service`);

module.exports = {
    name: 'skip',
    description: 'pomija piosenkę',

    do: (msg, args, client) => {
        if (!msg.member.voice.channel)
            return msg.channel.send('Wejdź na kanał głosowy ♫');

        if (!songService.serverQueue)
            return msg.channel.send("Nie mam co skipnonć :(");

        songService.serverQueue.connection.dispatcher.end();
    }
}
