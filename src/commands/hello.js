const { SlashCommandBuilder, MessageFlags } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("test")
    .setDescription("test to see if ephermeral works"),
  async execute(interaction) {
    await interaction.reply({
      content: `[/] eger bunu gorduysen mesaj basarili..`,
      ephemeral: true,
    });
  },
};
