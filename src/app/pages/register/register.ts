import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  imports: [FormsModule, CommonModule ],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {
  formSubmitted = false;

  onSubmit(form: NgForm): void {
    if (form.valid) {
      console.log('Datos del formulario:', form.value);
      this.formSubmitted = true;
      form.resetForm();
    } else {
      this.scrollToFirstInvalidControl(form);
    }
  }

  private scrollToFirstInvalidControl(form: NgForm): void {
    const invalidControlName = Object.keys(form.controls).find(key => form.controls[key].invalid);
    if (invalidControlName) {
      const element = document.querySelector(`[name="${invalidControlName}"]`);
      if (element) {
        (element as HTMLElement).scrollIntoView({ behavior: 'smooth', block: 'center' });
        (element as HTMLElement).focus();
      }
    }
  }
}
