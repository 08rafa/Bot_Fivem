const Discord = require('discord.js')
const mysql = require('mysql')
const mysql_config = require('../../config/mysql.js')
const config = require('../../config/server.js')

const { cor_das_embeds, canal_wl, categoria_wl, logo, footer, logs_staff, com_wl, sem_wl, resultados, canal_regras, call_ou_canal_suporte } = require('../../config/server.js')

module.exports = {
    name: "iniciarwl", // Nome do comando.
    aliases: ["whitelist"], // Sinônimos.

    run: async (client, message, args) => {

        message.delete()

        // [MYSQL] Criando a conexão. Não altere.
        let connection = mysql.createPool({
            host: mysql_config.ipdb, 
            user: mysql_config.userdb, 
            password: mysql_config.senhadb, 
            database: mysql_config.databasedb 
        });

        // [COMPONENTS]
        let regras = new Discord.MessageButton().setLabel(`📔 CANAL DE REGRAS`).setStyle("LINK").setURL(`https://discord.com/channels/${message.guild.id}/${canal_regras}`)
        let suporte = new Discord.MessageButton().setLabel(`📍FALAR COM O SUPORTE`).setStyle("LINK").setURL(`https://discord.com/channels/${message.guild.id}/${call_ou_canal_suporte}`)
        let componets_1 = new Discord.MessageActionRow().addComponents(regras, suporte)

        let botao_sucess_dm = new Discord.MessageButton().setCustomId("sucessdm").setLabel(`Mensagem Enviada por: ${message.guild.name}`).setStyle("SUCCESS").setDisabled(true).setEmoji('🔒');
        let button_dm_sucess = new Discord.MessageActionRow().addComponents(botao_sucess_dm)

        let botao_danger_dm = new Discord.MessageButton().setCustomId("dangerdm").setLabel(`Mensagem Enviada por: ${message.guild.name}`).setStyle("DANGER").setDisabled(true).setEmoji('🔒');
        let button_dm_danger = new Discord.MessageActionRow().addComponents(botao_danger_dm)


        // [EMBEDS] Algumas das embeds.
        let embed_principal = new Discord.MessageEmbed()
            .setTitle(`Sistema de Whitelist Exclusivo! ✅`)
            .setThumbnail(logo)
            .setDescription('Para Iniciar a whitelist digite: ``!whitelist`` neste canal, e responda as perguntas!')
            .setFooter('Developed By ! rafa#0008', logo)
            .setColor(cor_das_embeds)

        let embed_entrada = new Discord.MessageEmbed()
            .setColor(cor_das_embeds)
            .setTitle(`✅ Sistema de whitelist!`)
            .setDescription(`💎 Para **iniciar **o formulário digite: **iniciarwl** neste canal. Para **cancelar** o formulário a qualquer momento digite **cancelarwl** neste canal.\nResponda as perguntas de maneia objetiva e somente com o que foi solicitado.`)
            .setFooter(footer)

        let embed_2 = new Discord.MessageEmbed()
            .setColor(cor_das_embeds)
            .setTitle(`📝 Pergunta: 1`)
            .setDescription(`📌 Qual o nome do seu personagem?`)
            .setFooter(`Responda apenas com o nome do seu personagem.`)
            .setTimestamp()

        let embed_3 = new Discord.MessageEmbed()
            .setColor(cor_das_embeds)
            .setTitle(`📝 Pergunta: 2`)
            .setDescription(`📌 Qual o seu ID apresentado in-game?`)
            .setFooter(`Responda apenas com o numero do seu ID no jogo.`)
            .setTimestamp()

        let embed_aprovado = new Discord.MessageEmbed()
            .setColor(cor_das_embeds)
            .setTitle(`💠 Resultado`)
            .setDescription(`Parabéns! Você foi aprovado com sucesso!`)
            .setFooter(`Este canal sera deletado em 5 segundos...`)
            .setTimestamp()

        let embed_delete = new Discord.MessageEmbed()
            .setColor(cor_das_embeds)
            .setTitle(`🚫 Whitelist Cancelada.`)
            .setDescription(`Você digitou o comando **cancelarwl** e a sua whitelist foi cancelada. Caso você queria fazer a WL novamente digite o comando: **!whitelist** em <#${canal_wl}>`)
            .setFooter(`Sistema de whitelist.`)

        let embed_delete2 = new Discord.MessageEmbed()
            .setColor(cor_das_embeds)
            .setTitle(`🚫 Whitelist Cancelada.`)
            .setDescription(`Você digitou algo que não era compatível como resposta da pergunta e por isso sua WL foi cancelada. Caso você queria fazer a WL novamente digite o comando: **!whitelist** em <#${canal_wl}>`)
            .setFooter(`Sistema de whitelist.`)

        let embed_resultado_publico = new Discord.MessageEmbed()
            .setColor(cor_das_embeds)
            .setTitle(`✅ Membro Aprovado`)
            .setDescription(`<@${message.author.id}> foi aprovado com sucesso! 💠`)
            .setThumbnail(logo)
            .setFooter(footer)

        let aprovadoDM = new Discord.MessageEmbed()
            .setColor(cor_das_embeds)
            .setTitle(`✅ Resultados Whitelist:`)
            .setDescription(`Você foi aprovado no formulário de whitelist! Obrigado por jogar em nosso servidor.`)

        let embed_cancelarwl = new Discord.MessageEmbed()
            .setColor(cor_das_embeds)
            .setTitle(`🚫 Whitelist Cancelada`)
            .addField(`Membro:`, `<@${message.author.id}>`)
            .addField(`ID do Discord:`, `${message.author.id}`)
            .addField(`Motivo:`, `Usuário cancelou a whitelist.`)
            .addField(`Motivos:`, `Utilizou o comando \`cancelarwl\` ou digitou algo que não era compatível como resposta da pergunta.`)
            .setFooter(`Log's sistema de whitelist.`)
            .setTimestamp()
            // [EMBEDS] Fim das embeds - Aqui começa o código de verdade!

        if (message.channel.id !== config.canal_wl) { // SE a mensagem NÃO for enviada no canal definido ( ${config.canal_wl} ):
            return;
        }
        else {
            if (message.channel.id === config.canal_wl) {

                message.guild.channels.create(`📝wl-${message.author.username}`, { // Criando o canal.

                    permissionOverwrites: [{ // Configurando as permissões do usuário.
                        id: message.author.id,
                        allow: ["SEND_MESSAGES", "VIEW_CHANNEL"]
                    },
                    {
                        id: message.guild.roles.everyone, // Configurando as permissões para @everyone
                        deny: ["VIEW_CHANNEL"],
                    }
                    ],

                    type: 'text', // Tipo de canal.
                    parent: categoria_wl // Categoria onde o canal sera criado.

                }).then(async canal => {

                    canal.setRateLimitPerUser('5') // Setando o slowmode do canal para 5 segundos.

                    let channel_wl = new Discord.MessageButton().setLabel(`IR PARA O CANAL`).setStyle("LINK").setURL(`https://discord.com/channels/${message.guild.id}/${canal}`) // Botao que leva o membro ate um canal.
                    let componets_2 = new Discord.MessageActionRow().addComponents(channel_wl)
                    let embed_wlcriada = new Discord.MessageEmbed()
                        .setColor(cor_das_embeds)
                        .setTitle(`💻 Formulário criado`)
                        .setDescription(`✅ <@${message.author.id}>, seu canal de whitelist foi criado em ${canal}. Siga para o canal para proseguir com a whitelist e ver mais informações sobre.`) // Mensagem enviada no CANAL DE WL para notificar o membro da abertura de sua wl.
                        .setFooter(`${message.guild.name} whitelist ✅.`)
                        .setThumbnail(logo)
                    message.channel.send({ embeds: [embed_wlcriada], components: [componets_2] }).then(m => {
                        setTimeout(() => {
                            m.delete() // Deletando esta mensagem do canal principal depois de:
                        }, 9000) // MS
                    })

                    // [TUTORIAL] - Como usar coletores: Para mais ajuda use o site do Discord.js Guide.
                    canal.send({ embeds: [embed_entrada] }).then(embed => embed.pin()).then(msg => { // Agora ja no canal de WL, enviando a embed de entrada e dando pin nela.
                        let coletor_1 = canal.createMessageCollector({ filter: mm => mm.author.id == message.author.id, max: 1 }); // Criando um collctor, e configurando os seus filtros.
                        coletor_1.on("collect", (resposta_1) => { // Quando o coletor coletar algo... Definindo o conteudo coletado como "resposta_1".
                            let inicio = resposta_1.content; // Defininfo "inicio" como sendo o conteudo do que foi coletado. E depois voce faz o que quiser com este conteudo coletado.

                            if (inicio !== "iniciar") { // Se o conteúdo não for "iniciar", então cancele tudo e delete o canal.
                                canal.delete()
                                client.channels.cache.get(logs_staff).send({ embeds: [embed_cancelarwl] }) // Enviando a log para a equipe.

                                let membro = message.guild.members.cache.get(message.author.id); // Enviando o aviso no privado do membro.
                                membro.send({ embeds: [embed_delete2], components: [button_dm_danger] })
                            }

                            if (inicio === "iniciar") { // Caso o conteúdo coletado for igual a "iniciar", então inicie o 'processo'.
                                canal.send({ embeds: [embed_2] }).then(m_2 => {
                                    let coletor_2 = canal.createMessageCollector({ filter: mm => mm.author.id == message.author.id, max: 1 }); // Mesma coisa do coletor acima, por isso não vou explicar novamente.

                                    coletor_2.on("collect", (resposta_2) => {

                                        let nome_personagem = resposta_2.content;
                                        if (nome_personagem == "cancelarwl") {
                                            canal.delete()
                                            client.channels.cache.get(logs_staff).send({ embeds: [embed_cancelarwl] })

                                            let membro = message.guild.members.cache.get(message.author.id);
                                            membro.send({ embeds: [embed_delete], components: [button_dm_danger] })
                                        }

                                        canal.send({ embeds: [embed_3] }).then(m_3 => {

                                            let coletor_3 = canal.createMessageCollector({ filter: mm => mm.author.id == message.author.id, max: 1 });

                                            coletor_3.on("collect", (resposta_3) => {
                                                let id_whitelist = resposta_3.content;

                                                if (isNaN(id_whitelist)) {
                                                    canal.delete()
                                                    client.channels.cache.get(logs_staff).send({ embeds: [embed_cancelarwl] })

                                                    let membro = message.guild.members.cache.get(message.author.id);
                                                    membro.send({ embeds: [embed_delete2], components: [button_dm_danger] })
                                                } else
                                                    if (id_whitelist == "cancelarwl") {
                                                        canal.delete()
                                                        client.channels.cache.get(logs_staff).send({ embeds: [embed_cancelarwl] })

                                                        let membro = message.guild.members.cache.get(message.author.id);
                                                        membro.send({ embeds: [embed_delete], components: [button_dm_danger] })
                                                    }

                                                let embed_confirmar = new Discord.MessageEmbed() // Enviando a embed para que o usuario confirme as suas informações.
                                                    .setColor(cor_das_embeds)
                                                    .setTitle(`📝 Confirme as suas informações:`)
                                                    .addField(`💎 Nome do personagem:`, `💠 ${nome_personagem}`)
                                                    .addField(`💎 ID apresentado no jogo:`, `💠 ${id_whitelist}`)
                                                    .setFooter(`Digite confirmar para proseguir e cancelarwl para cancelar.`)

                                                canal.send({ embeds: [embed_confirmar] }).then(m_4 => {
                                                    let coletor_4 = canal.createMessageCollector({ filter: mm => mm.author.id == message.author.id, max: 1 }); // Mesma coisa do coletor, porem sendo aplicada para outra finalidade, como eu havia descrito acima.

                                                    coletor_4.on("collect", (resposta_4) => {

                                                        let confirmarwl = resposta_4.content;

                                                        if (confirmarwl !== "confirmar") {
                                                            canal.delete()
                                                            client.channels.cache.get(logs_staff).send({ embeds: [embed_cancelarwl] })

                                                            let membro = message.guild.members.cache.get(message.author.id);
                                                            membro.send({ embeds: [embed_delete2], components: [button_dm_danger] })
                                                        } else
                                                            if (confirmarwl == "confirmar") {
                                                                let resultadostaff = new Discord.MessageEmbed()
                                                                    .setTitle(`Log's Whitelist`)
                                                                    .setColor(cor_das_embeds)
                                                                    .addField(`💎 Status:`, `APROVADO.`)
                                                                    .addField(`💎 Nome do Personagem:`, `${nome_personagem}`)
                                                                    .addField(`💎 ID do jogador:`, `${id_whitelist}`)
                                                                    .addField(`💎 User Discord:`, `<@${message.author.id}>`)
                                                                    .addField(`💎 ID Discord:`, `${message.author.id}`)
                                                                    .setTimestamp()
                                                                client.channels.cache.get(logs_staff).send({ embeds: [resultadostaff] }) // Enviando a log para a equipe.
                                                                client.channels.cache.get(resultados).send({ embeds: [embed_resultado_publico] }) // Enviando a mensagem de resultado no canal publico.

                                                                let sql = `UPDATE vrp_users SET whitelisted = '1' WHERE id = '${id_whitelist}'` // MYSQL
                                                                connection.query(sql, function (err, result) { // Query da conexao.
                                                                    if (err) throw err; // Se houver algum erro, exibir no console.

                                                                    let membro = message.guild.members.cache.get(message.author.id); // Enviando a mensagem no privado do membro.
                                                                    membro.send({ embeds: [aprovadoDM], components: [button_dm_sucess] })

                                                                    message.member.roles.remove(sem_wl) // Removendo o cargo antido.
                                                                    message.member.roles.add(com_wl) // Adiconando o cargo de aprovado.
                                                                    message.member.setNickname(nome_personagem + " | " + id_whitelist) // Setando o nickname do membro.

                                                                    canal.send({ embeds: [embed_aprovado] }).then(m_4 => { // Deletando o canal apos o processo ser, finalizado.
                                                                        setTimeout(() => {
                                                                            canal.delete()
                                                                        }, 9000)
                                                                    })

                                                                    console.log(`[🗽System - WL] ID: ${id_whitelist}, ${message.author.id} | Aprovado pelo sistema ✅`)
                                                                })
                                                            }
                                                    })
                                                })
                                            })
                                        })
                                    })
                                })
                            }
                        })
                    })
                })
            }
        }
    }
}
