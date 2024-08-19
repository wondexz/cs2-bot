const { EmbedBuilder } = require("discord.js");
const db = require('croxydb');

module.exports = {
    name: "not-ekle",
    description: "Kullanıcı için bir not ekler.",
    options: [
        {
            type: 6,
            name: "kullanıcı",
            description: "Not eklenecek kullanıcıyı seçin.",
            required: true
        },
        {
            type: 3,
            name: "notunuz",
            description: "Not yazınız.",
            required: true
        }
    ],
    /**
     * 
     * @param {import("discord.js").ChatInputCommandInteraction} interaction 
     * @param {import("discord.js").Client} client
     */
    run: async (client, interaction) => {
        const user = interaction.options.getMember("kullanıcı");
        const note = interaction.options.getString("notunuz");

        if (!db.has(`${interaction.user.id}_not`)) {
            const embed = new EmbedBuilder()
            .setColor("Red")
            .setAuthor({ name: `${interaction.user.globalName || interaction.user.username} (@${interaction.user.username})`, iconURL: interaction.user.avatarURL() })
            .setDescription("Bu komutu kullanmak için `Not` yetkisine sahip olmalısınız.")
            return interaction.reply({ embeds: [embed], ephemeral: true })
        }

        if (user.user.bot) {
            const embed = new EmbedBuilder()
                .setColor('Red')
                .setAuthor({ name: `${interaction.user.globalName || interaction.user.username} (@${interaction.user.username})`, iconURL: interaction.user.avatarURL() })
                .setDescription("Seçtiğiniz kullanıcı bir bot!")

            return interaction.reply({ embeds: [embed], ephemeral: true })
        }

        const embed = new EmbedBuilder()
            .setColor("Green")
            .setAuthor({ name: `${interaction.user.globalName || interaction.user.username} (@${interaction.user.username})`, iconURL: interaction.user.avatarURL() })
            .setDescription("Not başarıyla eklendi.```"+note+"```")

            db.set(`note_${user.id}`, `${note}`)

        interaction.reply({ embeds: [embed], ephemeral: true });
    }
};