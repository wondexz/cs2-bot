const { default: chalk } = require("chalk");
const { Routes } = require("discord-api-types/v10");
const { REST } = require("@discordjs/rest");
const { GameDig } = require('gamedig');

module.exports = {
    name: "ready",
    /**
     * 
     * @param {import("discord.js").Client} client
     */
    run: async (client) => {
        const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);

        try {
            await rest.put(Routes.applicationCommands(client.user.id), {
                body: client.commands,
            });
        } catch (e) {
            console.error(e);
        };
        GameDig.query({
            type: 'csgo',
            host: process.env.SERVER_IP
        }).then((state) => {
            client.user.setPresence({
                activities: [{
                    name: `🧑‍💻 ${state.numplayers || 0}/${state.maxplayers || 'Sunucu Kapalı'} | 🗺️ ${state.map}`,
                    type: 0,
                }],
                status: "online"
            });
        }).catch((error) => {
            console.log(`Server is offline, error: ${error}`);
        });

        console.log(chalk.green("[START]"), chalk.white(`The bot named ${client.user.username} has been activated!`));
    }
};