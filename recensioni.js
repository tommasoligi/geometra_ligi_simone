// Funzione per gestire il click sulle stelle e aggiornare la valutazione
document.addEventListener('DOMContentLoaded', () => {
    const stars = document.querySelectorAll('.star');
    const ratingInput = document.createElement('input');
    ratingInput.type = 'hidden';
    ratingInput.id = 'ratingValue';
    document.getElementById('reviewForm').appendChild(ratingInput);

    stars.forEach(star => {
        star.addEventListener('click', () => {
            const ratingValue = star.getAttribute('data-value');
            ratingInput.value = ratingValue;

            // Evidenzia le stelle selezionate
            stars.forEach(s => s.classList.remove('selected'));
            for (let i = 0; i < ratingValue; i++) {
                stars[i].classList.add('selected');
            }
        });
    });

    // Gestione invio del form
    const form = document.getElementById('reviewForm');
    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const name = document.getElementById('name').value;
        const review = document.getElementById('review').value;
        const rating = document.getElementById('ratingValue').value;

        if (name && review && rating) {
            addReview(name, review, rating);
            form.reset();
            resetStars();
        } else {
            alert('Compila tutti i campi');
        }
    });

    // Funzione per aggiungere una recensione alla lista
    function addReview(name, review, rating) {
        const reviewsList = document.getElementById('reviewsList');
        const reviewItem = document.createElement('li');
        reviewItem.classList.add('review-item');

        reviewItem.innerHTML = `
            <p><strong>${name}</strong> - ${'★'.repeat(rating)}${'☆'.repeat(5 - rating)}</p>
            <p>${review}</p>
        `;

        reviewsList.appendChild(reviewItem);
    }

    // Reset delle stelle dopo l'invio
    function resetStars() {
        const stars = document.querySelectorAll('.star');
        stars.forEach(star => star.classList.remove('selected'));
    }
});
