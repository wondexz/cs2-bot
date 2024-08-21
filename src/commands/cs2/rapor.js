const { EmbedBuilder } = require('discord.js');
const db = require('croxydb');

module.exports = {
    name: "rapor",
    description: "Oyundaki bir kullanıcıyı raporlarsın.",
    options: [
        {
            type: 3,
            name: "kullanıcı",
            description: "Raporlanacak kullanıcının ismini yazınız.",
            required: true
        },
        {
            type: 3,
            name: "sebep",
            description: "Kullanıcının raporlanma sebebini yazınız.",
            choices: [
                {
                    name: "Hile",
                    value: "Hile"
                },
                {
                    name: "Küfür",
                    value: "Küfür"
                },
                {
                    name: "Sunucuya Hakaret",
                    value: "Sunucuya Hakaret"
                },
                {
                    name: "Kışkırtıcı Söz",
                    value: "Kışkırtıcı Söz"
                },
                {
                    name: "Mikrofona Üfleme",
                    value: "Mikrofona Üfleme"
                }
            ],
            required: true
        },
        {
            type: 3,
            name: "ek",
            description: "Ek olarak yazmak istediğiniz bir not var ise yazınız."
        }
    ],
    /**
     * @param {import("discord.js").ChatInputCommandInteraction} interaction 
     * @param {import("discord.js").Client} client 
     */
    run: async (client, interaction) => {
        const user = interaction.options.getString("kullanıcı");
        const reason = interaction.options.getString("sebep");
        const note = interaction.options.getString("ek");

        if (!db.has(`${interaction.guild.id}_report`)) {
            const embed = new EmbedBuilder()
                .setColor('Red')
                .setAuthor({ name: interaction.user.globalName || interaction.user.username, iconURL: interaction.user.avatarURL() })
                .setDescription("Sunucunun rapor sistemi devre dışı!")

            return interaction.reply({ embeds: [embed], ephemeral: true })
        }

        if (db.has(`xreport_${interaction.user.id}`)) {
            const embed = new EmbedBuilder()
                .setColor('Red')
                .setAuthor({ name: interaction.user.globalName || interaction.user.username, iconURL: interaction.user.avatarURL() })
                .setDescription("Rapor göndermen engellenmiş!")

            return interaction.reply({ embeds: [embed], ephemeral: true })
        }

        const embed = new EmbedBuilder()
            .setColor('Green')
            .setAuthor({ name: interaction.user.globalName || interaction.user.username, iconURL: interaction.user.avatarURL() })
            .setDescription("Raporunuz başarıyla gönderildi.")


        const data = db.get(`${interaction.guild.id}_report`)
        const logEmbed = new EmbedBuilder()
            .setColor('Blue')
            .setAuthor({ name: `${interaction.user.globalName || interaction.user.username} - Rapor Gönderdi`, iconURL: interaction.user.avatarURL() })
            .setDescription("Yeni bir rapor gönderildi!")
            .addFields(
                { name: "Raporlayan", value: `wondexz (<@${interaction.user.id}>)`, inline: true },
                { name: "Raporlanan", value: user, inline: true },
                { name: "Raporlama Sebebi", value: reason, inline: true }
            )

            if (note) logEmbed.addFields({ name: "Ek not", value: note, inline: true })

        const logChannel = interaction.guild.channels.cache.get(data.log)

        interaction.reply({ embeds: [embed], ephemeral: true })
        logChannel.send({ embeds: [logEmbed] })
    }
}