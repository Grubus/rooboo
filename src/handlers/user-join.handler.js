module.exports = client => {

    client.on('guildMemberAdd', member => {
        const channel = member.guild.channels.cache.find(ch => ch.name === 'ogólny');
        if (!channel) return console.log('Kanał nie istnieje :(');
        channel.send(`Witaj ${member}! Wpisz **roo-help**, by wyświetlić wszystkie komendy :)`);
    });

}
