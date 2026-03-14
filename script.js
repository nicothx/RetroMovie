document.addEventListener('DOMContentLoaded', function () {
    const sections = document.querySelectorAll('section');

    const options = {
        threshold: 0.15 // Déclenche l'animation quand 15% de la section est visible
    };

    const observer = new IntersectionObserver(function (entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optionnel : on peut arrêter d'observer la section une fois qu'elle est apparue
                // observer.unobserve(entry.target); 
            }
        });
    }, options);

    sections.forEach(section => {
        observer.observe(section);
    });
});

/* script.js */
function toggleMenu() {
    const navLinks = document.getElementById('nav-links');
    const burgerMenu = document.querySelector('.menu-burger');
    
    // Ajoute ou enlève la classe 'active' pour afficher/masquer le menu
    navLinks.classList.toggle('active');
    // Ajoute ou enlève la classe 'active' pour animer le bouton burger
    burgerMenu.classList.toggle('active');
}