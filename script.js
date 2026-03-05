document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    const menuIcon = menuToggle.querySelector('i');

    menuToggle.addEventListener('click', () => {
        mainNav.classList.toggle('active');

        // Toggle icon between list and x
        if (mainNav.classList.contains('active')) {
            menuIcon.classList.replace('ph-list', 'ph-x');
        } else {
            menuIcon.classList.replace('ph-x', 'ph-list');
        }
    });

    // Close mobile menu on link click
    const navLinksList = document.querySelectorAll('.nav-link');
    navLinksList.forEach(link => {
        link.addEventListener('click', () => {
            mainNav.classList.remove('active');
            menuIcon.classList.replace('ph-x', 'ph-list');
        });
    });

    // Header Background on Scroll
    const header = document.querySelector('.header');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Scroll Reveal Animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15 // Fire when 15% of element is visible
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                // Optional: Stop observing once revealed
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements with animation classes
    const animatedElements = document.querySelectorAll('.fade-in-up, .fade-in-left');
    animatedElements.forEach(el => revealObserver.observe(el));
});
