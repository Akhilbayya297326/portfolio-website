document.addEventListener('DOMContentLoaded', () => {
    
    /* ==========================================================================
       1. COMBINED SCROLL REVEAL ANIMATIONS
       Supports both .fade-in and .reveal classes. 
       Uses IntersectionObserver for peak performance (no scroll lag).
       ========================================================================== */
    const revealElements = document.querySelectorAll('.fade-in, .reveal');
    
    const observerOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add classes for both CSS sets we defined earlier
                entry.target.classList.add('appear', 'active');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    revealElements.forEach(el => observer.observe(el));

    /* ==========================================================================
       2. DYNAMIC NAVBAR (Glassmorphism effect)
       ========================================================================== */
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('shadow-lg');
            navbar.classList.replace('bg-darkBg/90', 'bg-darkBg/95');
        } else {
            navbar.classList.remove('shadow-lg');
            navbar.classList.replace('bg-darkBg/95', 'bg-darkBg/90');
        }
    });

    /* ==========================================================================
       3. DRAG-TO-SCROLL GALLERIES (Best for Mobile & Desktop)
       ========================================================================== */
    const sliders = document.querySelectorAll('.hide-scrollbar');
    let isDown = false;
    let startX;
    let scrollLeft;

    sliders.forEach(slider => {
        slider.addEventListener('mousedown', (e) => {
            isDown = true;
            slider.classList.add('cursor-grabbing');
            startX = e.pageX - slider.offsetLeft;
            scrollLeft = slider.scrollLeft;
        });
        slider.addEventListener('mouseleave', () => { isDown = false; });
        slider.addEventListener('mouseup', () => { 
            isDown = false; 
            slider.classList.remove('cursor-grabbing');
        });
        slider.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - slider.offsetLeft;
            const walk = (x - startX) * 2;
            slider.scrollLeft = scrollLeft - walk;
        });
    });

    /* ==========================================================================
       4. SMART SMOOTH SCROLLING (Multi-Page Aware)
       Ensures clicking #links doesn't break navigation between pages.
       ========================================================================== */
    document.querySelectorAll('a[href^="#"], a[href^="index.html#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const linkHref = this.getAttribute('href');
            const targetId = linkHref.replace('index.html', '');
            
            // Only perform smooth scroll if the target exists on the page
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                e.preventDefault();
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
            // If the target doesn't exist (e.g., trying to scroll from projects to home), 
            // the browser will naturally follow the link to the home page.
        });
    });
});