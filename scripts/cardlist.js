'use strict';
/* manages all cards on the main page */

class CardList {

    constructor(listData, functions, myData) {
        this.template = listData.template;
        this.container = listData.container;
        this.api = listData.api;
        this.myData = myData;
        this.getCards = this.api.getCards;
        this.button = document.forms.new.querySelector('.popup__button');
        this.buttonText = this.button.textContent;
        this.form = document.forms.new;
        this.newCard = functions.newCard;
        this.functions = functions;
    }

    render() {
        this.api.getCards()
        .then( (res) => res.forEach(function (cardItem) {
            const cardParams = {
                card: cardItem,
                template: this.template,
                api: this.api,
                container: document.getElementById('picture'),
            };
            const anotherCard = this.newCard(cardParams, this.functions, this.myData);
            anotherCard.create();   
            this.container.appendChild(anotherCard.card);                               
        }.bind(this)))
        .catch( (err) => console.log('Failed to render cards. Reason: ' + err) );
    }

    addCard(event) {
        event.preventDefault();
        this.api.loadingButtonText(true, this.button, this.buttonText);
        const cardParams = {
            card: {name: this.form.name.value,
                    link: this.form.link.value,
                    likes: [], 
                    owner: {id: ''}
                },
            template: this.template,
            api: this.api,
            container: this.container,
                            };
        const customCard = this.newCard(cardParams, this.functions, this.myData);
        customCard.create();
        this.api.postCardToServer(customCard.name, customCard.link)     
        .then( () => this.render())
        .finally( () => this.api.loadingButtonText(false, this.button, this.buttonText));
    }
}
