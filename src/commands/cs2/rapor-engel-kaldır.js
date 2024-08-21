const { EmbedBuilder } = require('discord.js');
const db = require('croxydb');

module.exports = {
    name: "rapor-engel-kaldır",
    description: "Seçilen kullanıcının rapor engeli kaldırılır.",
    options: [
        {
            type: 6,
            name: "kullanıcı",
            description: "Engeli kaldırılacak kullanıcıyı seçin.",
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

        if (!db.has(`xreport_${user.id}`)) {
            const embed = new EmbedBuilder()
            .setColor('Red')
            .setAuthor({ name: interaction.user.globalName || interaction.user.username, iconURL: interaction.user.avatarURL() })
            .setDescription("Seçtiğiniz kullanıcı zaten engellenmemiş!")
        }

        const embed = new EmbedBuilder()
        .setColor('Green')
        .setAuthor({ name: interaction.user.globalName || interaction.user.username, iconURL: interaction.user.avatarURL() })
        .setDescription("Kullanıcının engeli başarıyla açıldı!")

        db.delete(`xreport_${user.id}`)

        interaction.reply({ embeds: [embed], ephemeral: true })
    }
}