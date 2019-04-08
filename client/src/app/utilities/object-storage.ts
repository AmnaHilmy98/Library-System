declare let require: any;

export class ObjectStorage {
  constructor() {
  }

  public set(key: string, obj: any) {
    localStorage.setItem(key, JSON.stringify(obj));
  }

  public get(key: string): any {
    if (localStorage.getItem(key) === null) {
      return null;
    } else {
      const objString = localStorage.getItem(key);
      return JSON.parse(objString);
    }
  }

  public remove(key: string) {
    localStorage.removeItem(key);
  }
}

export class ErrorCode {
  public static getErrorMsg(code: string) {
    const errMsg: string = require('../../assets/data/ERROR_CODES.json')[code];
    if (errMsg) {
      return errMsg;
    } else {
      return 'Something went wrong';
    }
  }
}
