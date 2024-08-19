const { EmbedBuilder } = require('discord.js');
const { GameDig } = require('gamedig');

module.exports = {
    name: "interactionCreate",
    /**
     * @param {import("discord.js").ChatInputCommandInteraction} interaction 
     * @param {import("discord.js").Client} client
     */

    run: async (client, interaction) => {
        if (!interaction.isButton()) return;
        if (interaction.customId === "serverinfo") {
            GameDig.query({
                type: 'csgo',
                host: process.env.SERVER_IP
            }).then((state) => {
                const embed = new EmbedBuilder()
                    .setColor(process.env.EMBED_COLOR)
                    .setAuthor({
                        name: `${interaction.user.globalName || interaction.user.username} (@${interaction.user.username})`,
                        iconURL: interaction.user.avatarURL()
                    })
                    .setDescription(state.name)
                    .addFields(
                        { name: "Harita", value: state.map || "Bilinmiyor", inline: true },
                        { name: "Oyuncu Sayısı", value: `${state.numplayers || 0}/${state.maxplayers || 'Bilinmiyor'}`, inline: true },
                        { name: "Sunucu IP Adresi", value: `${process.env.SERVER_IP} | [Tıkla Bağlan](https://redirecter-wx.vercel.app/?platform=steam&ip=${process.env.SERVER_IP})`, inline: true },
                        { name: "Oyuncular", value: "```"+state.players.map(p => p.name).join('\n')+"```" || "Bilinmiyor", inline: true },
                        { name: "Skorlar", value: "```"+state.players.map(p => p.raw.score).join('\n')+"```" || "Bilinmiyor", inline: true }
                    );

                interaction.reply({ embeds: [embed], ephemeral: true });
            }).catch((error) => {
                console.log(`Server is offline, error: ${error}`);
                interaction.reply({ content: "Sunucu şu anda çevrimdışı.", ephemeral: true });
            });
        }
    }
};