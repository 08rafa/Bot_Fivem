const Discord = require("discord.js");
const config = require('./config/bot.json');
const fs = require("fs");

const client = new Discord.Client({ intents: 32767 });
client.login(config.token);


client.once('ready', async () => {
    console.log(`[🗽System - START] O bot foi iniciado com sucesso.`)
    console.log(`[🗽System - READY] Bot iniciado em 🌐 ${client.guilds.cache.size} servidores, com 👤 ${client.users.cache.size} usuarios.`)
})


client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
client.categories = fs.readdirSync(`./commands/`);
fs.readdirSync('./commands/').forEach(local => {

	const comandos = fs.readdirSync(`./commands/${local}`).filter(arquivo => arquivo.endsWith('.js'))

	for (let file of comandos) {

		let puxar = require(`./commands/${local}/${file}`)

		if (puxar.name) {
			client.commands.set(puxar.name, puxar)
		}
		if (puxar.aliases && Array.isArray(puxar.aliases))

			puxar.aliases.forEach(x => client.aliases.set(x, puxar.name))
	}
});

client.on("messageCreate", async (message) => {

    let prefix = config.prefix;

    if (message.author.bot) return;
    if (message.channel.type == 'dm') return;
    if (!message.content.toLowerCase().startsWith(prefix.toLowerCase())) return;
    if (!message.content.startsWith(prefix)) return;
    
    const args = message.content.slice(prefix.length).trim().split(/ +/g);

    let cmd = args.shift().toLowerCase()
    if (cmd.length === 0) return;
    let command = client.commands.get(cmd)
    if (!command) command = client.commands.get(client.aliases.get(cmd))

    try {
        command.run(client, message, args)
    } catch (err) {

        console.error('Erro:' + err);
    }
});
