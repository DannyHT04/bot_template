module.exports = (client) => {
  console.log(`${client.user.tag} is online 🚀 `);
  //setting bot activity on discord
  client.user.setActivity({
    name: "with grass",
  });
};
