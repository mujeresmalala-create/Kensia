document.addEventListener('DOMContentLoaded', () => {
    // Menú móvil
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    const menuIcon = menuToggle?.querySelector('i');

    if (menuToggle && mainNav && menuIcon) {
        menuToggle.addEventListener('click', () => {
            const isOpen = mainNav.classList.toggle('active');
            menuIcon.classList.toggle('ph-list', !isOpen);
            menuIcon.classList.toggle('ph-x', isOpen);
            menuToggle.setAttribute('aria-expanded', String(isOpen));
        });

        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                mainNav.classList.remove('active');
                menuIcon.classList.replace('ph-x', 'ph-list');
                menuToggle.setAttribute('aria-expanded', 'false');
            });
        });
    }

    // Fondo del encabezado al desplazarse
    const header = document.querySelector('.header');
    const updateHeader = () => header?.classList.toggle('scrolled', window.scrollY > 50);
    updateHeader();
    window.addEventListener('scroll', updateHeader, { passive: true });

    // Animaciones de aparición
    if ('IntersectionObserver' in window) {
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { root: null, rootMargin: '0px', threshold: 0.15 });
        document.querySelectorAll('.fade-in-up, .fade-in-left').forEach(el => revealObserver.observe(el));
    } else {
        document.querySelectorAll('.fade-in-up, .fade-in-left').forEach(el => el.classList.add('is-visible'));
    }

    // Carrusel fotográfico de portada
    const slides = [...document.querySelectorAll('.hero-slide')];
    const dots = [...document.querySelectorAll('.carousel-dot')];
    const previous = document.querySelector('.carousel-prev');
    const next = document.querySelector('.carousel-next');
    const carousel = document.querySelector('.hero-carousel');
    if (!slides.length) return;

    let current = 0;
    let timer;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const showSlide = (index) => {
        current = (index + slides.length) % slides.length;
        slides.forEach((slide, i) => slide.classList.toggle('is-active', i === current));
        dots.forEach((dot, i) => {
            const active = i === current;
            dot.classList.toggle('is-active', active);
            dot.setAttribute('aria-pressed', String(active));
        });
    };
    const stopAutoplay = () => window.clearInterval(timer);
    const startAutoplay = () => {
        stopAutoplay();
        if (!reducedMotion && !document.hidden) timer = window.setInterval(() => showSlide(current + 1), 5000);
    };

    previous?.addEventListener('click', () => { showSlide(current - 1); startAutoplay(); });
    next?.addEventListener('click', () => { showSlide(current + 1); startAutoplay(); });
    dots.forEach((dot, i) => dot.addEventListener('click', () => { showSlide(i); startAutoplay(); }));
    carousel?.addEventListener('mouseenter', stopAutoplay);
    carousel?.addEventListener('mouseleave', startAutoplay);
    carousel?.addEventListener('focusin', stopAutoplay);
    carousel?.addEventListener('focusout', startAutoplay);
    document.addEventListener('visibilitychange', () => document.hidden ? stopAutoplay() : startAutoplay());
    showSlide(0);
    startAutoplay();
});
