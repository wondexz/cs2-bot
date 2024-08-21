const { EmbedBuilder } = require('discord.js');
const db = require('croxydb');

module.exports = {
    name: "rapor-kur",
    description: "Rapor sistemini kurar",
    options: [
        {
            name: "kanal",
            description: "Log kanalı seçiniz",
            type: 7,
            required: true,
            channel_types: [0],
        },
    ],
    /**
     * @param {import("discord.js").ChatInputCommandInteraction} interaction 
     * @param {import("discord.js").Client} client 
     */
    run: async (client, interaction) => {
        const logChannel = interaction.options.getChannel("kanal");

        if (interaction.user.id !== process.env.OWNER_ID) {
            const embed = new EmbedBuilder()
                .setColor("Red")
                .setAuthor({ name: interaction.user.globalName || interaction.user.username, iconURL: interaction.user.avatarURL() })
                .setDescription("Bu komutu sadece `Geliştirici` kullanabilir.")

            return interaction.reply({ embeds: [embed], ephemeral: true })
        }

        if (db.has(`${interaction.guild.id}_report`)) {
            const embed = new EmbedBuilder()
                .setColor('Red')
                .setAuthor({ name: interaction.user.globalName || interaction.user.username, iconURL: interaction.user.avatarURL() })
                .setDescription("Sunucunun rapor sistemi zaten açık!")

            return interaction.reply({ embeds: [embed], ephemeral: true })
        }

        const embed = new EmbedBuilder()
            .setColor("Green")
            .setAuthor({ name: interaction.user.globalName || interaction.user.username, iconURL: interaction.user.avatarURL() })
            .setDescription("Rapor sistemi başarıyla kuruldu!")

            db.set(`${interaction.guild.id}_report`, { log: logChannel.id })

        interaction.reply({ embeds: [embed] })
    }
}