const { Client, GatewayIntentBits } = require('discord.js');
const Aternos = require('aternos.js');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

const TOKEN = process.env.TOKEN;
const USERNAME = process.env.ATERNOS_USER;
const PASSWORD = process.env.ATERNOS_PASS;

const account = new Aternos({
    username: USERNAME,
    password: PASSWORD
});

client.on('ready', () => {
    console.log(`Bot connecté : ${client.user.tag}`);
});

client.on('messageCreate', async (message) => {
    if (message.author.bot) return;

    if (message.content === '/start') {
        try {
            await account.login();

            const servers = await account.getServers();
            const server = servers[0];

            await server.start();

            message.reply('🚀 Serveur Aternos démarré !');
        } catch (err) {
            console.error(err);
            message.reply('❌ Erreur démarrage serveur');
        }
    }

    if (message.content === '/status') {
        try {
            await account.login();

            const servers = await account.getServers();
            const server = servers[0];

            const status = await server.getStatus();

            message.reply(`📡 Statut : ${status}`);
        } catch (err) {
            console.error(err);
            message.reply('❌ Erreur statut');
        }
    }
});

client.login(TOKEN);
