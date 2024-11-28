// Aggiungi le stelle al modulo di recensione
const stars = document.querySelectorAll('.star');
let selectedRating = 0;

// Gestione del click sulle stelle
stars.forEach(star => {
    star.addEventListener('click', () => {
        selectedRating = parseInt(star.getAttribute('data-value'));
        updateStars();
    });

    // Hover per evidenziare le stelle
    star.addEventListener('mouseover', () => {
        updateStars(parseInt(star.getAttribute('data-value')));
    });

    // Rimuovi l'evidenziazione quando il mouse esce
    star.addEventListener('mouseout', () => {
        updateStars();
    });
});

// Funzione per aggiornare lo stato delle stelle
function updateStars(rating = selectedRating) {
    stars.forEach(star => {
        const starValue = parseInt(star.getAttribute('data-value'));
        if (starValue <= rating) {
            star.classList.add('selected');
        } else {
            star.classList.remove('selected');
        }
    });
}

// Gestione del form
const reviewForm = document.getElementById('reviewForm');
const reviewsList = document.getElementById('reviewsList');

reviewForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const reviewText = document.getElementById('review').value;

    if (name && reviewText && selectedRating > 0) {
        // Aggiungi la recensione alla lista
        const newReview = document.createElement('li');
        newReview.innerHTML = `
            <strong>${name}</strong> - ${getRatingStars(selectedRating)}
            <p>${reviewText}</p>
        `;
        reviewsList.appendChild(newReview);

        // Resetta il modulo
        reviewForm.reset();
        updateStars(0);  // Resetta la valutazione delle stelle
    } else {
        alert('Per favore, compila tutti i campi e assegna una valutazione.');
    }
});

// Funzione per visualizzare le stelle nella recensione
function getRatingStars(rating) {
    let starsHtml = '';
    for (let i = 1; i <= 5; i++) {
        starsHtml += i <= rating ? '&#9733;' : '&#9734;';
    }
    return starsHtml;
}
