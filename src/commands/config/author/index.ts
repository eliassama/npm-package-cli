#!/usr/bin/env node

import { Command } from 'commander';
import * as nameCommand from './name';
import * as emailCommand from './email';
import * as urlCommand from './url';

interface ConfigAuthorOptionsType {
  name?: string;
  email?: string;
  url?: string;
}

export function makeSubcommand() {
  const Program = new Command('author').description(
    'Set the default author information',
  );

  Program.option('-n, --name <authorName>', 'Set the default author name');

  Program.option('-e, --email <authorEmail>', 'Set the default author email');

  Program.option('-u, --url <authorUrl>', 'Set the default author home page');

  Program.allowExcessArguments(false);

  Program.action(commandAction);

  return Program;
}

function commandAction(options: ConfigAuthorOptionsType) {
  if (options.name) {
    nameCommand.execute(options.name);
  }

  if (options.email) {
    emailCommand.execute(options.email);
  }

  if (options.url) {
    urlCommand.execute(options.url);
  }
}
