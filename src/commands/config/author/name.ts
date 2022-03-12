import * as LocalStorage from '../../../utils/local-storage';
import { output } from '../../../utils';

export function execute(data: string) {
  if (LocalStorage.save('author.name', data)) {
    return output.prompt(`The author name is successfully set to ${data}`);
  }
  output.error("Failed to set author's name because the set name is not valid");
}
