#!/usr/bin/env node

import { Command } from 'commander';
import { version } from '../../package.json';
import * as configCommands from '../commands/config';

const Program = new Command();

Program.version(version);

Program.addCommand(configCommands.makeSubcommand());

// 处理命令行输入的参数
Program.parse(process.argv);
