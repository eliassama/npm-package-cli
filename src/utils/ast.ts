import * as output from "./output";

export function declareFileName(fileName: string): boolean {
  if (/[a-z|-|\.|_|A-Z|0-9]+\.d$/.test(fileName)){
    return true
  }
  return false;
}

export function diffFileName(firstFileName: string, secondFileName: string): boolean {
  if(!firstFileName || !secondFileName || firstFileName === secondFileName){
    return false;
  }
  return true;
}

export function email(email: string): boolean {
  if(/^([a-zA-Z0-9]+[_|_|\-|.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|_|.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,6}$/.test(email)){
    return true;
  }
  return false;
}

export function httpUrl(url: string): boolean {
  if(/^(?:(http|https|ftp):\/\/)?((|[\w-]+\.)+[a-z0-9]+)(?:(\/[^/?#]+)*)?(\?[^#]+)?(#.+)?$/i.test(url)){
    return true;
  }
  return false;
}

export function gitSshUrl(url: string): boolean {
  if(/^git@[^:]+:[^\/]+?\/.*?.git$/.test(url)){
    return true;
  }
  return false;
}

export function gitHttpUrl(url: string): boolean {
  if(/^http(s)?:\/\/([^\/]+?\/){2}.*?.git$/.test(url)){
    return true;
  }
  return false;
}

export function gitUrl(url: string): boolean {
  if(/^(http(s)?:\/\/([^\/]+?\/){2}|git@[^:]+:[^\/]+?\/).*?.git$/.test(url)){
    return true;
  }
  return false;
}
