export function flip(card) {
    card.classList.add("flipped");
}

export function unflip(card1, card2) {
    card1.classList.remove("flipped");
    card2.classList.remove("flipped");
}
