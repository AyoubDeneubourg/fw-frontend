import { AbstractControl, ValidationErrors } from "@angular/forms";

export function isGreather(
    matchTo: string // name of the control to match to
): (AbstractControl) => ValidationErrors | null {
    return (control: AbstractControl): ValidationErrors | null => {

        return control.value && control.parent.controls[matchTo].value
            ? parseInt(control.parent?.controls[matchTo]?.value) < parseInt(control?.value) ? null
                : { isGreather: false } : null;
    };

}