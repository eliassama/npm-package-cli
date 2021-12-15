import * as LocalStorage from '../../../utils/local-storage';
const chalk = require('chalk');

export function execute(data: string) {
  if (
    /^([a-zA-Z0-9]+[_|_|\-|.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|_|.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,6}$/.test(
      data,
    )
  ) {
    if (LocalStorage.save('author.email', data)) {
      return console.log(
        chalk.bold.green(`The author email is successfully set to ${data}`),
      );
    }
  }
  console.log(
    chalk.bold.red(
      `Failed to set author's email ${data}, because the set email is not valid`,
    ),
  );
}
