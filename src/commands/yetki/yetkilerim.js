const { EmbedBuilder } = require('discord.js');
const db = require('croxydb');

module.exports = {
    name: "yetkiler",
    description: "Yetkileri gösterir.",
    options: [
        {
            type: 6,
            name: "kullanıcı",
            description: "Yetkileri gösterilecek kullanıcıyı seçin.",
        }
    ],
    /**
     * 
     * @param {import("discord.js").ChatInputCommandInteraction} interaction 
     * @param {import("discord.js").Client} client 
     */
    run: async (client, interaction) => {
        const kullanici = interaction.options.getMember("kullanıcı");

        if (!kullanici) {
            const embed = new EmbedBuilder()
                .setColor('#0200ff')
                .setAuthor({ name: `${interaction.user.globalName || interaction.user.username} (@${interaction.user.username})`, iconURL: interaction.user.avatarURL() })
                .setDescription(`- Aktif: ${db.has(`${interaction.user.id}_aktif`) ? "✅" : "❌"}\n- Yetki verme: ${db.has(`${interaction.user.id}_yetkiverme`) ? "✅" : "❌"}\n- Not: ${db.has(`${interaction.user.id}_not`) ? "✅" : "❌"}`)

            return interaction.reply({ embeds: [embed] })
        }

        if (kullanici.user.bot) {
            const embed = new EmbedBuilder()
                .setColor('Red')
                .setAuthor({ name: `${interaction.user.globalName || interaction.user.username} (@${interaction.user.username})`, iconURL: interaction.user.avatarURL() })
                .setDescription("Seçtiğiniz kullanıcı bir bot!")

            return interaction.reply({ embeds: [embed], ephemeral: true })
        }

        const embed = new EmbedBuilder()
            .setColor('#0200ff')
            .setAuthor({ name: `${kullanici.user.globalName || kullanici.user.username} (@${kullanici.user.username})`, iconURL: kullanici.user.avatarURL() })
            .setDescription(`- Aktif: ${db.has(`${kullanici.id}_aktif`) ? "✅" : "❌"}\n- Yetki verme: ${db.has(`${kullanici.id}_yetkiverme`) ? "✅" : "❌"}\n- Not: ${db.has(`${kullanici.id}_not`) ? "✅" : "❌"}`)
            .setFooter({ text: `${interaction.user.username} adlı kullanıcı tarafından sorgulandı`, iconURL: interaction.user.avatarURL() })

        interaction.reply({ embeds: [embed] })
    }
};