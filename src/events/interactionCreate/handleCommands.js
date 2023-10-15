const { devs, serverId } = require("../../../config.json");
const getLocalCommands = require("../../utils/getLocalCommands");

module.exports = async (client, interaction) => {
  if (!interaction.isChatInputCommand()) return;
  const localCommand = getLocalCommands();
  try {
    const commandObject = localCommand.find(
      (cmd) => cmd.name === interaction.commandName
    );
    if (!commandObject) return;
    if (commandObject.devOnly) {
      if (!devs.includes(interaction.members.id)) {
        interaction.reply({
          content: "Only developers are allowed to run this command.",
          ephemeral: true,
        });
        return;
      }
    }
    if (commandObject.testOnly) {
      if (interaction.guild.id !== serverId) {
        interaction.reply({
          content: "This server is not allowed to run this command",
          ephemeral: true,
        });
        return;
      }
    }
    if (commandObject.permissionsRequired?.length) {
      for (const permission of commandObject.permissionsRequired) {
        if (!interaction.members.permissions.has(permission)) {
          interaction.reply({
            content: "You do not have permissions.",
            ephemeral: true,
          });
          return;
        }
      }
    }
    if (commandObject.botPermissions?.length) {
      for (const permission of commandObject.botPermissions) {
        const bot = interaction.guild.members.me;
        if (!bot.permissions.has(permission)) {
          interaction.reply({
            content: "I do not have permissions.",
            ephemeral: true,
          });
          return;
        }
      }
    }
    await commandObject.callBack(client, interaction);
  } catch (error) {
    console.log(`ERROR with this command: ${error}`);
  }
};
