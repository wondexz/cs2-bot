const { EmbedBuilder } = require("discord.js");
const db = require('croxydb');

module.exports = {
    name: "not-görüntüle",
    description: "Bir kullanıcının notunu gösterir.",
    options: [
        {
            type: 6,
            name: "kullanıcı",
            description: "Notuna bakılacak kullanıcıyı seçin.",
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
            .setDescription(`<@${user.id}> adlı kullanıcıya eklenen not:`+"```"+db.get(`note_${user.id}`))

        interaction.reply({ embeds: [embed], ephemeral: true });
    }
};