#!/usr/bin/env node

import { Command } from 'commander';
import { version } from '../../package.json';
import * as configCommands from '../commands/config';
import * as initCommands from '../commands/init';
import * as publishCommands from '../commands/publish';

const Program = new Command();

Program.version(version);

Program.addCommand(configCommands.makeSubcommand());

Program.addCommand(initCommands.makeSubcommand());

Program.addCommand(publishCommands.makeSubcommand());

// 处理命令行输入的参数
Program.parse(process.argv);
