#!/usr/bin/env node

import { Command } from 'commander';
import * as alpha from './alpha';
import * as beta from './beta';
import * as ga from './ga';
import * as rc from './rc';

interface ConfigAuthorOptionsType {
  alpha?: boolean;
  beta?: boolean;
  rc?: boolean;
  ga?: boolean;
}

export function makeSubcommand() {
  const Program = new Command('publish').description(
    'Publish version of the NPM package',
  );

  Program.option(
    '-alpha',
    'Internal test version',
  );

  Program.option(
    '-beta',
    'Test version',
  );

  Program.option(
    '-rc',
    'Pre-release version',
  );

  Program.option(
    '-ga',
    'A version available for production',
  );

  Program.allowExcessArguments(false);

  Program.action(commandAction);

  return Program;
}

function commandAction(options: ConfigAuthorOptionsType) {

  if (options.alpha){
    alpha.publish()
  }

  if (options.beta){
    beta.publish()
  }

  if (options.rc){
    rc.publish()
  }

  if (options.ga){
    ga.publish()
  }

}
