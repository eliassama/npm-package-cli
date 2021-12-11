import * as LocalStorage from '../../../utils/local-storage';
const chalk = require('chalk');

export function execute(data: string) {
  if (LocalStorage.save('author.name', data)) {
    return console.log(
      chalk.bold.green(`The author name is successfully set to ${data}`),
    );
  }
  console.log(
    chalk.bold.red(
      "Failed to set author's name because the set name is not valid",
    ),
  );
}
