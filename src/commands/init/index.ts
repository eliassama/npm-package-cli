#!/usr/bin/env node

import { Command } from 'commander';
import * as tsPackage from './ts-package';

interface ConfigAuthorOptionsType {
  typescript?: boolean;
}

export function makeSubcommand() {
  const Program = new Command('init').description(
    'Initialize to create an NPM Package template',
  );

  Program.option(
    '-ts, --typescript',
    'Initializing creates a package written in typescript',
  );

  Program.allowExcessArguments(false);

  Program.action(commandAction);

  return Program;
}

function commandAction(options: ConfigAuthorOptionsType) {
  if (options.typescript) {
    tsPackage.init();
  }
}
