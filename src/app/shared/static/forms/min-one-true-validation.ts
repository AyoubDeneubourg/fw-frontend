import { AbstractControl, ValidationErrors } from "@angular/forms";

export function minOneChecked(
): (AbstractControl) => ValidationErrors | null {
    return (control: AbstractControl): ValidationErrors | null => {

        let checked = false;

        control['controls'].forEach(element => {
            if (element.value) checked = true;
        });

        return !!control.parent &&
            !!control.parent.value &&
            checked
            ? null
            : { minOneChecked: false };
    };
}