const { Events } = require("discord.js");

module.exports = {
  name: Events.ClientReady,
  once: true,
  execute(client) {
    console.log(`[+] basariyla giris yapildi. ${client.user.tag}`);
  },
};
