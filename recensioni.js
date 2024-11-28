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
                name: name,
                text: reviewText,
                date: new Date().toLocaleDateString()
            };

            // Salva la recensione in localStorage
            saveReview(newReview);
            addReviewToPage(newReview);

            // Resetta il modulo
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
        reviewItem.innerHTML = `<strong>${review.name}</strong> (${review.date}):<br>${review.text}`;
        reviewsList.appendChild(reviewItem);
    }
});
