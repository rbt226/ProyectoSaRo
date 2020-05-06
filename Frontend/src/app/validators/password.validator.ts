import { FormGroup } from '@angular/forms';

export function ConfirmedValidator(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[controlName];
        const matchingControl = formGroup.controls[matchingControlName];
        if (matchingControl.errors && !matchingControl.errors.confirmedValidator) {
            return;
        }
        if (control.value !== matchingControl.value) {
            matchingControl.setErrors({ confirmedValidator: true });
        } else {
            matchingControl.setErrors(null);
        }
    };
}
export function DocumentValidator(docTypeName: string, docNumberName: string) {
    return (formGroup: FormGroup) => {
        const docType = formGroup.controls[docTypeName];
        const docNumber = formGroup.controls[docNumberName];
        if (docNumber.errors && !docNumber.errors.ci && !docNumber.errors.passport) {
            // si ya tengo un error que no sea del tipo que utilizo aca hgao un retorno temprano
            return;
        }
        if (docType.value === 'CI') {
            if (docNumber.value && !validate_ci(docNumber.value)) {
                docNumber.setErrors({ ci: true });
            } else {
                docNumber.setErrors(null);

            }
        } else {
            const regexp = new RegExp(/^(?!^0+$)[a-zA-Z0-9]{3,20}$/);
            if (!regexp.test(docNumber.value)) {
                docNumber.setErrors({ passport: true });
            } else {
                docNumber.setErrors(null);
            }
        }

    };
}

function validation_digit(ci) {
    let a = 0;
    let i = 0;
    if (ci.length <= 6) {
        for (i = ci.length; i < 7; i++) {
            ci = '0' + ci;
        }
    }
    for (i = 0; i < 7; i++) {
        a += (parseInt('2987634'[i]) * parseInt(ci[i])) % 10;
    }

    if (a % 10 === 0) {
        return 0;
    } else {
        return 10 - a % 10;
    }
}

function validate_ci(ci) {

    ci = clean_ci(ci);
    const dig = ci[ci.length - 1];
    ci = ci.replace(/[0-9]$/, '');
    return (dig === validation_digit(ci).toString());
}


function clean_ci(ci) {
    return ci.replace(/\D/g, '');
}
