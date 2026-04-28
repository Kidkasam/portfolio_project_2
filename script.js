document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    document.querySelectorAll('.nav-links li a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    const sections = document.querySelectorAll('section, header');
    const navItems = document.querySelectorAll('.nav-links li a');

    window.addEventListener('scroll', () => {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            if (scrollY >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href').includes(current)) {
                item.classList.add('active');
            }
        });

        const nav = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            nav.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.1)';
        } else {
            nav.style.boxShadow = 'none';
        }

        const scrollTopBtn = document.querySelector('#scrollTopBtn');
        if (window.scrollY > 300) {
            scrollTopBtn.classList.add('show');
        } else {
            scrollTopBtn.classList.remove('show');
        }
    });

    const scrollTopBtn = document.querySelector('#scrollTopBtn');
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    const themeToggle = document.querySelector('#theme-toggle');
    const currentTheme = localStorage.getItem('theme');

    if (currentTheme) {
        document.documentElement.setAttribute('data-theme', currentTheme);
    }

    themeToggle.addEventListener('click', () => {
        let theme = document.documentElement.getAttribute('data-theme');
        if (theme === 'light') {
            document.documentElement.removeAttribute('data-theme');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
        }
    });

    // Project Data for Modal
    const projectData = {
        edgeforge: {
            title: 'EdgeForge',
            image: 'Screenshot 2026-04-27 184549.png',
            tags: ['React', 'Django'],
            description: 'A full-stack trade journal platform built with React and Django. Designed for traders to track, analyze, and refine their trading performance with deep insights into trading patterns.',
            live: 'https://edgeforge-nu.vercel.app/',
            repo: 'https://github.com/Kidkasam/edgeforge'
        },
        kfits: {
            title: 'Kfits',
            image: 'Screenshot 2026-04-27 185310.png',
            tags: ['React', 'Django'],
            description: 'A premium menswear and sustainable fashion store developed using React and Django. This project delivers a high-converting shopping experience with a modern, responsive interface.',
            live: '#',
            repo: 'https://github.com/Kidkasam/ecommerce'
        }
    };

    // Modal Logic
    const modal = document.querySelector('#project-modal');
    const openModalBtns = document.querySelectorAll('.open-modal');
    const closeModalBtn = document.querySelector('.close-modal');

    const openModal = (projectId) => {
        const data = projectData[projectId];
        if (!data) return;

        document.querySelector('#modal-title').textContent = data.title;
        document.querySelector('#modal-image').src = data.image;
        document.querySelector('#modal-description').textContent = data.description;
        
        const liveBtn = document.querySelector('#modal-live-link');
        if (data.live === '#') {
            liveBtn.style.display = 'none';
        } else {
            liveBtn.style.display = 'inline-block';
            liveBtn.href = data.live;
        }
        
        document.querySelector('#modal-repo-link').href = data.repo;

        const tagsContainer = document.querySelector('#modal-tags');
        tagsContainer.innerHTML = '';
        data.tags.forEach(tag => {
            const span = document.createElement('span');
            span.className = 'modal-tag';
            span.textContent = tag;
            tagsContainer.appendChild(span);
        });

        modal.style.display = 'block';
        document.body.style.overflow = 'hidden'; // Prevent scrolling
    };

    const closeModal = () => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto'; // Re-enable scrolling
    };

    openModalBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const card = e.target.closest('.project-card');
            const projectId = card.getAttribute('data-project');
            openModal(projectId);
        });
    });

    closeModalBtn.addEventListener('click', closeModal);

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Contact Form Handling
    const contactForm = document.querySelector('#contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(contactForm);
            const name = formData.get('name');
            
            // For now, just show a success message
            alert(`Thanks for reaching out, ${name}! This is a demo form, but in a real project, this would send an email.`);
            contactForm.reset();
        });
    }
});