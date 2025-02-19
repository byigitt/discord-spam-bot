require("dotenv").config();
const { REST, Routes } = require("discord.js");
const fs = require("fs");
const path = require("path");

const commands = [];
const commandsPath = path.join(__dirname, "commands");
const commandFiles = fs
  .readdirSync(commandsPath)
  .filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file);
  const command = require(filePath);
  if ("data" in command && "execute" in command) {
    const commandData = command.data.toJSON();
    commandData.dm_permission = true;
    commands.push(commandData);
  }
}

const rest = new REST().setToken(process.env.TOKEN);

(async () => {
  try {
    console.log(
      `[?] baslatiliyor.. ${commands.length} adet slash komutu yukleniyor..`
    );

    const data = await rest.put(
      Routes.applicationCommands(process.env.CLIENT_ID),
      { body: commands }
    );

    console.log(
      `[+] basariyla ${data.length} application slash komutlarini yeniledim.`
    );
  } catch (error) {
    console.error(error);
  }
})();
