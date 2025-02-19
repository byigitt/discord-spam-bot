const { Events } = require("discord.js");

module.exports = {
  name: Events.InteractionCreate,
  async execute(interaction) {
    if (!interaction.isChatInputCommand()) return;

    const command = interaction.client.commands.get(interaction.commandName);

    if (!command) {
      console.error(
        `[!] ${interaction.commandName} adinda bir slash komutu bulunamadi.`
      );
      return;
    }

    try {
      await command.execute(interaction);
    } catch (error) {
      console.error(
        `[!] ${interaction.commandName} adinda bir slash komutu calistirilirken hata alindi.`
      );
      console.error(error);

      if (interaction.replied || interaction.deferred) {
        await interaction.followUp({
          content: "Bir hata olustu.",
          ephemeral: true,
        });
      } else {
        await interaction.reply({
          content: "Bir hata olustu.",
          ephemeral: true,
        });
      }
    }
  },
};
