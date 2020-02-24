'use strict';
/* encompasses all asynchronous server requests */

class Api {

    constructor(config) {
        this.cohortId = config.cohortId;
        this.serverUrl = config.serverUrl;
        this.authToken = config.authToken;
    }

    getUserInfo() {
        return fetch((this.serverUrl + this.cohortId + '/users/me'), {
            method: 'GET',
            headers: {
                'authorization': this.authToken,
            },
        })
        .then( (res) => {
            if (res.ok) {
                return res.json();
            } else {
                return Promise.reject;
            }
        })
        .catch((err) => console.log('Could not get user info: ' + err));
    }

    getCards() {
        return fetch((this.serverUrl + this.cohortId + '/cards'), {
            method: 'GET',
            headers: {
                'authorization': this.authToken,
            }
        })
        .then( (res) => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject('Could not get cards: ' + res.status);
        });
    }
    

    loadingButtonText(loadingData, submitButton, originalButtonText) {   // accepts boolean, DOM element, string
        if (loadingData) {
            submitButton.textContent = 'Загрузка...';
            submitButton.style.color = 'greenyellow';
        } else {
            submitButton.textContent = originalButtonText;
            submitButton.style.color = 'white';
        }
    }


    updateForm(name, info) {
        return fetch((this.serverUrl + this.cohortId + '/users/me'), {
            method: 'PATCH',
            headers: {
                'authorization': this.authToken,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                about: info,
            }),
        })
            .then((res) => {
                if (res.ok) {
                    return res.json()   ;
                } else {
                    return Promise.reject;
                }
            })
            .catch( (err) => console.log('Cannot get user info, error: ' + err) );
    }

    postCardToServer(name, link) {
        return fetch((this.serverUrl + this.cohortId + '/cards'), {
            method: 'POST',
            headers: {
                'authorization': this.authToken,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: name,
                link: link,
            }),
        })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                } else {
                    return Promise.reject;
                }
            })
            .catch((err) => console.log('Could not post card. Reason: ' + err));
    }

    deleteCard(id) {
        return fetch((this.serverUrl + this.cohortId + '/cards/' + id), {
            method: 'DELETE',
            headers: {
                'authorization': this.authToken,
                'Content-Type': 'application/json',
            }
        })
            .then((resp) => {
                if (resp.ok) {
                    return resp.json();
                } else {
                    return Promise.reject;
                }
            })
            .catch((err) => console.log('Could not delete card. Reason: ' + err));
    }

    renderLikes(id, likes) {
        return fetch((this.serverUrl + this.cohortId + '/cards/like/' + id), {
            method: 'PUT',
            headers: {
                'authorization': this.authToken,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                likes: likes,
            }),
        })
            .then((resp) => {
                if (resp.ok) {
                    return resp.json();
                } else {
                    return Promise.reject;
                }
            })
            .catch((err) => console.log('Could not render likes. Reason: ' + err));
    }
    
    unlikeCard(id) {
        return fetch((this.serverUrl + this.cohortId + '/cards/like/' + id), {
          method: 'DELETE',
          headers: {
            authorization: this.authToken,
            'Content-Type': 'application/json'
          }
        })
    }

    changeAvatar(avatarUrl) {
        return fetch((this.serverUrl + this.cohortId + '/users/me/avatar'), {
            method: 'PATCH',
            headers: {
                'authorization': this.authToken,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                avatar: avatarUrl,
            }),
        })
            .then((resp) => {
                if (resp.ok) {
                    return resp.json();
                } else {
                    return Promise.reject;
                }
            })
            .catch((err) => console.log('Could not change avatar. Reason: ' + err));
    }
}

