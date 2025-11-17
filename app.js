// Gallery images - 21 professional photos (first photo removed)
const galleryImages = [
    {
        title: 'Professional Photo',
        category: 'Portfolio',
        src: 'https://i.ibb.co/DDZm0y40/123c94d1-2c31-42ac-ba0b-b8159d4b83c5.jpg'
    },
    {
        title: 'Professional Photo',
        category: 'Portfolio',
        src: 'https://i.ibb.co/DgfqX9N9/IMG-9382.png'
    },
    {
        title: 'Professional Photo',
        category: 'Portfolio',
        src: 'https://i.ibb.co/d0WpXNKc/IMG-0644.jpg'
    },
    {
        title: 'Professional Photo',
        category: 'Portfolio',
        src: 'https://i.ibb.co/FqmxpNDd/IMG-3123.jpg'
    },
    {
        title: 'Professional Photo',
        category: 'Portfolio',
        src: 'https://i.ibb.co/mVxHDyC0/6931c473-98a4-41e0-b781-5f29df7c9e23.jpg'
    },
    {
        title: 'Professional Photo',
        category: 'Portfolio',
        src: 'https://i.ibb.co/FqKG5pWs/IMG-5206.jpg'
    },
    {
        title: 'Professional Photo',
        category: 'Portfolio',
        src: 'https://i.ibb.co/PvTnsBTZ/IMG-5207.jpg'
    },
    {
        title: 'Professional Photo',
        category: 'Portfolio',
        src: 'https://i.ibb.co/WpGK15Wr/IMG-6804.jpg'
    },
    {
        title: 'Professional Photo',
        category: 'Portfolio',
        src: 'https://i.ibb.co/V8fK1yX/IMG-9410.png'
    },
    {
        title: 'Professional Photo',
        category: 'Portfolio',
        src: 'https://i.ibb.co/LdPCbtpj/IMG-9680.jpg'
    },
    {
        title: 'Professional Photo',
        category: 'Portfolio',
        src: 'https://i.ibb.co/hqCRq4d/kohinoor-marathi-media-R-Download.jpg'
    },
    {
        title: 'Professional Photo',
        category: 'Portfolio',
        src: 'https://i.ibb.co/v4rMLY4G/kohinoor-marathi-media-R-Download.jpg'
    },
    {
        title: 'Professional Photo',
        category: 'Portfolio',
        src: 'https://i.ibb.co/bgN44T8J/kohinoor-marathi-media-R-Download.jpg'
    },
    {
        title: 'Professional Photo',
        category: 'Portfolio',
        src: 'https://i.ibb.co/RTL5gCZG/IMG-2039.jpg'
    },
    {
        title: 'Professional Photo',
        category: 'Portfolio',
        src: 'https://i.ibb.co/C5Hx5CvN/IMG-2233.jpg'
    },
    {
        title: 'Professional Photo',
        category: 'Portfolio',
        src: 'https://i.ibb.co/WNHCDgv6/IMG-2234.jpg'
    },
    {
        title: 'Professional Photo',
        category: 'Portfolio',
        src: 'https://i.ibb.co/mVgbgYXk/IMG-3994.jpg'
    },
    {
        title: 'Professional Photo',
        category: 'Portfolio',
        src: 'https://i.ibb.co/YBYBWmvZ/IMG-7161.jpg'
    },
    {
        title: 'Professional Photo',
        category: 'Portfolio',
        src: 'https://i.ibb.co/tMsJXfFx/IMG-4438.jpg'
    },
    {
        title: 'Professional Photo',
        category: 'Portfolio',
        src: 'https://i.ibb.co/JFvpspfn/IMG-4440.jpg'
    },
    {
        title: 'Professional Photo',
        category: 'Portfolio',
        src: 'https://i.ibb.co/4nsrvtcW/IMG-7163.jpg'
    }
];

// Smooth scroll for navigation links
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section');
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

