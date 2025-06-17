import { Component } from '@angular/core';
import { NgForm, FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact',
  imports: [FormsModule],
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

}
