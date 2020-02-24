'use strict';
/* encompasses all validation methods used in forms */

class FormValidator {

  constructor(form) {
    this.button = form.querySelector('.popup__button');
    this.inputs = form.querySelectorAll('.popup__input');
    this.errorMessage = '';
    this.errorMessages = {
      length: 'Должно быть от 2 до 30 символов',
      required: 'Это обязательное поле',
      link: 'Здесь должна быть ссылка',
      noerror: '',
    };
  }

  checkInputValidity(event) {                                                             //validates data in forms
    const element = event.target;

    if ((element.validity.tooLong || element.validity.tooShort) && (element.type !== 'url')) {
      this.errorMessage = this.errorMessages.length;
      this.showErrorMessage(element);
    } else if (element.validity.typeMismatch) {
      this.errorMessage = this.errorMessages.link;
      this.showErrorMessage(element);
    } else if (element.validity.valueMissing) {
      this.errorMessage = this.errorMessages.required;
      this.showErrorMessage(element);
    } else {
      this.errorMessage = this.errorMessages.noerror;
      this.showErrorMessage(element);
    }
  }

  showErrorMessage(element) {
    element.nextElementSibling.textContent = this.errorMessage;                           //prints error messages
  }

  setSubmitButtonState() {
    const isFormValid = Array.from(this.inputs).every((input) => input.validity.valid);   //changes the state of submit button
    if (isFormValid) {
      this.button.removeAttribute('disabled');
    } else {
      this.button.setAttribute('disabled', '');
    }
  }

}
