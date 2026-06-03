/**
 * DHRUVAS Student Accommodation Website Logic
 * Core JS File
 */

document.addEventListener('DOMContentLoaded', () => {

    // ==========================================
    // 1. Navigation Menu Scrolled Effect
    // ==========================================
    const header = document.getElementById('header');
    
    const handleScroll = () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Run once at start


    // ==========================================
    // 2. Mobile Drawer Navigation
    // ==========================================
    const hamburger = document.getElementById('hamburger-menu');
    const closeMenu = document.getElementById('close-menu');
    const mobileNav = document.getElementById('mobile-nav');
    const overlay = document.getElementById('mobile-nav-overlay');
    const mobileLinks = document.querySelectorAll('.mobile-nav-link');

    const openMobileMenu = () => {
        mobileNav.classList.add('active');
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden'; // Stop page scrolling background
    };

    const closeMobileMenu = () => {
        mobileNav.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    };

    hamburger.addEventListener('click', openMobileMenu);
    closeMenu.addEventListener('click', closeMobileMenu);
    overlay.addEventListener('click', closeMobileMenu);

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            closeMobileMenu();
            // Optional: short timeout to let menu close before scrolling
        });
    });


    // ==========================================
    // 3. Testimonial Slider / Carousel
    // ==========================================
    const testimonialSlider = document.getElementById('testimonial-slider');
    const prevBtn = document.getElementById('slider-prev-btn');
    const nextBtn = document.getElementById('slider-next-btn');
    const dotsContainer = document.getElementById('slider-dots');
    const cards = document.querySelectorAll('.testimonial-card');
    
    let currentIndex = 0;
    const totalCards = cards.length;
    let autoSlideInterval;

    // Create Navigation Dots dynamically
    cards.forEach((_, index) => {
        const dot = document.createElement('span');
        dot.classList.add('slider-dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => {
            goToSlide(index);
            resetAutoSlide();
        });
        dotsContainer.appendChild(dot);
    });

    const dots = document.querySelectorAll('.slider-dot');

    const updateSliderPosition = () => {
        testimonialSlider.style.transform = `translateX(-${currentIndex * 100}%)`;
        dots.forEach((dot, index) => {
            if (index === currentIndex) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    };

    const goToSlide = (index) => {
        currentIndex = index;
        updateSliderPosition();
    };

    const nextSlide = () => {
        currentIndex = (currentIndex + 1) % totalCards;
        updateSliderPosition();
    };

    const prevSlide = () => {
        currentIndex = (currentIndex - 1 + totalCards) % totalCards;
        updateSliderPosition();
    };

    nextBtn.addEventListener('click', () => {
        nextSlide();
        resetAutoSlide();
    });

    prevBtn.addEventListener('click', () => {
        prevSlide();
        resetAutoSlide();
    });

    // Auto Slide Logic
    const startAutoSlide = () => {
        autoSlideInterval = setInterval(nextSlide, 5000);
    };

    const resetAutoSlide = () => {
        clearInterval(autoSlideInterval);
        startAutoSlide();
    };

    if (totalCards > 0) {
        startAutoSlide();
        // Pause slide on mouse enter
        testimonialSlider.addEventListener('mouseenter', () => clearInterval(autoSlideInterval));
        testimonialSlider.addEventListener('mouseleave', startAutoSlide);
    }


    // ==========================================
    // 4. Interactive Image Lightbox for Gallery
    // ==========================================
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const lightboxClose = document.getElementById('lightbox-close');

    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const img = item.querySelector('img');
            const overlayText = item.querySelector('.gallery-overlay span');
            
            lightboxImg.src = img.src;
            lightboxCaption.textContent = overlayText.textContent;
            lightbox.style.display = 'block';
            document.body.style.overflow = 'hidden';
        });
    });

    const closeLightbox = () => {
        lightbox.style.display = 'none';
        document.body.style.overflow = '';
    };

    lightboxClose.addEventListener('click', closeLightbox);
    
    // Close when clicking outside image
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    // Close on Escape Key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeLightbox();
        }
    });


    // ==========================================
    // 5. FAQ Accordion Expanding/Collapsing
    // ==========================================
    const accordionHeaders = document.querySelectorAll('.accordion-title');

    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const item = header.parentElement;
            const content = item.querySelector('.accordion-content');
            const isOpen = item.classList.contains('active');

            // Close all other accordions
            document.querySelectorAll('.accordion-item').forEach(otherItem => {
                otherItem.classList.remove('active');
                otherItem.querySelector('.accordion-content').style.maxHeight = null;
                otherItem.querySelector('.accordion-title').setAttribute('aria-expanded', 'false');
            });

            if (!isOpen) {
                item.classList.add('active');
                content.style.maxHeight = content.scrollHeight + 'px';
                header.setAttribute('aria-expanded', 'true');
            }
        });
    });


    // ==========================================
    // 6. Form Validation & WhatsApp Compiler
    // ==========================================
    const form = document.getElementById('room-enquiry-form');
    const successModal = document.getElementById('success-modal');
    const modalClose = document.getElementById('modal-close');
    const modalWaBtn = document.getElementById('modal-wa-btn');

    // Simple helpers for inputs validation
    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
    };

    const validateMobile = (mobile) => {
        return /^\d{10}$/.test(mobile);
    };

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const nameInput = document.getElementById('name');
        const mobileInput = document.getElementById('mobile');
        const emailInput = document.getElementById('email');
        const genderSelect = document.getElementById('gender');
        const moveinInput = document.getElementById('movein');
        const collegeInput = document.getElementById('college');
        const messageInput = document.getElementById('message');

        let isValid = true;

        // Name Validation
        if (!nameInput.value.trim()) {
            nameInput.classList.add('invalid');
            isValid = false;
        } else {
            nameInput.classList.remove('invalid');
        }

        // Mobile Validation
        if (!validateMobile(mobileInput.value.trim())) {
            mobileInput.classList.add('invalid');
            isValid = false;
        } else {
            mobileInput.classList.remove('invalid');
        }

        // Email Validation
        if (!validateEmail(emailInput.value.trim())) {
            emailInput.classList.add('invalid');
            isValid = false;
        } else {
            emailInput.classList.remove('invalid');
        }

        // Gender Validation
        if (!genderSelect.value) {
            genderSelect.classList.add('invalid');
            isValid = false;
        } else {
            genderSelect.classList.remove('invalid');
        }

        // Move-in Validation
        if (!moveinInput.value) {
            moveinInput.classList.add('invalid');
            isValid = false;
        } else {
            moveinInput.classList.remove('invalid');
        }

        if (isValid) {
            // Form is valid! Create the structured WhatsApp message
            const name = nameInput.value.trim();
            const mobile = mobileInput.value.trim();
            const email = emailInput.value.trim();
            const gender = genderSelect.value;
            const movein = moveinInput.value;
            const college = collegeInput.value.trim() || 'Not Specified';
            const userMsg = messageInput.value.trim() || 'No additional messages.';

            const rawMessage = `Hello DHRUVAS team,

I would like to check availability for room booking. Here are my details:

Name: ${name}
Mobile: ${mobile}
Email: ${email}
Gender: ${gender}
College: ${college}
Preferred Move-in Date: ${movein}
Message: ${userMsg}

Looking forward to your response.`;

            const encodedText = encodeURIComponent(rawMessage);
            const waUrl = `https://wa.me/919515198041?text=${encodedText}`;

            // Configure dynamic modal button URL
            modalWaBtn.href = waUrl;

            // Trigger visual modal representation
            successModal.classList.add('active');
            document.body.style.overflow = 'hidden';

            // Reset the form
            form.reset();
        }
    });

    const closeModal = () => {
        successModal.classList.remove('active');
        document.body.style.overflow = '';
    };

    modalClose.addEventListener('click', closeModal);
    
    // Close modal if clicking overlay background
    successModal.addEventListener('click', (e) => {
        if (e.target === successModal) {
            closeModal();
        }
    });


    // ==========================================
    // 7. Scroll Entrance Animations (Observer)
    // ==========================================
    const animationObserverOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const animationObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('appear');
                observer.unobserve(entry.target); // Trigger animation only once
            }
        });
    }, animationObserverOptions);

    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    animatedElements.forEach(element => animationObserver.observe(element));

});
