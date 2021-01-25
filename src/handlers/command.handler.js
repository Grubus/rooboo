const { Collection } = require('discord.js');
const { readdirSync } = require('fs');

const ascii = require('ascii-table');
const table = new ascii().setHeading('Komenda', 'Stan');

const { PREFIX } = require(`${__dirname}/../../config`);

const songService = require(`${__dirname}/../song.service`);

module.exports = client => {

    client.commands = new Collection();

    const commandFiles = readdirSync(`${__dirname}/../commands`).filter(file => file.endsWith('command.js'));

    commandFiles.forEach(file => {
        const command = require(`${__dirname}/../commands/${file}`);
        if (command.name) {
            client.commands.set(command.name, command);
            table.addRow(file, 'OK');
        } else {
            table.addRow(file, 'NIE OK');
        }
    });

    console.log('\n' + table.toString());

    client.on('message', msg => {

        // message props
        if (msg.author.bot) return;
        if (msg.channel.type == 'dm') {
            msg.reply('Sorcia, nie odpowiadam na dm-y :(');
            return;
        }

        // command service
        if (!msg.content.startsWith(PREFIX)) return;
        if (msg.content.split(/ +/)[0].length === PREFIX.length) return;

        const args = msg.content.slice(PREFIX.length).trim().split(/ +/);

        const command = args.shift().toLowerCase();

        songService.serverQueue = songService.queue.get(msg.guild.id);

        if (!client.commands.has(command)) {
            msg.reply('nie ma takiej komendy :(');
        } else {
            try {
                client.commands.get(command).do(msg, args, client);
            } catch (error) {
                console.error(error);
                msg.reply('wystąpił problem przy wykonywaniu polecenia :(');
            }
        }

    });

}
