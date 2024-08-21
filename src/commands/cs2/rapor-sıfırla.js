const { EmbedBuilder } = require('discord.js');
const db = require('croxydb');

module.exports = {
    name: "rapor-sıfırla",
    description: "Rapor sistemini sıfırlar",
    /**
     * @param {import("discord.js").ChatInputCommandInteraction} interaction 
     * @param {import("discord.js").Client} client 
     */
    run: async (client, interaction) => {
        if (!db.has(`${interaction.guild.id}_report`)) {
            const embed = new EmbedBuilder()
                .setColor('Red')
                .setAuthor({ name: interaction.user.globalName || interaction.user.username, iconURL: interaction.user.avatarURL() })
                .setDescription("Sunucunun rapor sistemi zaten devre dışı!")

            return interaction.reply({ embeds: [embed], ephemeral: true })
        }

        const embed = new EmbedBuilder()
        .setColor('Green')
        .setAuthor({ name: interaction.user.globalName || interaction.user.username, iconURL: interaction.user.avatarURL() })
        .setDescription("Rapor sistemi başarıyla sıfırlandı.")

        db.delete(`${interaction.guild.id}_report`)

        interaction.reply({ embeds: [embed] })
    }
}