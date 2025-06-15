import { Component } from '@angular/core';
import { NgForm, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contact',
  imports: [FormsModule, CommonModule],
  templateUrl: './contact.html',
  styleUrl: './contact.css'
})
export class Contact {
  formSubmitted = false;
  formAttempted = false;
  captchaChecked = false;

  onSubmit(form: NgForm): void {
    this.formAttempted = true;

    if (form.valid && this.captchaChecked) {
      const formData = form.value;
      console.log('Formulario enviado:', formData);

      this.formSubmitted = true;
      form.resetForm();
      this.captchaChecked = false;
      this.formAttempted = false;
    } else {
      this.scrollToFirstInvalidControl(form);
    }
  }

  private scrollToFirstInvalidControl(form: NgForm): void {
    const invalidControl = Object.keys(form.controls).find(key => form.controls[key].invalid);
    if (invalidControl) {
      const element = document.querySelector(`[name="${invalidControl}"]`);
      if (element) {
        (element as HTMLElement).scrollIntoView({ behavior: 'smooth', block: 'center' });
        (element as HTMLElement).focus();
      }
    } else if (!this.captchaChecked) {
      const captchaElement = document.querySelector('.captcha');
      if (captchaElement) {
        (captchaElement as HTMLElement).scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }
}
