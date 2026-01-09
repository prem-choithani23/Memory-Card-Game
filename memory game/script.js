//  get images from images.js
import { give_images } from "./images.js";

//  animation relted imports
import { flip, unflip } from "./animation.js";

// celebration related imprts
import { startCelebration } from "./celebration.js";
import { showWinModal } from "./winModal.js";

const PAIRS = 10;
const container = document.querySelector(".container");

let images = give_images();
let cards = [];
let firstCard = null;
let secondCard = null;
let lockBoard = false;
let tries = 0;
let pairsCompleted = 0;

/* creating cards + initlaization*/

function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

function createCards() {
    let selectedImages = shuffle(images).slice(0, PAIRS);
    let cardImages = shuffle([...selectedImages, ...selectedImages]);

    cardImages.forEach(src => {
        const card = document.createElement("div");
        card.className = "card";

        card.innerHTML = `
            <div class="card-inner">
                <div class="card-face card-front"></div>
                <div class="card-face card-back">
                    <img src="${src}" />
                </div>
            </div>
        `;

        card.addEventListener("click", () => handleClick(card, src));
        container.appendChild(card);

        cards.push({ card, src, matched: false });
    });
}

/* core logic */

function handleClick(card, src) {
    if (lockBoard || card === firstCard || card.classList.contains("matched"))
        return;

    flip(card);

    if (!firstCard) {
        firstCard = card;
        return;
    }

    secondCard = card;
    lockBoard = true;
    tries++;

    checkMatch(src);
}

function checkMatch(src) {
    const firstSrc = firstCard.querySelector("img").src;
    const secondSrc = secondCard.querySelector("img").src;

    if (firstSrc === secondSrc) {
        markMatched();
    } else {
        setTimeout(() => {
            unflip(firstCard, secondCard);
            resetTurn();
        }, 900);
    }
}

function markMatched() {
    firstCard.classList.add("matched");
    secondCard.classList.add("matched");
    pairsCompleted++;
    resetTurn();

    if (pairsCompleted === PAIRS) {
        startCelebration();
        showWinModal(tries);
    }   

}

function resetTurn() {
    [firstCard, secondCard] = [null, null];
    lockBoard = false;
}

/* render cards */

createCards();
