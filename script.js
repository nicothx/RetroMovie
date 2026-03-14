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

/* --- SCROLL LENT ET FLUIDE --- */
document.querySelectorAll('a[href*="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        // On vérifie que le lien pointe vers une section de la page actuelle
        if (this.hostname === window.location.hostname && this.pathname.replace(/^\//, '') === window.location.pathname.replace(/^\//, '')) {
            const targetId = this.hash.substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                e.preventDefault(); // Empêche le saut instantané

                // Calcul de la position (on enlève 80px pour ne pas que le header cache le titre)
                const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - 80; 
                const startPosition = window.scrollY;
                const distance = targetPosition - startPosition;
                
                // ⏱️ C'EST ICI QUE TU RÈGLES LA VITESSE !
                const duration = 1500; // 1500 millisecondes = 1.5 secondes
                let start = null;

                function animation(currentTime) {
                    if (start === null) start = currentTime;
                    const timeElapsed = currentTime - start;
                    const run = ease(timeElapsed, startPosition, distance, duration);
                    window.scrollTo(0, run);
                    if (timeElapsed < duration) requestAnimationFrame(animation);
                }

                // Fonction mathématique pour un effet de démarrage et d'arrêt en douceur (EaseInOut)
                function ease(t, b, c, d) {
                    t /= d / 2;
                    if (t < 1) return c / 2 * t * t + b;
                    t--;
                    return -c / 2 * (t * (t - 2) - 1) + b;
                }

                requestAnimationFrame(animation);
            }
        }
    });
});