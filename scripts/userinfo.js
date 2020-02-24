'use strict';
/* encompasses info in the 'profile' div */

class UserInfo {

    constructor(userData) {
        this.api = userData.api;
        this.form = userData.form;
        this.nameField = this.form.name;
        this.infoField = this.form.info;
        this.button = this.form.querySelector('.popup__button');
        this.buttonText = this.button.textContent;
        this.name = document.querySelector('.user-info__name');
        this.info = document.querySelector('.user-info__job');
        this.avatar = document.querySelector('.user-info__photo');
    }

    setUserInfo(event) {
        event.preventDefault();
        this.name.textContent = this.nameField.value;
        this.info.textContent = this.infoField.value;
        this.updateUserInfo();
    }

    updateUserInfo() {
        this.api.loadingButtonText(true, this.button, this.buttonText);
        this.api.updateForm(this.name.textContent, this.info.textContent)
        .catch( (err) => console.log('Could not update user data. Reason: ' + err) )
        .then( () => this.api.getUserInfo())
        .finally( () => this.api.loadingButtonText(false, this.button, this.buttonText));        
    }

    updateAvatar(url) {
        this.avatar.style.backgroundImage = `url(${url})`;
        this.api.changeAvatar(url);  
    }

    loadUserInfo() {
        this.api.getUserInfo()
        .then( (res) => {
            this.avatar.style.backgroundImage = `url(${res.avatar})`;
            this.name.textContent = res.name;
            this.info.textContent = res.about;
        })
        .then( () => this.updateUserInfo() );
    }
}
