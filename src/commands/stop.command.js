const songService = require(`${__dirname}/../song.service`);

module.exports = {
    name: 'stop',
    description: 'przestaje grać piosenki',

    do: (msg, args, client) => {
        if (!msg.member.voice.channel)
            return msg.channel.send('Wejdź na kanał głosowy ♫');

        if (!songService.serverQueue)
            return msg.channel.send('Nie mam co stopnonć :(');

        msg.channel.send('Miło się było słyszeć, pa pa :)')

        songService.serverQueue.songs = [];
        songService.serverQueue.connection.dispatcher.end();
    }
}
