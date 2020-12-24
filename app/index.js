require('dotenv').config();
const client = require('./bot/bot');
const { prefix, activity } = require('./config.json');
const commands = require('./scripts/readCommand')(prefix);

let aux = true;

client.on('ready', () => {
  client.user.setPresence({
    activity,
    status: 'online',
  });
  console.log('Bot logged in ...');
});

client.on('message', async (msg) => {
  if (msg.author.bot) return;
  const args = msg.content.split(' ');
  if (commands[args[0]]) {
    await commands[args[0]](client, msg);
    aux = false;
  }
  if (args[0].startsWith(prefix) && aux) {
    console.log(aux);
    msg.reply(
      `O comando ${args[0]} não existe. Digite !help para a lista de comando existentes!:robot:`
    );
  }
});

client.login(process.env.TOKEN);
