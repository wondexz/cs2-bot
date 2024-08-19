const { EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder } = require('discord.js');

module.exports = {
    name: "ip",
    description: "Sunucunun IP Adresini gösterir.",

    run: async (client, interaction) => {
        const embed = new EmbedBuilder()
        .setColor(process.env.EMBED_COLOR)
        .setAuthor({ name: `${interaction.user.globalName || interaction.user.username} (@${interaction.user.username})`, iconURL: interaction.user.avatarURL() })
        .setDescription("Sunucu IP Adresi: ```"+process.env.SERVER_IP+"```")
        .setImage(process.env.SERVER_LOGO)

        const connectButton = new ButtonBuilder()
        .setLabel("Sunucuya Bağlan")
        .setStyle(ButtonStyle.Link)
        .setURL(`https://redirecter-wx.vercel.app/?platform=steam&ip=${process.env.SERVER_IP}`)

        const serverinfo = new ButtonBuilder()
        .setCustomId("serverinfo")
        .setLabel("Sunucu Bilgileri")
        .setStyle(ButtonStyle.Primary)

        const row = new ActionRowBuilder()
        .addComponents(connectButton, serverinfo)

        interaction.reply({ embeds: [embed], components: [row] })
    }
}