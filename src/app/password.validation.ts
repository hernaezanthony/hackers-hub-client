import {AbstractControl} from '@angular/forms';
export class PasswordValidation {

    static MatchPassword(AC: AbstractControl) {
       let password = AC.get('password').value; // to get value in input tag
       let passwordConfirm = AC.get('passwordConfirm').value; // to get value in input tag
        if(password != passwordConfirm) {
            //console.log('false');
            AC.get('passwordConfirm').setErrors( {MatchPassword: true} )
        } else {
            //console.log('true');
            return null
        }
    }
}