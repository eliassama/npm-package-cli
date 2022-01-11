import * as path from 'path';
import * as fs from 'fs';

const UserHome = process.env.HOME || process.env.USERPROFILE;
const LocalStorageFile = path.resolve(UserHome || '', '.npm-template.json');
const DefaultData = {
  author: {
    name: '',
    email: '',
    url: '',
  },
};

export function read(target?: string) {
  try {
    const ReadData = JSON.parse(fs.readFileSync(LocalStorageFile, 'utf-8'));
    if (target) {
      return new Function(
        'ReadData',
        'DefaultData',
        `return Object.assign(DefaultData.${target},ReadData.${target})`,
      )(ReadData, DefaultData);
    }
    return ReadData || DefaultData;
  } catch (e) {
    if (target) {
      return new Function('DefaultData', `return DefaultData.${target}`)(
        DefaultData,
      );
    }
    return DefaultData;
  }
}

export function save(target: string, data: string | boolean) {
  const ReadData = read();
  try {
    const SaveData = new Function(
      'ReadData',
      'data',
      `ReadData.${target} = data ;return ReadData`,
    )(ReadData, data);
    fs.writeFileSync(LocalStorageFile, JSON.stringify(SaveData), 'utf-8');
    return true;
  } catch (e) {
    return false;
  }
}
