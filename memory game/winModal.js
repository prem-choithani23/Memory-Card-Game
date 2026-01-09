export function showWinModal(tries) {
    const modal = document.createElement("div");
    modal.className = "modal-overlay";

    modal.innerHTML = `
        <div class="modal">
            <h1>🎉 YOU WIN!</h1>
            <p>Tries: <strong>${tries}</strong></p>
            <button id="playAgain">Play Again</button>
        </div>
    `;

    document.body.appendChild(modal);

    document
        .getElementById("playAgain")
        .addEventListener("click", () => location.reload());
}
