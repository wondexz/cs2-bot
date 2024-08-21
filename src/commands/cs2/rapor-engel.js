const { EmbedBuilder } = require('discord.js');
const db = require('croxydb');

module.exports = {
    name: "rapor-engel",
    description: "Seçilen kullanıcı rapor kullanamaz.",
    options: [
        {
            type: 6,
            name: "kullanıcı",
            description: "Rapor komutunu kullanamayacak kullanıcıyı seçin.",
            required: true
        }
    ],

    run: async (client, interaction) => {
        const user = interaction.options.getMember("kullanıcı");

        if (interaction.user.id !== process.env.OWNER_ID) {
            const embed = new EmbedBuilder()
                .setColor("Red")
                .setAuthor({ name: interaction.user.globalName || interaction.user.username, iconURL: interaction.user.avatarURL() })
                .setDescription("Bu komutu sadece `Geliştirici` kullanabilir.")

            return interaction.reply({ embeds: [embed], ephemeral: true })
        }

        if (!db.has(`${interaction.guild.id}_report`)) {
            const embed = new EmbedBuilder()
                .setColor('Red')
                .setAuthor({ name: interaction.user.globalName || interaction.user.username, iconURL: interaction.user.avatarURL() })
                .setDescription("Sunucunun rapor sistemi devre dışı!")

            return interaction.reply({ embeds: [embed], ephemeral: true })
        }

        if (db.has(`xreport_${user.id}`)) {
            const embed = new EmbedBuilder()
            .setColor('Red')
            .setAuthor({ name: interaction.user.globalName || interaction.user.username, iconURL: interaction.user.avatarURL() })
            .setDescription("Seçtiğiniz kullanıcı zaten engellenmiş!")
        }

        const embed = new EmbedBuilder()
        .setColor('Green')
        .setAuthor({ name: interaction.user.globalName || interaction.user.username, iconURL: interaction.user.avatarURL() })
        .setDescription("Kullanıcı başarıyla engellendi!")

        db.set(`xreport_${user.id}`, true)

        interaction.reply({ embeds: [embed], ephemeral: true })
    }
}