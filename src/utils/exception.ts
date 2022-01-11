import * as output from './output';

export function panic(...messages: any[]) {
  output.error(...messages);
  process.exit();
}
