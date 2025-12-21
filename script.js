document.addEventListener('DOMContentLoaded', () => {
    // Intersection Observer for scroll animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.fade-in, .fade-in-up, .fade-in-left, .fade-in-right');
    animatedElements.forEach(el => observer.observe(el));

    // Smooth Scroll for anchor links (polyfill for older browsers if needed, but CSS handles most)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Theme Toggle
    const themeBtn = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;

    // Check local storage
    if (localStorage.getItem('theme') === 'light') {
        htmlElement.setAttribute('data-theme', 'light');
    }

    if (themeBtn) {
        themeBtn.addEventListener('click', () => {
            const currentTheme = htmlElement.getAttribute('data-theme');
            if (currentTheme === 'light') {
                htmlElement.removeAttribute('data-theme');
                localStorage.setItem('theme', 'dark');
            } else {
                htmlElement.setAttribute('data-theme', 'light');
                localStorage.setItem('theme', 'light');
            }
        });
    }

    // Lead Form Handling
    const leadForm = document.getElementById('lead-form');
    if (leadForm) {
        leadForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const btn = leadForm.querySelector('button');
            const originalText = btn.textContent;

            // Basic Validation
            const email = leadForm.querySelector('#email').value;
            const phone = leadForm.querySelector('#phone').value;

            if (email && !email.includes('@')) {
                alert('Please enter a valid email address.');
                return;
            }

            // Simulate loading state
            btn.textContent = 'Processing...';
            btn.style.opacity = '0.7';

            setTimeout(() => {
                // Success State
                leadForm.innerHTML = `
                    <div style="text-align: center; color: var(--color-white);">
                        <div style="font-size: 3rem; margin-bottom: 1rem;">✨</div>
                        <h3 style="margin-bottom: 0.5rem; color: var(--color-accent);">Welcome to the Inner Circle!</h3>
                        <p style="color: var(--color-text-muted);">Please check your inbox for your first strategic memo.</p>
                    </div>
                `;
            }, 1500);
        });
    }
});

