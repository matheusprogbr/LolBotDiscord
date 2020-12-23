require('dotenv').config();
const client = require('./bot/bot');
const { prefix, activity } = require('./config.json');
const commands = require('./scripts/readCommand')(prefix);

client.on('ready', () => {
  client.user.setPresence({
    activity,
    status: 'online',
  });
  console.log('Bot logged in ...');
});

client.on('message', (msg) => {
  if (msg.author.bot) return;
  const args = msg.content.split(' ');
  if (commands[args[0]]) commands[args[0]](client, msg);
  else if (args[0].startsWith(prefix))
    msg.reply(
      `O comando ${args[0]} não existe. Digite !help para a lista de comando existentes!:robot:`
    );
});

client.login(process.env.TOKEN);
