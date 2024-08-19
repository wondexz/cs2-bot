const { EmbedBuilder } = require('discord.js');
const db = require('croxydb');

module.exports = {
    name: "aktif",
    description: "Aktif mesajı gönderir.",
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
            .setDescription("Sunucu aktif, müsait olan herkes sunucumuza davetlidir.\n\nSunucu IP Adresi:```" + process.env.SERVER_IP + "```" + `\n[Tıkla Bağlan](https://redirecter-wx.vercel.app/?platform=steam&ip=${process.env.SERVER_IP})`)
            .setImage(process.env.SERVER_LOGO)

        const etiket = await interaction.channel.send(process.env.ETIKET);
        setTimeout(() => etiket.delete(), 1000);
        interaction.reply({ embeds: [embed] })
    }
}