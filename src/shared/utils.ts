import {AbstractControl, ValidatorFn,} from '@angular/forms';
import {TranslateService} from "@ngx-translate/core";
import {Injectable} from "@angular/core";
import {IonicApp, Platform} from "ionic-angular";

@Injectable()
export class Utils {
  public preventScrollContentPadding: boolean = true;

  constructor(public translate: TranslateService, public platform: Platform,private ionicApp: IonicApp) {
    translate.setDefaultLang('en');
    translate.use('en');
  }

   popupHandler():boolean{
     let activePortal = this.ionicApp._loadingPortal.getActive() ||
       this.ionicApp._modalPortal.getActive() ||
       this.ionicApp._toastPortal.getActive() ||
       this.ionicApp._overlayPortal.getActive();
     if (activePortal && activePortal.index === 0) {
       activePortal.dismiss();
         return false;
     }
     return true;
   }

  keyUpValidate(e, format) {
    if (format) {
      let pattern = new RegExp(format);
      let count = 0;
      try {
        let value = e.target.value,
          cursor = e.target.selectionStart;
        if (value.startsWith(' ')) {
          value = value.trim();
          setTimeout(() => {
            e.target.selectionStart = cursor - 1;
            e.target.selectionEnd = cursor - 1;
          });
        } else {
          if (!(e.keyCode === 8 || e.key === 'Backspace' || e.keyCode === 46 || e.key === 'Delete')) {
            if (value.length) {
              while (!pattern.test(value)) {
                if (value.length > 0) {
                  if (count < 1) {
                    value = value.substr(0, cursor - 1) + '' + value.substr(cursor);
                    if (cursor != 0) {
                      setTimeout(() => {
                        e.target.selectionStart = cursor - 1;
                        e.target.selectionEnd = cursor - 1;
                      });
                    }
                    count++;
                  }
                  else {
                    value = value.substr(0, value.length - 1);
                  }
                }
                else {
                  break;
                }

              }
            }
          }
        }
        e.target.value = value;
        if (value) {
          if (cursor < value.length) {
            e.target.setSelectionRange(cursor, cursor);
          }
        }
      } catch (ex) {
        console.log(ex);
      }
    } else {
      let value = e.target.value,
        cursor = e.target.selectionStart;
      if (value.startsWith(' ')) {
        value = value.trim();
        setTimeout(() => {
          e.target.selectionStart = cursor - 1;
          e.target.selectionEnd = cursor - 1;
        });
      }
      e.target.value = value;
      if (cursor < value.length) {
        e.target.setSelectionRange(cursor, cursor);
      }
    }
  }

  validate(model, format): boolean {
    if (model != null && model.length > 0) {
      let pattern = new RegExp(format);
      try {
        if (pattern.test(model)) {
          return false;
        }
        else {
          return true;
        }
      } catch (ex) {
        console.log(ex);
      }
    }
    else {
      return false;
    }
  }

  checkUIMode(): string {
    if (this.platform.is("android")) {
      return 'md';
    }
    else {
      return 'ios';
    }
  }

  /*keyUpRfidValidate(e) {
    try {
      let value = e.target.value;
      if (!(e.keyCode === 8 || e.key === 'Backspace' || e.keyCode === 46 || e.key === 'Delete')) {
        if (value.length) {
          let value = e.target.value,
            cursor = e.target.selectionStart;
          if (value.startsWith(' ') || value.endsWith(' ')) {
            value = value.trim();
            setTimeout(() => {
              e.target.selectionStart = cursor - 1;
              e.target.selectionEnd = cursor - 1;
            });
          }
        }
      }
      e.target.value = value;
    } catch (ex) {
      console.log(ex);
    }
  }*/

  keyUpDecimalValidate(temp): string {
    try {
      let value = temp;
      if (!(temp.keyCode === 8 || temp.key === 'Backspace' || temp.keyCode === 46 || temp.key === 'Delete')) {
        if (value.length) {

          if (value.substr(value.length - 1, value.length) === "-") {
            if (value.length > 1) {
              value = value.substr(0, value.length - 1);
            }
          } else if (value.substr(value.length - 1, value.length) === ".") {
            if (value.length > 1) {
              if (value.substr(0, value.length - 1).includes(".")) {
                value = value.substr(0, value.length - 1);
              }
            }
          } else if (value.substr(1, value.length).includes("-")) {
            value = value.replace("-", "");
          }
        }
      }

      temp = value;
      return temp;
    } catch (ex) {
      console.log(ex);
    }
  }

  keyUpPositiveDecimalValidate(temp): string {
    try {
      let value = temp;
      if (!(temp.keyCode === 8 || temp.key === 'Backspace' || temp.keyCode === 46 || temp.key === 'Delete')) {
        if (value.length) {

          if (value.substr(value.length - 1, value.length) === ".") {
            if (value.length > 1) {
              if (value.substr(0, value.length - 1).includes(".")) {
                value = value.substr(0, value.length - 1);
              }
            }
          } else if (value.substr(1, value.length).includes("-")) {
            value = value.replace("-", "");
          }
        }
      }

      temp = value;
      return temp;
    } catch (ex) {
      console.log(ex);
    }
  }

  getLocaleString(key: string): string {
    let retValue = "";
    this.translate.get(key).subscribe(
      value => {
        retValue = value;
        return retValue;
      }
    );
    return retValue;
  }

  public setPaddingForScrollContent(val: boolean) {
    this.preventScrollContentPadding = val;
    console.log('set padding ' + val)
  }

