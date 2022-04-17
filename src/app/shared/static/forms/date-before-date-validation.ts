import { AbstractControl, ValidationErrors } from "@angular/forms";

export function dateBeforeDate(
    matchTo: string // name of the control to match to
): (AbstractControl) => ValidationErrors | null {
    return (control: AbstractControl): ValidationErrors | null => {

        console.log(new Date(control.parent?.controls[matchTo]?.value) < new Date(control?.value))
        console.log(new Date(control.parent?.controls[matchTo]?.value) === new Date(control?.value))
        console.log(control.parent?.controls[matchTo]?.value, control.value)
        return control.value && control.parent.controls[matchTo].value
            ? new Date(control.parent?.controls[matchTo]?.value) < new Date(control?.value) ||
                new Date(control.parent?.controls[matchTo]?.value).getTime() === new Date(control?.value).getTime()
                ? null
                : { dateIsBefore: false } : null;
    };

}