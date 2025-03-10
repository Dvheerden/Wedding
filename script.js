// Language switching functionality
let currentLang = 'en';
let translations = {};

// Load translations from languages.json
fetch('languages.json')
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        console.log('Translations loaded successfully');
        translations = data;
        updateLanguage();
    })
    .catch(error => {
        console.error('Error loading translations:', error);
    });

function updateLanguage() {
    console.log('Updating language to:', currentLang);
    
    // Update all elements with data-translate attribute
    const elements = document.querySelectorAll('[data-translate]');
    console.log('Found elements to translate:', elements.length);
    
    elements.forEach(element => {
        const key = element.getAttribute('data-translate');
        const keys = key.split('.');
        let value = translations[currentLang];
        
        // Navigate through the translation object
        for (const k of keys) {
            if (!value) {
                console.error(`Translation missing for key: ${key}`);
                return;
            }
            value = value[k];
        }
        
        if (value) {
            element.textContent = value;
            console.log(`Updated element with key ${key}`);
        } else {
            console.error(`Translation missing for key: ${key}`);
        }
    });

    // Update language toggle button
    const languageToggle = document.getElementById('languageToggle');
    if (languageToggle) {
        const span = languageToggle.querySelector('span');
        if (span) {
            span.textContent = currentLang === 'en' ? '中文' : 'EN';
            console.log('Updated language toggle button text');
        } else {
            console.error('Language toggle span not found');
        }
    } else {
        console.error('Language toggle button not found');
    }

    // Update HTML lang attribute
    document.documentElement.lang = currentLang;
    console.log('Updated HTML lang attribute');
}

// Initialize language toggle button
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM Content Loaded');
    const languageToggle = document.getElementById('languageToggle');
    if (languageToggle) {
        console.log('Language toggle button found');
        languageToggle.addEventListener('click', () => {
            console.log('Language toggle clicked');
            currentLang = currentLang === 'en' ? 'zh-TW' : 'en';
            updateLanguage();
        });
    } else {
        console.error('Language toggle button not found on DOM load');
    }
});

// Mobile menu functionality
const mobileMenuBtn = document.querySelector('.mobile-menu');
const navLinks = document.querySelector('.nav-links');
const overlay = document.querySelector('.mobile-menu-overlay');

function toggleMobileMenu() {
    mobileMenuBtn.classList.toggle('active');
    navLinks.classList.toggle('active');
    overlay.classList.toggle('active');
    document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
}

mobileMenuBtn.addEventListener('click', toggleMobileMenu);
overlay.addEventListener('click', toggleMobileMenu);

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        if (navLinks.classList.contains('active')) {
            toggleMobileMenu();
        }
    });
});

// Prevent language toggle from closing mobile menu
const languageToggle = document.getElementById('languageToggle');
languageToggle.addEventListener('click', (e) => {
    e.stopPropagation();
});

document.addEventListener('DOMContentLoaded', function() {
    createSlideshow('slideshow-container-men', 'men-dots');
    createSlideshow('slideshow-container-women', 'women-dots');
});

// START OF CLOCK JS
// Configuration
const WEDDING_DATE = "dec 01 2025 00:00:01";
const deadline = new Date(WEDDING_DATE + " UTC+2").getTime();

// Confetti celebration functions
function celebrate() {
    // Fire multiple confetti bursts
    const duration = 5 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min, max) {
        return Math.random() * (max - min) + min;
    }

    const interval = setInterval(function() {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
            return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);
        
        // Fire confetti from multiple angles
        confetti({
            ...defaults,
            particleCount,
            origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
        });
        confetti({
            ...defaults,
            particleCount,
            origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
        });
    }, 250);
}

// Update function for the countdown
function updateCountdown() {
    const now = new Date().getTime();
    const t = deadline - now;

    // Getting values of days,hours,minutes, seconds
    const days = Math.floor(t / (1000 * 60 * 60 * 24));
    const hours = Math.floor((t % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((t % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((t % (1000 * 60)) / 1000);

    // Show the output time
    document.getElementById("day").innerHTML = days;
    document.getElementById("hour").innerHTML = hours;
    document.getElementById("minute").innerHTML = minutes;
    document.getElementById("second").innerHTML = seconds;

    // Show overtime output and trigger celebration
    if (t < 0) {
        clearInterval(timerInterval);
        document.getElementById("demo").innerHTML = "IT'S THE BIG DAY!";
        document.getElementById("day").innerHTML = "0";
        document.getElementById("hour").innerHTML = "0";
        document.getElementById("minute").innerHTML = "0";
        document.getElementById("second").innerHTML = "0";
        celebrate(); // Trigger confetti celebration
    }
}

// Start the countdown
const timerInterval = setInterval(updateCountdown, 1000);

// Cleanup when page is hidden/closed
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        clearInterval(timerInterval);
    } else {
        updateCountdown();
    }
});
//END OF CLOCK JS

// Slideshow functionality
function createSlideshow(containerClass, dotsClass) {
    let slideIndex = 0;
    const container = document.querySelector(`.${containerClass}`);
    const slides = container.querySelectorAll('.slide');
    const dots = document.querySelector(`.${dotsClass}`).querySelectorAll('.dot');
    let touchStartX = 0;
    let touchEndX = 0;

    function showSlides(n) {
        // Reset index if out of bounds
        if (n >= slides.length) slideIndex = 0;
        if (n < 0) slideIndex = slides.length - 1;

        // Hide all slides
        slides.forEach(slide => {
            slide.classList.remove('active');
        });

        // Remove active state from all dots
        dots.forEach(dot => {
            dot.classList.remove('active');
        });

        // Show current slide and activate corresponding dot
        slides[slideIndex].classList.add('active');
        dots[slideIndex].classList.add('active');
    }

    // Next/previous controls
    function moveSlide(n) {
        showSlides(slideIndex += n);
    }

    // Dot controls
    function currentSlide(n) {
        showSlides(slideIndex = n);
    }

    // Touch event handlers
    function handleTouchStart(e) {
        touchStartX = e.touches[0].clientX;
    }

    function handleTouchMove(e) {
        if (!touchStartX) return;
        touchEndX = e.touches[0].clientX;
    }

    function handleTouchEnd() {
        if (!touchStartX || !touchEndX) return;
        
        const diffX = touchStartX - touchEndX;
        const threshold = 50; // minimum distance for swipe

        if (Math.abs(diffX) > threshold) {
            if (diffX > 0) {
                // Swiped left - show next slide
                moveSlide(1);
            } else {
                // Swiped right - show previous slide
                moveSlide(-1);
            }
        }

        // Reset values
        touchStartX = 0;
        touchEndX = 0;
    }

    // Auto advance slides every 5 seconds
    function autoAdvance() {
        moveSlide(1);
    }

    // Initialize slideshow
    if (slides.length > 0) {
        showSlides(slideIndex);
        setInterval(autoAdvance, 5000);

        // Add touch event listeners
        container.addEventListener('touchstart', handleTouchStart, false);
        container.addEventListener('touchmove', handleTouchMove, false);
        container.addEventListener('touchend', handleTouchEnd, false);
    }

    // Add click event listeners to dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => currentSlide(index));
    });
}

// Initialize both slideshows
document.addEventListener('DOMContentLoaded', function() {
    createSlideshow('slideshow-container-men', 'men-dots');
    createSlideshow('slideshow-container-women', 'women-dots');
});