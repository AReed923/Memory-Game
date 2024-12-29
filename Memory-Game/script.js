document.addEventListener('DOMContentLoaded', () => {
    const gameBoard = document.getElementById("game-board");
    const resetButton = document.getElementById("reset");
    let cards = [];
    let flippedCards = [];
    let matchedCards = [];

    // Create an array with image paths
    const cardImages = [
        'images/card1.png', 'images/card1.png',
        'images/card2.png', 'images/card2.png',
        'images/card3.png', 'images/card3.png',
        'images/card4.png', 'images/card4.png',
        'images/card5.png', 'images/card5.png',
        'images/card6.png', 'images/card6.png',
        'images/card7.png', 'images/card7.png',
        'images/card8.png', 'images/card8.png'
    ];

    // Shuffle the array to randomize the images
    function shuffleArray(array) {
        return array.sort(() => Math.random() - 0.5);
    }

    // Generate cards with the images
    function generateCards() {
        const shuffledImages = shuffleArray([...cardImages]);

        // Empty the game board before adding new cards
        gameBoard.innerHTML = "";

        shuffledImages.forEach((image) => {
            const card = document.createElement("div");
            card.classList.add("card");

            const front = document.createElement("div");
            front.classList.add("card-front");
            front.textContent = "";

            const back = document.createElement("div");
            back.classList.add("card-back");
            back.style.backgroundImage = `url(${image})`;

            card.appendChild(front);
            card.appendChild(back);
            gameBoard.appendChild(card);
            cards.push(card);
        });
    }

    // Flip a card
    function flipCard(card) {
        if (flippedCards.length < 2 && !card.classList.contains("flipped") && !matchedCards.includes(card)) {
            card.classList.add("flipped");
            flippedCards.push(card);

            if (flippedCards.length === 2) {
                checkForMatch();
            }
        }
    }

    // Check if two flipped cards match
    function checkForMatch() {
        const [card1, card2] = flippedCards;
        const img1 = card1.querySelector('.card-back').style.backgroundImage;
        const img2 = card2.querySelector('.card-back').style.backgroundImage;

        if (img1 === img2) {
            matchedCards.push(card1, card2);
            flippedCards = [];
            if (matchedCards.length === cards.length) {
                alert("You win!");
            }
        } else {
            setTimeout(() => {
                card1.classList.remove("flipped");
                card2.classList.remove("flipped");
                flippedCards = [];
            }, 1000);
        }
    }

    // Reset the game
    function resetGame() {
        cards = [];
        flippedCards = [];
        matchedCards = [];
        generateCards();
    }

    // Set up event listeners
    gameBoard.addEventListener("click", (e) => {
        if (e.target.classList.contains("card")) {
            flipCard(e.target);
        }
    });

    resetButton.addEventListener("click", resetGame);

    // Initialize the game
    generateCards();
});