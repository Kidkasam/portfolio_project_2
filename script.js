document.addEventListener('DOMContentLoaded', () => {
    // Mobile navigation hamburger toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            const isActive = hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
            hamburger.setAttribute('aria-expanded', isActive);
        });

        document.querySelectorAll('.nav-links li a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
                hamburger.setAttribute('aria-expanded', false);
            });
        });
    }

    // Scroll spy and navbar background blur
    const sections = document.querySelectorAll('section, header');
    const navItems = document.querySelectorAll('.nav-links li a');
    const nav = document.querySelector('.navbar');
    const scrollTopBtn = document.querySelector('#scrollTopBtn');

    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY;

        // Navbar shadow & blur enhancement
        if (scrollPosition > 30) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }

        // Back to top button visibility
        if (scrollPosition > 350) {
            scrollTopBtn.classList.add('show');
        } else {
            scrollTopBtn.classList.remove('show');
        }

        // Active section spy
        let currentSectionId = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            const sectionHeight = section.offsetHeight;
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${currentSectionId}`) {
                item.classList.add('active');
            }
        });
    });

    // Back to top click handler
    if (scrollTopBtn) {
        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Theme Toggle (Dark / Light)
    const themeToggle = document.querySelector('#theme-toggle');
    const savedTheme = localStorage.getItem('theme');

    if (savedTheme) {
        document.documentElement.setAttribute('data-theme', savedTheme);
    } else {
        // Default to dark mode
        document.documentElement.setAttribute('data-theme', 'dark');
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const current = document.documentElement.getAttribute('data-theme');
            const targetTheme = current === 'light' ? 'dark' : 'light';
            document.documentElement.setAttribute('data-theme', targetTheme);
            localStorage.setItem('theme', targetTheme);
        });
    }

    // Project Data for Modal
    const projectData = {
        'hotel-reservation': {
            title: 'Hotel Reservation System',
            image: 'hotel_reservation.png',
            tags: ['React', 'Full-Stack', 'Multi-Hotel Management', 'Tailwind CSS'],
            description: 'A comprehensive full-stack hotel reservation management system (ADAR Hotels) that allows multiple hotels to seamlessly manage room inventories, guest reservations, booking calendars, pricing, and daily hotel operations from a single centralized web platform.',
            live: 'https://adar-hotels.vercel.app/reservation',
            repo: 'https://github.com/eyyuf/hotel_reservation'
        },
        'edgeforge': {
            title: 'EdgeForge',
            image: 'Screenshot 2026-04-27 184549.png',
            tags: ['React', 'Django', 'PostgreSQL', 'Analytics'],
            description: 'A full-stack trade journal platform built with React and Django. Designed for active financial traders to track, analyze, and refine trading performance with deep analytical insights into execution patterns and risk management.',
            live: 'https://edgeforge-nu.vercel.app/',
            repo: 'https://github.com/Kidkasam/edgeforge'
        },
        'kfits': {
            title: 'Kfits',
            image: 'Screenshot 2026-04-27 185310.png',
            tags: ['React', 'Django', 'E-Commerce', 'Responsive'],
            description: 'A premium menswear and sustainable fashion store developed using React and Django. Delivers a modern, fast, and high-converting shopping experience with seamless product catalog exploration and checkout flow.',
            live: '#',
            repo: 'https://github.com/Kidkasam/ecommerce'
        }
    };

    // Project Modal Logic
    const modal = document.querySelector('#project-modal');
    const openModalBtns = document.querySelectorAll('.open-modal');
    const closeModalBtn = document.querySelector('.close-modal');

    const openModal = (projectId) => {
        const data = projectData[projectId];
        if (!data || !modal) return;

        const modalTitle = document.querySelector('#modal-title');
        const modalImg = document.querySelector('#modal-image');
        const modalDesc = document.querySelector('#modal-description');
        const liveBtn = document.querySelector('#modal-live-link');
        const repoBtn = document.querySelector('#modal-repo-link');
        const tagsContainer = document.querySelector('#modal-tags');

        modalTitle.textContent = data.title;
        modalImg.src = data.image;
        modalImg.alt = `${data.title} Mockup`;
        modalDesc.textContent = data.description;

        if (data.live && data.live !== '#') {
            liveBtn.style.display = 'inline-flex';
            liveBtn.href = data.live;
        } else {
            liveBtn.style.display = 'none';
        }

        if (data.repo && data.repo !== '#') {
            repoBtn.style.display = 'inline-flex';
            repoBtn.href = data.repo;
        } else {
            repoBtn.style.display = 'none';
        }

        tagsContainer.innerHTML = '';
        data.tags.forEach(tag => {
            const span = document.createElement('span');
            span.className = 'modal-tag';
            span.textContent = tag;
            tagsContainer.appendChild(span);
        });

        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    };

    const closeModal = () => {
        if (!modal) return;
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    };

    openModalBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const card = e.target.closest('.project-card');
            if (card) {
                const projectId = card.getAttribute('data-project');
                openModal(projectId);
            }
        });
    });

    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', closeModal);
    }

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Close modal on Escape key
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
            closeModal();
        }
    });

    // Toast Notification Utility
    const showToast = (message, type = 'success') => {
        const toast = document.querySelector('#toast');
        if (!toast) return;

        toast.textContent = message;
        toast.className = `toast show ${type}`;

        setTimeout(() => {
            toast.className = 'toast';
        }, 4000);
    };

    // Contact Form Submission Handler
    const contactForm = document.querySelector('#contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const submitBtn = document.querySelector('#submit-btn');
            const originalText = submitBtn ? submitBtn.textContent : 'Send Message';
            
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.textContent = 'Sending...';
            }

            // Simulate form handling
            setTimeout(() => {
                const formData = new FormData(contactForm);
                const name = formData.get('name') || 'there';

                showToast(`Thank you, ${name}! Your message has been received.`);
                contactForm.reset();

                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.textContent = originalText;
                }
            }, 600);
        });
    }
});