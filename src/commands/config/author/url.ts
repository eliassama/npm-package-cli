import * as LocalStorage from '../../../utils/local-storage';
const chalk = require('chalk');

export function execute(data: string) {
  if (data[data.length - 1] === "/"){
    data = data.substring(0, data.length - 1)
  }

  if (
    /^(?:(http|https|ftp):\/\/)?((|[\w-]+\.)+[a-z0-9]+)(?:(\/[^/?#]+)*)?(\?[^#]+)?(#.+)?$/i.test(
      data,
    )
  ) {
    if (LocalStorage.save('author.url', data)) {
      return console.log(
        chalk.bold.green(`The author url is successfully set to ${data}`),
      );
    }
  }
  console.log(
    chalk.bold.red(
      `Failed to set author's url ${data}, because the set url is not valid`,
    ),
  );
}
