'use strict';
/* encompasses all popups: containing forms or just a large verdion of picture from card */

class Popup {

    constructor(popupData) {
        this.popupElement = popupData.element;
        this.closeButton = this.popupElement.querySelector('.popup__close');
        this.pictureElement = document.getElementById('picture');
        this.removeImage = () => {
            if (this.popupElement === this.pictureElement) {
                this.popupElement.querySelector('.popup__image').removeAttribute('src');
            }
        }
    }

    open() {
        this.popupElement.classList.add('popup_is-opened');
        this.popupElement.addEventListener('click', this.close.bind(this));
        document.addEventListener('keydown', this.close.bind(this));
    }

    close(event) {
        const self = this;
        const closeHandler = () => {
            this.popupElement.classList.remove('popup_is-opened');
            this.removeImage.bind(this);
            this.popupElement.removeEventListener('click', this.close);
            document.removeEventListener('keydown', this.close);
        }
        if (event.type === 'keydown' && event.key === 'Escape') {                                       //handles closing popup by clicking Esc
            closeHandler();
        } else if (event.type === 'click') {
            if (event.target.closest('.popup__content') === null || event.target === self.closeButton) { //handles clicks outside of popup area
                closeHandler();
            }
        } else if (event.type === 'submit') {
            closeHandler();
        }
    } 
}   
 
class Form extends Popup {

    constructor(formData, functions) {
        super(formData);
        this.popupElement = formData.element;
        this.validity = formData.validator;
        this.container = formData.list;
        this.api = formData.api;
        this.form = this.popupElement.querySelector('.popup__form');
        this.submitButton = this.form.querySelector('.popup__button');
        this.userInfo = functions.userInfo({form: this.form, api: this.api,});
        this.checkInput = (event) => this.validity.checkInputValidity(event);
        this.setButton = () => this.validity.setSubmitButtonState();
        this.handlers = {
            checkInput: this.checkInput.bind(this),
            setButton: this.setButton.bind(this),
            addCardOrInfo: this.addCardOrInfo,
        };
    }

    open() {
        super.open();
        this.formReset();
        this.formInitialize();
    }

    close(event) {
        super.close(event);
        if (event.target.closest('.popup__content') === null || event.target === this.closeButton) {
            this.formReset();
        }
        this.form.removeEventListener('input', this.checkInput);
        this.form.removeEventListener('keyup', this.setButton);
        this.form.removeEventListener('submit', this.handlers.addCardOrInfo);
    }

    formReset() {
        this.form.reset();
        this.submitButton.setAttribute('disabled', '');
        Array.from(this.form.querySelectorAll('.popup__input-error')).forEach( (element) =>
            element.textContent = '');
    }

    formInitialize() {
        if (this.form === document.forms.editinfo) {
            const userName = document.querySelector('.user-info__name');
            const userJob = document.querySelector('.user-info__job');
            this.form.name.value = userName.textContent;                    //setting default values 
            this.form.info.value = userJob.textContent;                     //of edit form input fields
            this.setButton();
        }
        this.form.addEventListener('input', this.handlers.checkInput);
        this.form.addEventListener('keyup', this.handlers.setButton);
        this.form.addEventListener('submit', this.handlers.addCardOrInfo.bind(this));
    }

    addCardOrInfo(event) {
        event.preventDefault();
        if (!this.submitButton.hasAttribute('disabled')) {
            if (this.form === document.forms.new) {
                console.log(this);
                this.container.addCard(event);
                this.close(event);
                this.submitButton.setAttribute('disabled', '');
            } else if (this.form === document.forms.editinfo) {
                this.userInfo.setUserInfo(event);
                this.close(event);
            }
        }
    }
}