// Mobile menu toggle
if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });
}

// Close mobile menu when link is clicked
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// Navbar scroll effect
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all sections and cards
const animatedElements = document.querySelectorAll(
    '.about-grid, .stat-card, .featured-card, .timeline-item, .theatre-card, .award-card, .gallery-item, .contact-grid'
);

animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Slider state
let currentSlide = 0;
let isDragging = false;
let startPos = 0;
let currentTranslate = 0;
let prevTranslate = 0;
let animationID = 0;

// Populate slider with images
function populateSlider() {
    const sliderTrack = document.getElementById('sliderTrack');
    const sliderIndicators = document.getElementById('sliderIndicators');
    
    if (!sliderTrack || !sliderIndicators) return;
    
    // Create slides
    galleryImages.forEach((image, index) => {
        const slide = document.createElement('div');
        slide.className = 'slider-slide';
        
        const img = document.createElement('img');
        img.src = image.src;
        img.alt = `Shrutkirti Sawant - ${image.title}`;
        img.draggable = false;
        
        slide.appendChild(img);
        sliderTrack.appendChild(slide);
        
        // Create indicator
        const indicator = document.createElement('div');
        indicator.className = 'slider-indicator';
        if (index === 0) indicator.classList.add('active');
        indicator.addEventListener('click', () => goToSlide(index));
        sliderIndicators.appendChild(indicator);
    });
    
    initializeSlider();
}

// Initialize slider functionality
function initializeSlider() {
    const sliderTrack = document.getElementById('sliderTrack');
    const sliderPrev = document.getElementById('sliderPrev');
    const sliderNext = document.getElementById('sliderNext');
    
    if (!sliderTrack) return;
    
    // Arrow button events
    if (sliderPrev) {
        sliderPrev.addEventListener('click', () => {
            if (currentSlide > 0) {
                goToSlide(currentSlide - 1);
            } else {
                goToSlide(galleryImages.length - 1); // Loop to last
            }
        });
    }
    
    if (sliderNext) {
        sliderNext.addEventListener('click', () => {
            if (currentSlide < galleryImages.length - 1) {
                goToSlide(currentSlide + 1);
            } else {
                goToSlide(0); // Loop to first
            }
        });
    }
    
    // Touch events for mobile swipe
    sliderTrack.addEventListener('touchstart', touchStart);
    sliderTrack.addEventListener('touchmove', touchMove);
    sliderTrack.addEventListener('touchend', touchEnd);
    
    // Mouse events for desktop drag
    sliderTrack.addEventListener('mousedown', touchStart);
    sliderTrack.addEventListener('mousemove', touchMove);
    sliderTrack.addEventListener('mouseup', touchEnd);
    sliderTrack.addEventListener('mouseleave', touchEnd);
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            if (currentSlide > 0) {
                goToSlide(currentSlide - 1);
            } else {
                goToSlide(galleryImages.length - 1);
            }
        } else if (e.key === 'ArrowRight') {
            if (currentSlide < galleryImages.length - 1) {
                goToSlide(currentSlide + 1);
            } else {
                goToSlide(0);
            }
        }
    });
}

// Go to specific slide
function goToSlide(index) {
    currentSlide = index;
    const sliderTrack = document.getElementById('sliderTrack');
    const indicators = document.querySelectorAll('.slider-indicator');
    const counter = document.getElementById('sliderCounter');
    
    if (sliderTrack) {
        sliderTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
    }
    
    // Update indicators
    indicators.forEach((indicator, i) => {
        if (i === currentSlide) {
            indicator.classList.add('active');
        } else {
            indicator.classList.remove('active');
        }
    });
    
    // Update counter
    if (counter) {
        counter.textContent = `${currentSlide + 1} / ${galleryImages.length}`;
    }
}

