document.addEventListener('DOMContentLoaded', () => {
    
    // 1. SCROLL REVEAL ANIMATIONS
    const fadeElements = document.querySelectorAll('.fade-in');
    const appearOptions = { threshold: 0.15, rootMargin: "0px 0px -50px 0px" };

    const appearOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('appear');
                observer.unobserve(entry.target);
            }
        });
    }, appearOptions);

    fadeElements.forEach(fader => appearOnScroll.observe(fader));

    // 2. DYNAMIC NAVBAR
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('shadow-lg');
            navbar.classList.replace('bg-darkBg/80', 'bg-darkBg/95');
        } else {
            navbar.classList.remove('shadow-lg');
            navbar.classList.replace('bg-darkBg/95', 'bg-darkBg/80');
        }
    });

    // 3. DRAG-TO-SCROLL GALLERIES
    const sliders = document.querySelectorAll('.hide-scrollbar');
    let isDown = false;
    let startX;
    let scrollLeft;

    sliders.forEach(slider => {
        slider.addEventListener('mousedown', (e) => {
            isDown = true;
            slider.classList.add('active:cursor-grabbing');
            startX = e.pageX - slider.offsetLeft;
            scrollLeft = slider.scrollLeft;
        });
        slider.addEventListener('mouseleave', () => {
            isDown = false;
            slider.classList.remove('active:cursor-grabbing');
        });
        slider.addEventListener('mouseup', () => {
            isDown = false;
            slider.classList.remove('active:cursor-grabbing');
        });
        slider.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - slider.offsetLeft;
            const walk = (x - startX) * 2;
            slider.scrollLeft = scrollLeft - walk;
        });
    });

    // 4. SMART SMOOTH SCROLLING (Updated for Multi-Page)
    // Only applies smooth scroll if the link is for the CURRENT page
    document.querySelectorAll('a[href^="#"], a[href^="index.html#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            // Check if we are actually on index.html
            const isIndexPage = window.location.pathname.endsWith('index.html') || window.location.pathname === '/';
            const linkHref = this.getAttribute('href');
            
            if (linkHref.includes('index.html#') && !isIndexPage) {
                return; // Let standard browser navigation handle jumping back to the home page
            }

            e.preventDefault();
            const targetId = linkHref.replace('index.html', ''); // Clean it to just the #id
            
            if (targetId === '#' || targetId === '') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });
});