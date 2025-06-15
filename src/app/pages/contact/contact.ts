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

  onSubmit(form: NgForm) {
    this.formAttempted = true;

    if (form.valid && this.captchaChecked) {
      this.formSubmitted = true;

      form.resetForm();
      this.captchaChecked = false;

      // Ocultar el mensaje después de unos segundos
      setTimeout(() => {
        this.formSubmitted = false;
        this.formAttempted = false;
      }, 5000);
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