// Touch/Mouse event handlers
function touchStart(event) {
    if (event.type === 'touchstart') {
        startPos = event.touches[0].clientX;
    } else {
        startPos = event.clientX;
        event.preventDefault();
    }
    isDragging = true;
    animationID = requestAnimationFrame(animation);
    const sliderTrack = document.getElementById('sliderTrack');
    if (sliderTrack) {
        sliderTrack.style.cursor = 'grabbing';
    }
}

function touchMove(event) {
    if (!isDragging) return;
    
    const currentPosition = event.type === 'touchmove' 
        ? event.touches[0].clientX 
        : event.clientX;
    
    currentTranslate = prevTranslate + currentPosition - startPos;
}

function touchEnd() {
    isDragging = false;
    cancelAnimationFrame(animationID);
    
    const movedBy = currentTranslate - prevTranslate;
    const sliderTrack = document.getElementById('sliderTrack');
    
    if (sliderTrack) {
        sliderTrack.style.cursor = 'grab';
    }
    
    // Swipe threshold: 100px
    if (movedBy < -100 && currentSlide < galleryImages.length - 1) {
        currentSlide += 1;
    } else if (movedBy > 100 && currentSlide > 0) {
        currentSlide -= 1;
    } else if (movedBy < -100 && currentSlide === galleryImages.length - 1) {
        currentSlide = 0; // Loop to first
    } else if (movedBy > 100 && currentSlide === 0) {
        currentSlide = galleryImages.length - 1; // Loop to last
    }
    
    goToSlide(currentSlide);
    prevTranslate = currentTranslate;
}

function animation() {
    const sliderTrack = document.getElementById('sliderTrack');
    if (sliderTrack && isDragging) {
        sliderTrack.style.transform = `translateX(${currentTranslate}px)`;
        requestAnimationFrame(animation);
    }
}

// Initialize slider on page load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', populateSlider);
} else {
    populateSlider();
}



// Contact form handling
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        
        // Validate form
        if (!name || !email || !subject || !message) {
            showFormMessage('Please fill in all fields.', 'error');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showFormMessage('Please enter a valid email address.', 'error');
            return;
        }
        
        // Simulate form submission
        showFormMessage('Thank you for your message! I will get back to you soon.', 'success');
        
        // Reset form
        contactForm.reset();
        
        // Hide message after 5 seconds
        setTimeout(() => {
            formMessage.style.display = 'none';
        }, 5000);
    });
}

function showFormMessage(message, type) {
    formMessage.textContent = message;
    formMessage.className = `form-message ${type}`;
    formMessage.style.display = 'block';
}

// Add active state to navigation based on scroll position
window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.pageYOffset >= sectionTop - 100) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Optimized scroll handling - parallax removed for smooth performance
let ticking = false;

window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            // Scroll handling optimized for performance
            ticking = false;
        });
        ticking = true;
    }
}, { passive: true });

// Smooth scroll polyfill for older browsers
if (!('scrollBehavior' in document.documentElement.style)) {
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const targetPosition = targetSection.offsetTop - 70;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Stats counter animation
function animateValue(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const value = Math.floor(progress * (end - start) + start);
        element.textContent = value + (element.dataset.suffix || '');
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// Observe stat cards for counter animation
const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.dataset.animated) {
            const valueElement = entry.target.querySelector('.stat-value');
            if (valueElement) {
                const finalValue = parseInt(valueElement.textContent);
                const suffix = valueElement.textContent.replace(/[0-9]/g, '');
                valueElement.dataset.suffix = suffix;
                animateValue(valueElement, 0, finalValue, 2000);
                entry.target.dataset.animated = 'true';
            }
        }
    });
}, { threshold: 0.5 });

const statCards = document.querySelectorAll('.stat-card');
statCards.forEach(card => statObserver.observe(card));

// Add hover effect to featured cards
const featuredCards = document.querySelectorAll('.featured-card');
featuredCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

console.log('Shrutkirti Sawant Portfolio - Loaded Successfully');