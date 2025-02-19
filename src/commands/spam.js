const { SlashCommandBuilder, MessageFlags } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("spam")
    .setDescription("adi uzerinde, mesaj spamlayin.")
    .addIntegerOption((option) =>
      option
        .setName("count")
        .setDescription("kac kere gonderilsin? sayi giriniz (max 5)")
        .setRequired(true)
        .setMinValue(1)
        .setMaxValue(5)
    )
    .addStringOption((option) =>
      option
        .setName("message")
        .setDescription("ne yazilsin? (\\n ile alt satira gecebilirsiniz)")
        .setRequired(true)
        .setMaxLength(1000)
    ),
  /**
   *
   * @param {import("discord.js").ChatInputCommandInteraction} interaction
   */
  async execute(interaction) {
    const count = interaction.options.getInteger("count");
    const message = interaction.options
      .getString("message")
      .replace(/\\n/g, "\n");

    let sent = 0;
    await interaction.reply({
      content: `[+] baslatiliyor..`,
      flags: MessageFlags.Ephemeral,
    });

    const interval = setInterval(async () => {
      try {
        if (sent >= count) {
          clearInterval(interval);
          return;
        }

        sent++;
        await interaction.followUp({
          content: `${message}`,
          ephemeral: false,
          allowedMentions: { parse: ["everyone", "roles", "users"] },
        });
      } catch (error) {
        console.error("Error in interval:", error);
        clearInterval(interval);
      }
    }, 1000);
  },
};
