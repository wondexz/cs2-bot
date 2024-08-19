const { Client, Partials, IntentsBitField } = require("discord.js");
const { default: chalk } = require("chalk");
const { readdirSync } = require("fs");
require("dotenv").config();

const client = new Client({
    intents: Object.values(IntentsBitField.Flags),
    partials: Object.values(Partials)
});

if (!process.env.TOKEN || !process.env.OWNER_ID) return console.log(chalk.red("TOKEN, BOT_STATUS veya OWNER_ID girilmemiş lütfen kontrol edin."))

global.client = client;
client.commands = (global.commands = []);

readdirSync("./src/commands").forEach((category) => {
    readdirSync(`./src/commands/${category}`).forEach((file) => {
        if (!file.endsWith(".js")) return;

        const command = require(`./commands/${category}/${file}`);
        const { name, description, type, options, dm_permissions } = command;

        client.commands.push({
            name,
            description,
            type: type ? type : 1,
            options,
            dm_permissions
        });

        console.log(chalk.red("[COMMANDS]"), chalk.white(`The command named ${name} is loaded!`));
    });
});

readdirSync("./src/events").forEach((category) => {
    readdirSync(`./src/events/${category}`).forEach((file) => {
        if (!file.endsWith(".js")) return;

        const event = require(`./events/${category}/${file}`);
        const eventName = event.name || file.split(".")[0];

        client.on(eventName, (...args) => event.run(client, ...args));

        console.log(chalk.blue("[EVENTS]"), chalk.white(`Event named ${eventName} has been loaded!`));
    });
});

client.login(process.env.TOKEN);