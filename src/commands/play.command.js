const songService = require(`${__dirname}/../song.service`);
const ytdl = require('ytdl-core');

function play(guild, song) {
    const serverQueue = songService.queue.get(guild.id);

    if (!song) {
        serverQueue.voiceChannel.leave();
        songService.queue.delete(guild.id);
        return;
    }

    const dispatcher = serverQueue.connection
        .play(ytdl(song.url))
        .on("finish", () => {
            serverQueue.songs.shift();
            play(guild, serverQueue.songs[0]);
        })
        .on("error", error => console.error(error));

    dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);

    serverQueue.textChannel.send(`Gram sobie: **${song.title}**`);

    songService.serverQueue = serverQueue;
}

module.exports = {
    name: 'play',
    description: '<url> zaczyna grać piosenkę',

    do: async (msg, args, client) => {

        const voiceChannel = msg.member.voice.channel;
        if (!voiceChannel)
            return msg.channel.send('Wejdź na kanał głosowy ♫');

        const permissions = voiceChannel.permissionsFor(msg.client.user);

        if (!permissions.has('CONNECT') || !permissions.has('SPEAK'))
            return msg.channel.send('Nie mam pozwolenia na didżejowanie :(');

        const songInfo = await ytdl.getInfo(args[0]);

        const song = {
            title: songInfo.videoDetails.title,
            url: songInfo.videoDetails.video_url
        };

        if (!songService.serverQueue) {
            const queueContruct = {
                textChannel: msg.channel,
                voiceChannel: voiceChannel,
                connection: null,
                songs: [],
                volume: 5,
                playing: true
            };

            songService.queue.set(msg.guild.id, queueContruct);
            queueContruct.songs.push(song);

            try {

                let connection = await voiceChannel.join();
                queueContruct.connection = connection;
                play(msg.guild, queueContruct.songs[0]);

            } catch (error) {

                console.log(error);
                songService.queue.delete(msg.guild.id);
                return msg.channel.send(error);

            }

        } else {
            songService.serverQueue.songs.push(song);
            return msg.channel.send(`**${song.title}** dodana do kolejki :)`);
        }
    }
}
