const { EmbedBuilder } = require("discord.js");
const db = require('croxydb');

module.exports = {
    name: "yetki-ver",
    description: "Yetki verir.",
    options: [
        {
            type: 6,
            name: "kullanıcı",
            description: "Yetki verilecek kullanıcıyı seçin.",
            required: true
        },
        {
            type: 3,
            name: "yetki",
            description: "Verilecek yetkiyi seçin.",
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
                    name: "Tümünü ver",
                    value: "tumunuver"
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

        if (yetki === "tumunuver") {
            const embed = new EmbedBuilder()
                .setColor("Green")
                .setAuthor({ name: `${interaction.user.globalName || interaction.user.username} (@${interaction.user.username})`, iconURL: interaction.user.avatarURL() })
                .setDescription(`Kullancıya başarıyla **bütün yetkiler** verildi.`)

            db.set(`${kullanici.id}_aktif`, true)
            db.set(`${kullanici.id}_yetkiverme`, true)
            db.set(`${kullanici.id}_not`, true)
            return interaction.reply({ embeds: [embed] })
        }

        const embed = new EmbedBuilder()
            .setColor("Green")
            .setAuthor({ name: `${interaction.user.globalName || interaction.user.username} (@${interaction.user.username})`, iconURL: interaction.user.avatarURL() })
            .setDescription(`Kullancıya başarıyla yetki verildi.`)

        db.set(`${kullanici.id}_${yetki}`, true)

        interaction.reply({ embeds: [embed] });
    }
};