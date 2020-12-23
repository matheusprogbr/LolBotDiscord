const fs = require('fs');
const { prefix } = require('../config.json');

const dirPath = './app/commands/';
const requirePath = '../commands/';

const fileNames = fs.readdirSync(dirPath);
const commands = {};

module.exports = () => {
  fileNames.forEach((file) => {
    const name = file.split('.')[0];
    commands[prefix + name] = require(requirePath + name);
  });
  console.log(commands);
  return commands;
};
