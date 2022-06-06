import { AbstractControl, ValidationErrors } from "@angular/forms";

export function birthDate(
): (AbstractControl) => ValidationErrors | null {
    return (control: AbstractControl): ValidationErrors | null => {



        return control.value ? new Date() > new Date(control?.value)
            ? null
            : { birthdateIsAfter: false } : null;
    };
}