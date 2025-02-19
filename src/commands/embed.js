const {
  SlashCommandBuilder,
  EmbedBuilder,
  MessageFlags,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("embed")
    .setDescription("spam embed mesaj gonderir.")
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
        .setName("title")
        .setDescription("embed icin baslik giriniz.")
        .setRequired(true)
        .setMaxLength(100)
    )
    .addStringOption((option) =>
      option
        .setName("description")
        .setDescription(
          "embed icin aciklama giriniz. (\\n ile alt satira gecebilirsiniz)"
        )
        .setRequired(true)
        .setMaxLength(1000)
    )
    .addStringOption((option) =>
      option
        .setName("footer")
        .setDescription(
          "embed icin alt bilgi giriniz. (\\n ile alt satira gecebilirsiniz)"
        )
        .setRequired(false)
        .setMaxLength(100)
    )
    .addStringOption((option) =>
      option
        .setName("color")
        .setDescription("embed icin renk giriniz (hex code)")
        .setRequired(false)
    )
    .addStringOption((option) =>
      option
        .setName("content")
        .setDescription(
          "ekstra metin icin giriniz (\\n ile alt satira gecebilirsiniz)"
        )
        .setRequired(false)
        .setMaxLength(100)
    )
    .addStringOption((option) =>
      option
        .setName("image")
        .setDescription("resim url giriniz")
        .setRequired(false)
    ),
  /**
   *
   * @param {import("discord.js").ChatInputCommandInteraction} interaction
   */
  async execute(interaction) {
    const count = interaction.options.getInteger("count");
    const title = interaction.options.getString("title");
    const description = interaction.options
      .getString("description")
      .replace(/\\n/g, "\n");
    const footer = interaction.options.getString("footer");
    const color = interaction.options.getString("color") || "#000000";
    const content =
      interaction.options.getString("content")?.replace(/\\n/g, "\n") || "";
    const imageUrl = interaction.options.getString("image");

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
        const embed = new EmbedBuilder()
          .setTitle(title)
          .setDescription(description)
          .setColor(color)
          .setTimestamp();

        if (imageUrl) {
          embed.setImage(imageUrl);
        }

        if (footer) {
          embed.setFooter({ text: footer });
        }

        await interaction.followUp({
          content: content,
          embeds: [embed],
          allowedMentions: { parse: ["everyone", "roles", "users"] },
        });
      } catch (error) {
        console.error("Error in interval:", error);
        clearInterval(interval);
      }
    }, 1000);
  },
};
