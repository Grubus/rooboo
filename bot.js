const Discord = require('discord.js');
const client = new Discord.Client();

const { TOKEN } = require('./config');

const commandHandler = require('./src/handlers/command.handler');
commandHandler(client);

const userJoinHandler = require('./src/handlers/user-join.handler');
userJoinHandler(client);

const queue = new Map();

client.on('ready', () => {
    console.log('\n========================================');
    console.log(` Jestem ** ${client.user.tag} ** :) Zaczynamy!`);
    console.log('========================================\n');
});

client.login(TOKEN);