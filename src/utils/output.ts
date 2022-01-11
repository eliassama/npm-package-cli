import * as chalk from 'chalk';

export function info(...messages: any[]) {
  console.log(chalk.bold.black(...messages));
}

export function prompt(...messages: any[]) {
  console.log(chalk.bold.green(...messages));
}

export function warn(...messages: any[]) {
  console.log(chalk.bold.yellow(...messages));
}

export function error(...messages: any[]) {
  console.log(chalk.bold.red(...messages));
}
