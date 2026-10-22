document.addEventListener('DOMContentLoaded', () => {
    // 1. Navigation Controller
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const navDrawer = document.getElementById('nav-drawer');
    const typewriterElement = document.getElementById('typewriter');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navDrawer.classList.toggle('active');
    });

    // Close drawer when link clicked
    document.querySelectorAll('.nav-drawer a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navDrawer.classList.remove('active');
        });
    });

    // Active Link Highlighting
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - 150) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });

    // 2. Typewriter Effect
    const roles = ["B.Tech ADS Student", "Full Stack Web Developer", "UI/UX Enthusiast", "Passionate Learner"];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 100;

    function type() {
        const currentRole = roles[roleIndex];
        
        if (isDeleting) {
            typewriterElement.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 50;
        } else {
            typewriterElement.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 150;
        }

        if (!isDeleting && charIndex === currentRole.length) {
            isDeleting = true;
            typeSpeed = 2000; // Pause at end
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            typeSpeed = 500;
        }

        setTimeout(type, typeSpeed);
    }
    type();

    // 4. Cursor Glow Effect
    const cursorGlow = document.getElementById('cursor-glow');
    document.addEventListener('mousemove', (e) => {
        cursorGlow.style.left = e.clientX + 'px';
        cursorGlow.style.top = e.clientY + 'px';
    });

    // 5. Scroll Animations (Intersection Observer)
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                
                // Counter Animation
                if (entry.target.classList.contains('counter')) {
                    const target = parseFloat(entry.target.getAttribute('data-target'));
                    const duration = 2000;
                    const step = target / (duration / 16);
                    let current = 0;
                    
                    const updateCounter = () => {
                        current += step;
                        if (current < target) {
                            entry.target.textContent = current.toFixed(target % 1 === 0 ? 0 : 2);
                            requestAnimationFrame(updateCounter);
                        } else {
                            entry.target.textContent = target;
                        }
                    };
                    updateCounter();
                }
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal, .slide-left, .counter').forEach(el => observer.observe(el));

    // 6. Project Tilt (Simple implementation included in mousemove above)
    // For more complex tilt, one could use VanillaTilt library, but we're keeping it vanilla.

    // 7. Resume Preview Modal Controller
    const cvModal = document.getElementById('cv-modal');
    const downloadCvBtn = document.getElementById('download-cv-btn');
    const cvModalCloseX = document.getElementById('cv-modal-close-x');
    const cvModalCloseBtn = document.getElementById('cv-modal-close-btn');

    function openCvModal() {
        if (!cvModal) return;
        cvModal.classList.add('active');
        cvModal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    }

    function closeCvModal() {
        if (!cvModal) return;
        cvModal.classList.remove('active');
        cvModal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }

    if (downloadCvBtn) {
        downloadCvBtn.addEventListener('click', (e) => {
            e.preventDefault();
            openCvModal();
        });
    }

    if (cvModalCloseX) {
        cvModalCloseX.addEventListener('click', closeCvModal);
    }

    if (cvModalCloseBtn) {
        cvModalCloseBtn.addEventListener('click', closeCvModal);
    }

    if (cvModal) {
        cvModal.addEventListener('click', (e) => {
            // Close when clicking directly on the backdrop (outside .cv-modal-container)
            if (e.target === cvModal) {
                closeCvModal();
            }
        });
    }

    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && cvModal && cvModal.classList.contains('active')) {
            closeCvModal();
        }
    });
});
