// Funzione per l'animazione di ScrollReveal
window.addEventListener('load', function() {
    // Animazione di scroll per rivelare gli elementi quando entrano nella visuale
    ScrollReveal().reveal('.hero h1', { delay: 300, duration: 1500, opacity: 0 });
    ScrollReveal().reveal('.services .col-md-4', { delay: 500, duration: 1500, distance: '50px', opacity: 0 });
    ScrollReveal().reveal('.about-section p', { delay: 500, duration: 1500, distance: '50px', opacity: 0 });
    ScrollReveal().reveal('.contact-info', { delay: 500, duration: 1500, distance: '50px', opacity: 0 });
});

// Form di Contatto: Validazione e invio dei dati tramite email
document.querySelector('.contact-form').addEventListener('submit', function(e) {
    e.preventDefault();  // Preveniamo il comportamento di submit di default

    let name = document.getElementById('name').value;
    let email = document.getElementById('email').value;
    let message = document.getElementById('message').value;

    // Validazione semplice dei campi
    if(name && email && message) {
        alert('Il tuo messaggio è stato inviato! Ti risponderemo al più presto.');
        // Qui potresti inserire una logica per inviare il form tramite un backend se necessario.
    } else {
        alert('Per favore compila tutti i campi del modulo.');
    }
});

// Gestione della navigazione sticky
let lastScrollTop = 0;
let navbar = document.querySelector('.sticky-header');

window.addEventListener('scroll', function() {
    let currentScroll = window.pageYOffset;
    if (currentScroll > lastScrollTop) {
        navbar.style.top = "-100px";  // Nascondi la navbar quando si scorre verso il basso
    } else {
        navbar.style.top = "0";  // Mostra la navbar quando si scorre verso l'alto
    }
    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
});

// Funzione per la mappa: Aggiunta di un marker su Google Maps (opzionale)
function initMap() {
    var mapOptions = {
        center: { lat: 43.917479, lng: 12.902877 },
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    
    var map = new google.maps.Map(document.getElementById('map'), mapOptions);
    
    var marker = new google.maps.Marker({
        position: { lat: 43.917479, lng: 12.902877 },
        map: map,
        title: "Studio Geometra Ligi Simone"
    });
}

function toggleMenu() {
    const navbarCollapse = document.querySelector('.navbar-collapse');
    navbarCollapse.classList.toggle('show');
}
