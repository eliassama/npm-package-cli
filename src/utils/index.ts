import { regex } from '../resource';
import { versions } from 'process';
import * as path from 'path';
import * as fs from 'fs';
import * as chalk from 'chalk';

export const ast = {
  tsFile: function (fileName: string): boolean {
    return regex.tsFile.test(fileName);
  },
  declareFileName: function (fileName: string): boolean {
    return (
      this.fileNameOrPath(fileName) && regex.declareBasePath.test(fileName)
    );
  },
  fileNameOrPath: function (val: string): boolean {
    const { dir }: path.ParsedPath = path.parse(val);
    const dirArray: string[] = dir.split('/');

    for (const item of dirArray) {
      if (item && !regex.posixShortPath.test(item)) {
        return false;
      }
    }

    return true;
  },
  diffName: function (firstName: string, secondName: string): boolean {
    return !(!firstName || !secondName || firstName === secondName);
  },
  isEmail: function (email: string): boolean {
    return regex.email.test(email);
  },
  httpUrl: function (url: string): boolean {
    return regex.url.test(url);
  },
  gitSshUrl: function (url: string): boolean {
    return regex.gitSsh.test(url);
  },
  gitHttpUrl: function (url: string): boolean {
    return regex.gitHttp.test(url);
  },
  gitUrl: function (url: string): boolean {
    return regex.gitUrl.test(url);
  },
};

export const filepath = {
  dirConvert: function (directory: string) {
    if (!path.isAbsolute(directory)) {
      return path.resolve(__dirname, '..', '..', directory);
    }
    return directory;
  },
  recursionMkdir: async function (targetPath: string) {
    targetPath = this.dirConvert(targetPath);

    if (parseInt(`${versions.node}`.split('.').join('')) >= 10120) {
      fs.mkdirSync(targetPath, { recursive: true });
      return true;
    } else {
      if (fs.existsSync(targetPath)) {
        return true;
      } else if (await this.recursionMkdir(path.dirname(targetPath))) {
        fs.mkdirSync(targetPath);
        return true;
      }
    }
  },
  writeFile: async function (
    file: string,
    data: string | NodeJS.ArrayBufferView,
    options: { overwrite: boolean },
  ) {
    if (!options.overwrite) {
      try {
        fs.accessSync(file, fs.constants.F_OK);
        return;
      } catch (err) {}
    }
    await fs.writeFileSync(file, data, 'utf-8');
  },
  copyFile: async function (
    targetFile: string,
    sourceFile: string,
    options: { overwrite: boolean },
  ) {
    targetFile = this.dirConvert(targetFile);
    sourceFile = this.dirConvert(sourceFile);
    const stat = await fs.statSync(sourceFile);
    if (stat.isFile()) {
      await this.writeFile(
        targetFile,
        await fs.readFileSync(sourceFile),
        options,
      );
    } else {
      await this.recursionMkdir(targetFile);
      await Promise.all(
        fs.readdirSync(sourceFile, 'utf8').map(async (filePath: string) => {
          await this.copyFile(
            path.join(targetFile, filePath),
            path.join(sourceFile, filePath),
            options,
          );
        }),
      );
    }
  },
};

export const output = {
  info: function (...messages: any[]) {
    console.log(chalk.bold.black(...messages));
  },

  prompt: function (...messages: any[]) {
    console.log(chalk.bold.green(...messages));
  },

  warn: function (...messages: any[]) {
    console.log(chalk.bold.yellow(...messages));
  },

  error: function (...messages: any[]) {
    console.log(chalk.bold.red(...messages));
  },
};

export const format = {
  toPosixPath: function (path: string): string {
    return path.replace(/\\/g, '/');
  },
};

export const exception = {
  panic: function (...messages: any[]) {
    output.error(...messages);
    process.exit();
  },
};
