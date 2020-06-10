const body = document.body;
const getById = id => document.getElementById(id);
const startGameButton = getById('button');

const difficultyLabels = [
    getById('label-simple'),
    getById('label-average'),
    getById('label-difficult'),
];

const difficultyMap = {
    'Простой': {
        'class':'simple-field',
        'cardCount': 3,
    },

    'Средний': {
        'class': 'average-field',
        'cardCount': 6,
    },

    'Сложный': {
        'class': 'difficult-field',
        'cardCount': 10,
    },
};

let difficulty = getById('simple').value;
let cardWasClicked = false;

difficultyLabels.forEach(difficultyButton => {
    difficultyButton.onclick = function() {
        difficultyLabels.forEach(difficultyButton => difficultyButton.classList.remove('level_active'));
        this.classList.add('level_active');
        difficulty = this.children[0].value;
    };
});

const createCards = (number, field) => {
    let randomCard = Math.floor(Math.random() * number);
    for (let i = 0; i < number; i++) {
        const cardWrapper = document.createElement('div');
        const cardBackside = document.createElement('div');
        const winnerCard = document.createElement('div');
        const looserCard = document.createElement('div');
        if (i === randomCard) {
            cardWrapper.className = 'card-wrap';
            cardWrapper.classList.add('card-wrap_hover');
            field.append(cardWrapper);
            cardBackside.className ='card-backside';
            cardWrapper.append(cardBackside);
            winnerCard.className = 'bug-card';
            cardWrapper.append(winnerCard);
        } else {
            cardWrapper.className = 'card-wrap';
            cardWrapper.classList.add('card-wrap_hover');
            field.append(cardWrapper);
            cardBackside.className ='card-backside';
            cardWrapper.append(cardBackside);
            looserCard.className = 'gameover-card';
            cardWrapper.append(looserCard);
        };
    };
};

startGameButton.addEventListener('click', () => {
    const levelMenu = getById('level-menu');
    const levelParams = difficultyMap[difficulty];
    const cardsField = document.createElement('div');
    cardsField.className = levelParams['class'];
    body.append(cardsField);

    createCards(levelParams['cardCount'], cardsField);

    levelMenu.style.display = 'none';

    document.querySelectorAll('.card-wrap').forEach(card => {
        card.addEventListener('click', () => {
            if (cardWasClicked) {
                cardsField.style.display = 'none';
                levelMenu.style.display = '';
                cardWasClicked = false;
            } else {
                card.classList.add('card-click');
                card.classList.remove('card-wrap_hover');
                cardWasClicked = true;
            };
        });
    });
});

