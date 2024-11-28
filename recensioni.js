document.addEventListener("DOMContentLoaded", () => {
    const reviewForm = document.getElementById("reviewForm");
    const reviewsList = document.getElementById("reviewsList");

    // Carica le recensioni salvate
    loadReviews();

    reviewForm.addEventListener("submit", (event) => {
        event.preventDefault();

        // Ottieni i valori del modulo
        const name = document.getElementById("name").value.trim();
        const reviewText = document.getElementById("review").value.trim();

        if (name && reviewText) {
            const newReview = {
                id: Date.now(),  // Genera un ID unico
                name: name,
                text: reviewText,
                date: new Date().toLocaleDateString()
            };

            saveReview(newReview);
            addReviewToPage(newReview);
            reviewForm.reset();
        }
    });

    function loadReviews() {
        const reviews = JSON.parse(localStorage.getItem("reviews")) || [];
        reviews.forEach(addReviewToPage);
    }

    function saveReview(review) {
        const reviews = JSON.parse(localStorage.getItem("reviews")) || [];
        reviews.push(review);
        localStorage.setItem("reviews", JSON.stringify(reviews));
    }

    function addReviewToPage(review) {
        const reviewItem = document.createElement("li");
        reviewItem.setAttribute("data-id", review.id);  // Aggiunge un attributo ID

        reviewItem.innerHTML = `
            <strong>${review.name}</strong> (${review.date}):<br>
            ${review.text}
            <button class="delete-btn">Elimina</button>
        `;

        reviewsList.appendChild(reviewItem);

        // Aggiungi l'evento di eliminazione al pulsante
        reviewItem.querySelector(".delete-btn").addEventListener("click", () => {
            deleteReview(review.id);
        });
    }

    function deleteReview(id) {
        let reviews = JSON.parse(localStorage.getItem("reviews")) || [];
        reviews = reviews.filter(review => review.id !== id);  // Rimuove la recensione selezionata

        localStorage.setItem("reviews", JSON.stringify(reviews));  // Aggiorna il localStorage

        // Rimuove la recensione dalla UI
        const reviewItem = document.querySelector(`li[data-id='${id}']`);
        reviewsList.removeChild(reviewItem);
    }
});
