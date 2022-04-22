const Discord = require("discord.js")
const mysql = require('mysql')
const { ipdb, userdb, senhadb, databasedb, portdb } = require("../../config/mysql.js");
const { footer, logo } = require("../../config/server.js");

module.exports = {
    name: "banfivem",
    description: "banfivem",
    aliases: ["banfivem", "ban5", "ban5m"],
    run: async (client, message, args) => {
        if (!message.member.permissions.has("BAN_MEMBERS")) return message.reply(`${message.author} **Voce não possui permissão para esse comando.**`);

        let connection = mysql.createPool({
            host: ipdb, // IP do Banco de Dados
            user: userdb, // Usuario do Banco de Dados
            password: senhadb, // Senha do Banco de Dados
            database: databasedb, // Nome da sua database
            port: portdb // Porta.
        });

        let id = args[0]
        let motivo = args.slice(1).join(" ")

        if (!motivo) return message.reply("Você precisa inserir um motivo para banir ${id} ")
        if (!id) return message.reply("Você não mencionou um ID.")
        if (isNaN(id)) return message.reply("Isso não é um ID válido.")

        let valor = 1
        let sql = `UPDATE vrp_users SET banned = '${valor}' WHERE id = '${id}'`
        connection.query(sql, function (err, result) {
            if (err) throw err;
            let embed = new Discord.MessageEmbed()
                .setAuthor("**Novo Banimento Resgistrado 🤜**")
                .setDescription(`**ID do Jogador Punido:**  __'${id}'__\n**Motivo:** __'${motivo}'__\n**Responsável:** __'<@${message.author.id}>'__\n**ID do Banimento:** __'${id}'__`)
                .setThumbnail('https://media.tenor.com/images/e73ad714fc5e70d2385d43ace6ba9d91/tenor.gif')
                .setTimestamp()
                .setFooter(footer, logo)

            message.channel.send({ embeds: [embed] });
            message.delete()
        })

    }
}