const { EmbedBuilder } = require('discord.js');
const db = require('croxydb');

module.exports = {
    name: "bakım",
    description: "Bakım mesajı gönderir.",
    /**
     * @param {import("discord.js").ChatInputCommandInteraction} interaction 
     * @param {import("discord.js").Client} client
     */
    run: async (client, interaction) => {
        if (!db.has(`${interaction.user.id}_aktif`)) {
            const embed = new EmbedBuilder()
                .setColor("Red")
                .setAuthor({ name: interaction.user.username, iconURL: interaction.user.avatarURL() })
                .setDescription("Bu komutu kullanmak için `Aktif` yetkisine sahip olmalısınız.")
            return interaction.reply({ embeds: [embed], ephemeral: true })
        }

        const embed = new EmbedBuilder()
            .setColor(process.env.EMBED_COLOR)
            .setAuthor({ name: interaction.user.username, iconURL: interaction.user.avatarURL() })
            .setDescription("Sunucumuzda bakım çalışmaları yapılmaktadır. Kesintisiz ve daha iyi bir deneyim sunabilmek için lütfen sunucudan çıkış yapmanızı rica ederiz.")
            .setImage(process.env.SERVER_LOGO)

        const etiket = await interaction.channel.send(process.env.ETIKET);
        setTimeout(() => etiket.delete(), 1000);
        interaction.reply({ embeds: [embed] })
    }
}