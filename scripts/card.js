'use strict';
/* manages data on card, e.g. title, picture, likes, delete icons */

class Card {

    constructor(cardData, functions, myData) {
        this.api = cardData.api;
        this.name = cardData.card.name;
        this.link = cardData.card.link;
        this.likes = cardData.card.likes; //this is an array
        this.id = cardData.card._id;
        this.myId = myData.myId;
        this.ownerId = cardData.card.owner._id;
        this.template = cardData.template;
        this.container = cardData.container;
        this.image = this.container.querySelector('.popup__image');
        this.card = this.template.content.cloneNode(true);
        this.cardImage = this.card.querySelector('.place-card__image');
        this.cardName = this.card.querySelector('.place-card__name');
        this.deleteIcon = this.card.querySelector('.place-card__delete-icon');
        this.likedCounter = this.card.querySelector('.place-card__likes');
        this.picturePopup = functions.popup({ element: document.getElementById('picture'), });
    }

    create() {
        if (this.ownerId === this.myId) {
            this.card.querySelector('.place-card').classList.add('place-card__my-card');     //show trashbin icons on cards I created
        }
        this.likes.forEach((like) => {
            if (Object.values(like).includes(this.myId)) {
                this.card.querySelector('.place-card__like-icon').classList.add('place-card__like-icon_liked'); //show active like icons on cards I liked
            }
        })

        this.cardName.textContent = this.name;
        this.cardImage.style.backgroundImage = `url(${this.link})`;
        this.likedCounter.textContent = this.likes.length;
        this.card.querySelector('.place-card__like-icon').addEventListener('click', this.like.bind(this));
        this.card.querySelector('.place-card__delete-icon').addEventListener('click', this.remove.bind(this));
        this.card.querySelector('.place-card__image').addEventListener('click', (event) => {
            if (event.target !== this.deleteIcon) {
                this.openPic();
            }
        });
    }

    like(event) {
        event.target.style.outline = 'none';

        const findMyLike = (obj) => {
            if (obj._id === this.myId) {
                return true;
            }
        }

        if (!event.target.classList.contains('place-card__like-icon_liked')) {
            event.target.classList.add('place-card__like-icon_liked');
            event.target.firstChild.textContent++;
            this.likes.push(1);
            console.log(this.likes);
            this.api.renderLikes(this.id, this.likes);
        } else {
            event.target.classList.remove('place-card__like-icon_liked');
            event.target.firstChild.textContent--;
            const myLikeIndex = this.likes.findIndex(findMyLike);
            this.likes.splice(myLikeIndex, 1);
            this.api.unlikeCard(this.id);
        }
    }

    remove(event) {
        if (window.confirm('Вы уверены, что хотите удалить свою замечательную карточку?')) {
            this.api.deleteCard(this.id);
            event.target.closest('.place-card').remove();
        }
    }

    openPic() {
        this.picturePopup.open();
        const cardImageUrl = this.cardImage.style.backgroundImage.slice(4, -1).replace(/"/g, "");
        this.image.setAttribute('src', `${cardImageUrl}`);                      //pass the imape url to popup
    }
}
