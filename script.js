document.addEventListener('DOMContentLoaded', () => {
    // 1. Intersection Observer for scroll animations (Unchanged)
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

    // 2. Smooth Scroll for anchor links (Unchanged)
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

    // 3. Theme Toggle Logic (UPDATED for Light Default)
    const themeBtn = document.getElementById('theme-toggle') || document.querySelector('.theme-btn');
    const htmlElement = document.documentElement;
    const THEME_KEY = 'theme';

    // Function to actually switch the CSS
    function applyTheme(theme) {
        if (theme === 'dark') {
            // Add the attribute to trigger the Dark Theme CSS override
            htmlElement.setAttribute('data-theme', 'dark');
        } else {
            // Remove the attribute to fall back to the :root (Light Theme) default
            htmlElement.removeAttribute('data-theme');
        }
    }

    // Initialize: Check LocalStorage. 
    // If 'dark' is stored, turn it on. Otherwise, stay Light (default).
    const stored = localStorage.getItem(THEME_KEY);
    if (stored === 'dark') {
        applyTheme('dark');
    } else {
        applyTheme('light');
    }

    // Button Click Listener
    if (themeBtn) {
        themeBtn.addEventListener('click', () => {
            // Check if we are currently in dark mode
            const isDark = htmlElement.getAttribute('data-theme') === 'dark';

            // Swap to the opposite
            const next = isDark ? 'light' : 'dark';

            applyTheme(next);
            localStorage.setItem(THEME_KEY, next);
        });
    }

    // 4. Lead Form Handling (Updated colors)
    const leadForm = document.getElementById('lead-form');
    if (leadForm) {
        leadForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const btn = leadForm.querySelector('button');

            // Basic Validation
            const emailInput = leadForm.querySelector('input[type="email"]') || leadForm.querySelector('#email');
            if (emailInput && !emailInput.value.includes('@')) {
                alert('Please enter a valid email address.');
                return;
            }

            // Simulate loading state
            btn.textContent = 'Processing...';
            btn.style.opacity = '0.7';

            setTimeout(() => {
                // Success State
                // Note: Changed color to var(--color-text-main) so it is visible on white background
                leadForm.innerHTML = `
                    <div style="text-align: center; color: var(--color-text-main);">
                        <div style="font-size: 3rem; margin-bottom: 1rem;">✨</div>
                        <h3 style="margin-bottom: 0.5rem; color: var(--color-accent);">Welcome to the Inner Circle!</h3>
                        <p style="color: var(--color-text-muted);">Please check your inbox for your first strategic memo.</p>
                    </div>
                `;
            }, 1500);
        });
    }
});
