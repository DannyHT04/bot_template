module.exports = {
  name: "ping",
  description: "Pong!",
  //devOnly: Boolean,
  //testOnly:Boolean,
  //deleted: Boolean,
  // options: Object[],

  callBack: (client, interaction) => {
    interaction.reply(`Pong! ${client.ws.ping}ms`);
  },
};