  public getPaddingForScrollContent(): boolean {

    return this.preventScrollContentPadding;
  }
}

export function sortArray(array: Array<any>, args: string, ascending: boolean): Array<any> {
  let direction = ascending ? 1 : -1;
  array.sort((a: any, b: any) => {
    if (null == a[args]) {
      a[args] = "";
    }
    if (null == b[args]) {
      b[args] = "";
    }
    if (a[args].toLowerCase() < b[args].toLowerCase()) {
      return -1 * direction;
    } else if (a[args].toLowerCase() > b[args].toLowerCase()) {
      return 1 * direction;
    } else {
      return 0;
    }
  });
  return array;
}

export function sortNumberArray(array: Array<any>, args: string, ascending: boolean): Array<any> {
  let direction = ascending ? 1 : -1;
  array.sort((a: any, b: any) => {
    if (Number.parseInt(a[args]) < Number.parseInt(b[args])) {
      return -1 * direction;
    } else if (Number.parseInt(a[args]) > Number.parseInt(b[args])) {
      return 1 * direction;
    } else {
      return 0;
    }
  });
  return array;
}

export function sortDateArray(array: Array<any>, args: string, ascending: boolean): Array<any> {
  array.sort((a: any, b: any) => {
    let left: any = "";
    let right: any = "";
    if (null != a[args] && "" != a[args]) {
      left = new Date(transformDate(a[args]));
    }
    if (null != b[args] && "" != b[args]) {
      right = new Date(transformDate(b[args]));
    }
    return ascending ? left - right : right - left;
  });
  return array;
}


export function transformDate(value: string): Date {
  let reggie = /(\d{2})\/(\d{2})\/(\d{4})/;
  let dateArray = reggie.exec(value);
  let dateObject = new Date(
    (+dateArray[3]),
    ((+dateArray[2])) - 1, // month starts at 0!
    (+dateArray[1]));
  return dateObject;
}

export function sortDateWithTimeArray(array: Array<any>, args: string, ascending: boolean): Array<any> {
  array.sort((a: any, b: any) => {
    let left: any = "";
    let right: any = "";
    if (null != a[args] && "" != a[args]) {
      left = new Date(transformwithTime(a[args]));
    }
    if (null != b[args] && "" != b[args]) {
      right = new Date(transformwithTime(b[args]));
    }
    return ascending ? left - right : right - left;
  });
  return array;
}


export function transformwithTime(value: string): Date {
  let reggie = /(\d{2})\/(\d{2})\/(\d{4})\s(\d{2}):(\d{2})/;
  let dateArray = reggie.exec(value);
  let dateObject = new Date(
    (+dateArray[3]),
    ((+dateArray[2])) - 1, // month starts at 0!
    (+dateArray[1]),
    (+dateArray[4]),
    (+dateArray[5]));
  return dateObject;
}

export function maxValue(max: Number): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } => {
    const input = control.value,
      isValid = input > max;
    if (isValid && input)
      return {'maxValue': {max}}
    else
      return null;
  };
}

export function minValue(min: Number): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } => {
    const input = control.value,
      isValid = input < min;
    if (isValid && input)
      return {'minValue': {min}}
    else
      return null;
  };
}

//Defining the function to trim the value before validating the pattern
export function formValidatePattern(pattern: string): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } => {
    let input = control.value;
    let pattern_regex = new RegExp(pattern);
    /*let  emoji_ranges = [
      '\ud83c[\udf00-\udfff]', // U+1F300 to U+1F3FF
      '\ud83d[\udc00-\ude4f]', // U+1F400 to U+1F64F
      '\ud83d[\ude80-\udeff]'  // U+1F680 to U+1F6FF
    ];
    let emoji_range = new RegExp(emoji_ranges.join('|'));*/
    if (input) {
      input = input.trim();
      if (input != '') {
        if (pattern.length > 0) {
          if (pattern_regex.test(input))
            return {'validPattern': {input}}
          else
            return null;
        }
      }
      else
        return {'validPattern': {input}}
    } else
      return null;
  };
}

//Defining the function to trim the value before validating the pattern
export function validatePattern(pattern: any, model: string) {
  let pattern_regex = new RegExp(pattern);
  let input = "";
  if (model) {
    input = model.trim();
  }
  if (input != '') {
    if (pattern_regex.test(input))
      return null;
    else
      return input;
  }
  else
    return null;
}

function testEmoji(val): any {
  let currentVal = val;
  let ranges = [
    '\ud83c[\udf00-\udfff]', // U+1F300 to U+1F3FF
    '\ud83d[\udc00-\ude4f]', // U+1F400 to U+1F64F
    '\ud83d[\ude80-\udeff]'  // U+1F680 to U+1F6FF
  ];
  // val=val.replace(/[\uE000-\uF8FF]/g, '');
  // val.replace(/([\uE000-\uF8FF]|\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDDFF])/g, '')
  if (val.test(/([\uE000-\uF8FF]|\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDDFF])/g, '') || val.test(/[^\x00-\xFFFF]/g, "")) {
    return true;
  } else {
    return false;
  }

  /*return val;*/
  // return val.replace(/([\uE000-\uF8FF]|\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDDFF])/g, '');
}

//Defining the function to trim the model
export function trimModel(model: any) {
  Array.from(Object.keys(model), (key: string, index: number) => {
    if (typeof(model[key]) == "string") {
      if ((model[key]) != '') {
        if ((model[key]).startsWith(' ') || (model[key]).startsWith(' ')) {
          (model[key]) = (model[key]).trim();
        }
      }
    }
  });
}


