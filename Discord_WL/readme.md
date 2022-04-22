Baixe os arquivos do bot clicando sobre "code" e depois em "Download Zip".
![image](https://user-images.githubusercontent.com/104206689/164741962-ae5df998-969f-4024-9a60-3d8cfa2f2e31.png)

COMO CONFIGURAR:

¹ - Insira o token e o prefix do seu bot dentro do arquivo "bot.json", dentro da pasta "config".
![image](https://user-images.githubusercontent.com/104206689/164736533-0a3a4b03-0c88-45b2-8a68-beaad3a4beff.png)

² - Configure a parte do Banco de Dados, dentro do arquivo "mysql.js" que fica dentro da pasta "config".

⚠️IMPORTANTE:

📌O IP padrão para acesso ao localhost e 127.0.0.1, então se seu Banco de Dados estiver sendo hospedado em localhost, 
fora de uma VPS ou outra hospedagem externa ao local onde o BOT está sendo hospedado, deixe 127.0.0.1, pois como dito 
anteriormente este e o IP padrão para acesso ao localhost.

📌Usuário padrão para acessar o localhost.

📌Senha padrão e sem senha.

![image](https://user-images.githubusercontent.com/104206689/164736964-e5b723b3-9944-4106-adb3-1e01eb899302.png)


³ - Para as demais, configure tudo no arquivo "server.js" dentro da pasta "config".

![image](https://user-images.githubusercontent.com/104206689/164738152-96beed59-9959-4cc8-bee0-d2bbbc27b10f.png)

⁴ - Instalando todas as dependencias:

![image](https://user-images.githubusercontent.com/104206689/164739024-95e0d01d-a059-42a4-bdc7-c00770f2ee51.png)

Aperte: ctrl + shift + ` ou digite em um terminal ja existente:

npm init

npm i mysql

npm i discord.js

npm i fs


❓FAQ:

-> *__Como pegar o a database corretamente:__*

Dentro do código, na parte da configuração do mysql, você tera de configurar o nome da database. Isso e algo que muitas pessoas 
confundem então vou tentar explicar aqui:

![image](https://user-images.githubusercontent.com/104206689/164740435-aebeac17-aac0-43e2-b2ee-7c79461882ed.png)

Por exemplo:
Nesta imagem acima, o correto a ser inserido na configuração do mysql (config\mysql.js), seria **red_v1** e NÃO **fivem**, já que
 **fivem** e o nome da **sessão**, e **red_v1** e o nome da minha database onde estão todos os dados do jogo (imagem abaixo) e etc. 
![image](https://user-images.githubusercontent.com/104206689/164740933-9c5d14b7-3754-4079-9f53-48c43b4a2eaf.png)

ENTÃO NÃO CONFUNDA ESTES DOIS NOMES!

-> *__AUTO-ROLE:__*

Caso queira retirar o sistema de autorole, ele esta nas linhas 60 - 63 na index.js.
![image](https://user-images.githubusercontent.com/104206689/164741287-1f19c140-f4d2-4c1f-83e3-4d58c9a865ee.png)
