document.getElementById('reviewForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Evita il ricaricamento della pagina

    // Ottieni i valori dal modulo
    const name = document.getElementById('name').value;
    const review = document.getElementById('review').value;
    const rating = document.querySelector('input[name="rating"]:checked').value;

    // Crea un nuovo elemento di recensione
    const reviewItem = document.createElement('li');
    reviewItem.innerHTML = `
        <strong>${name}</strong> <span class="star-rating">${'★'.repeat(rating)}${'★'.repeat(5 - rating)}</span>
        <p>${review}</p>
    `;

    // Aggiungi la recensione alla lista
    document.getElementById('reviewsList').appendChild(reviewItem);

    // Reset del modulo dopo l'invio
    document.getElementById('reviewForm').reset();
});
