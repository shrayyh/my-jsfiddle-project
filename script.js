// scripts.js
document.addEventListener('DOMContentLoaded', () => {
    // Smooth scroll functionality
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            // Smooth scroll to section
            targetSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });

            // Update active class
            document.querySelectorAll('.page').forEach(page => {
                page.classList.remove('active');
            });
            targetSection.classList.add('active');
        });
    });

    // Infinite image track animation
    const track = document.querySelector('.image-track');
    if (track) {
        const clone = track.cloneNode(true);
        track.parentElement.appendChild(clone);
    }

    // Bulb interaction
    const bulb = document.getElementById('bulb');
    if (bulb) {
        bulb.addEventListener('click', () => {
            bulb.classList.toggle('active');
            bulb.style.transform = bulb.classList.contains('active') 
                ? 'scale(1.5) rotate(20deg)'
                : 'scale(1)';
        });
    }

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all animate-on-scroll elements
    document.querySelectorAll('.question, .team-member').forEach(element => {
        observer.observe(element);
    });

    // Sticky header effect
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = '0 2px 15px rgba(0, 0, 0, 0.05)';
        }
    });

    // Image hover effect enhancement
    document.querySelectorAll('.image-box').forEach(box => {
        box.addEventListener('mousemove', (e) => {
            const xAxis = (box.offsetWidth / 2 - e.offsetX) / 10;
            const yAxis = (box.offsetHeight / 2 - e.offsetY) / 10;
            box.style.transform = `perspective(1000px) rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
        });

        box.addEventListener('mouseleave', () => {
            box.style.transform = 'perspective(1000px) rotateY(0) rotateX(0)';
        });
    });

    // Lazy loading for images
    if ('loading' in HTMLImageElement.prototype) {
        document.querySelectorAll('img[loading="lazy"]').forEach(img => {
            img.src = img.dataset.src;
        });
    } else {
        const lazyLoader = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    lazyLoader.unobserve(img);
                }
            });
        });

        document.querySelectorAll('img[loading="lazy"]').forEach(img => {
            lazyLoader.observe(img);
        });
    }
});

// Optional: Add smooth page transitions
function switchPage(targetId) {
    const currentPage = document.querySelector('.page.active');
    const targetPage = document.querySelector(targetId);

    if (currentPage) {
        currentPage.classList.remove('active');
        currentPage.style.opacity = '0';
    }

    if (targetPage) {
        targetPage.classList.add('active');
        targetPage.style.opacity = '1';
    }
}
