export function startCelebration() {
    const confettiCount = 120;

    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement("div");
        confetti.className = "confetti";

        confetti.style.left = Math.random() * 100 + "vw";
        confetti.style.animationDuration = 2 + Math.random() * 3 + "s";
        confetti.style.backgroundColor = randomColor();

        document.body.appendChild(confetti);

        setTimeout(() => confetti.remove(), 5000);
    }
}

function randomColor() {
    const colors = ["#ff0", "#f00", "#0f0", "#0ff", "#f0f", "#ffa500"];
    return colors[Math.floor(Math.random() * colors.length)];
}
