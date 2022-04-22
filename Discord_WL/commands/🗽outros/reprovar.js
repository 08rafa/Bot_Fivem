// Feito por @rafa.#6132
// Feito por @rafa.#6132

const Discord = require("discord.js")
const mysql = require('mysql')
const { ipdb, userdb, senhadb, databasedb, portdb } = require("../../config/mysql.js")
const { footer, logo } = require("../../config/server.js")

module.exports = {
    name: "unw;",
    description: "unwl",
    aliases: ['rem'],
    run: async (client, message, args) => {

        let id = args[0]
        let motivo = args.slice(1).join(" ")

        if (!motivo) return message.reply(`🚫| ${message.author}, você não mencionou o motivo.`)
        if (!id) return message.reply(`🚫| ${message.author}, você não o ID do membro.`)

        if (!message.member.permissions.has("MANAGE_MEMBERS")) return message.reply(`${message.author} **Você não possui permissão para esse comando.**`);

        // [SQL] Estabelecendo a conexao:
        let connection = mysql.createPool({
            host: ipdb, // IP do Banco de Dados
            user: userdb, // Usuario do Banco de Dados
            password: senhadb, // Senha do Banco de Dados
            database: databasedb, // Nome da sua database
            port: portdb // Porta.
        });
        // [SQL-2] Alterando os dados e liberando o ID:
        let sql = `UPDATE vrp_users SET whitelisted = '0' WHERE id = '${id}'`

        // [SQL-Result] Resultado da conexao:
        connection.query(sql, function (err, result) {
            if (err) throw err;

            let embed_resultado = new Discord.MessageEmbed()
            .setAuthor(`Operação Concluída`)
            .setDescription(`Comando: **!unwl**`)
            .addField(`ID Retirado:`, `${id}`)
            .addField(`Responsável:`, `${message.author}`)
            .addField(`Motivo:`, `${motivo}`)
            .setFooter(footer, logo)

            message.channel.send({ embeds: [embed_resultado]})

        })
    }
}

// Feito por @rafa.#6132
// Feito por @rafa.#6132