#!/usr/bin/env node

import { Command } from 'commander';
import * as authorCommand from './author';

export function makeSubcommand() {
  const Program = new Command('config').description(
    'Set the default options for the configuration',
  );

  Program.addCommand(authorCommand.makeSubcommand());

  return Program;
}
