import {Injectable} from "@angular/core";
import {AbstractControl} from "@angular/forms";

@Injectable()
export class ValidationService {
  static stringValidate(control: AbstractControl) {
    return ValidationService.validateMaster(/^[a-z0-9A-Z ]*$/, control.value);
  }

  static numberValidate(control: AbstractControl) {
    return ValidationService.validateMaster(/^[0-9]*$/, control.value);
  }

  static licensePlateNoValidate(control: AbstractControl) {
    return ValidationService.validateMaster(/^([a-zA-Z0-9])([a-zA-Z0-9- \/])*$/i, control.value);
  }

  static containerNumberValidate(control: AbstractControl) {
    return ValidationService.validateMaster(  /^([A-Z]{4})([0-9]{6,7})*$/, control.value);
  }

  static validateMaster(pattern: any, input: string) {
    if(input!=null && input.length>0)
    {
      let pattern_regex = new RegExp(pattern);
      if (pattern_regex.test(input)) {
        return null;
      } else {
        return {'String_Invalid': true};
      }
    }
    else
    {
      return null;
    }

  }
}
