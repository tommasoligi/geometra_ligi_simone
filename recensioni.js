// Funzione per generare le stelle in base alla valutazione
function generateStarRating(rating) {
    const starContainer = document.createElement('div');
    starContainer.classList.add('star-rating'); // Container per le stelle

    for (let i = 1; i <= 5; i++) {
        const star = document.createElement('span');
        star.classList.add('star'); // Classe per ogni stella

        // Se la valutazione è maggiore o uguale al valore della stella, la stella è piena
        if (i <= rating) {
            star.classList.add('full');
        } else {
            star.classList.add('empty');
        }

        star.innerHTML = '&#9733;'; // Il carattere della stella
        starContainer.appendChild(star); // Aggiungi la stella al container
    }

    return starContainer; // Restituisce il container con le stelle
}

// Gestione del form di recensione
const reviewForm = document.getElementById('reviewForm');
const reviewsList = document.getElementById('reviewsList');

reviewForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const reviewText = document.getElementById('review').value;

    // Crea l'elemento della recensione
    const reviewItem = document.createElement('li');
    reviewItem.classList.add('review-item');

    // Crea le stelle per la recensione
    const starRating = generateStarRating(ratingValue);

    // Inserisce il nome, la valutazione e il testo della recensione
    reviewItem.innerHTML = `
        <strong>${name}</strong><br>
        <div class="review-stars"></div> <!-- Stelle visibili sotto il nome -->
        <p>${reviewText}</p>
    `;
    reviewItem.querySelector('.review-stars').appendChild(starRating); // Aggiungi le stelle

    // Aggiungi la recensione alla lista
    reviewsList.appendChild(reviewItem);

    // Resetta il form
    reviewForm.reset();
    ratingValue = 0;
    updateStars(); // Reset delle stelle nel form
});
