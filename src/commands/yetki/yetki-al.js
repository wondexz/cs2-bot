const { EmbedBuilder } = require("discord.js");
const db = require('croxydb');

module.exports = {
    name: "yetki-al",
    description: "Yetki alır.",
    options: [
        {
            type: 6,
            name: "kullanıcı",
            description: "Yetkisi alınacak kullanıcıyı seçin.",
            required: true
        },
        {
            type: 3,
            name: "yetki",
            description: "Kullanıcının alınacak yetkisini seçin",
            choices: [
                {
                    name: "Aktif",
                    value: "aktif"
                },
                {
                    name: "Yetki verme",
                    value: "yetkiverme"
                },
                {
                    name: "Not",
                    value: "not"
                },
                {
                    name: "Tümünü al",
                    value: "tumunual"
                }
            ],
            required: true
        }
    ],
    /**
     * 
     * @param {import("discord.js").ChatInputCommandInteraction} interaction 
     * @param {import("discord.js").Client} client
     */
    run: async (client, interaction) => {
        const kullanici = interaction.options.getMember("kullanıcı");
        const yetki = interaction.options.getString("yetki");

        if (interaction.user.id !== process.env.OWNER_ID && !db.has(`${interaction.user.id}_yetkiverme`)) {
            const embed = new EmbedBuilder()
                .setColor('Red')
                .setAuthor({ name: `${interaction.user.globalName || interaction.user.username} (@${interaction.user.username})`, iconURL: interaction.user.avatarURL() })
                .setDescription("Bu komutu kullanmak için `Yetki verme` yetkisine sahip olmalısınız.")

            return interaction.reply({ embeds: [embed], ephemeral: true });
        }

        if (kullanici.user.bot) {
            const embed = new EmbedBuilder()
                .setColor('Red')
                .setAuthor({ name: `${interaction.user.globalName || interaction.user.username} (@${interaction.user.username})`, iconURL: interaction.user.avatarURL() })
                .setDescription("Seçtiğiniz kullanıcı bir bot!")

            return interaction.reply({ embeds: [embed], ephemeral: true })
        }

        if (yetki === "tumunual") {
            const embed = new EmbedBuilder()
                .setColor("Green")
                .setAuthor({ name: `${interaction.user.globalName || interaction.user.username} (@${interaction.user.username})`, iconURL: interaction.user.avatarURL() })
                .setDescription(`Kullanıcının yetkileri başarılya **silindi**.`)

            db.delete(`${kullanici.id}_aktif`)
            db.delete(`${kullanici.id}_yetkiverme`)
            db.delete(`${kullanici.id}_not`)
            interaction.reply({ embeds: [embed] })
        }

        const embed = new EmbedBuilder()
            .setColor("Green")
            .setAuthor({ name: `${interaction.user.globalName || interaction.user.username} (@${interaction.user.username})`, iconURL: interaction.user.avatarURL() })
            .setDescription("Kullanıcının yetkisi başarıyla alındı.")

        interaction.reply({ embeds: [embed] });
    }
};