document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const overlay = document.querySelector('.mobile-menu-overlay');

    mobileMenuBtn.addEventListener('click', function() {
        this.classList.toggle('active');
        navLinks.classList.toggle('active');
        overlay.classList.toggle('active');
    });

    // Close menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenuBtn.classList.remove('active');
            navLinks.classList.remove('active');
            overlay.classList.remove('active');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navLinks.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
            mobileMenuBtn.classList.remove('active');
            navLinks.classList.remove('active');
            overlay.classList.remove('active');
        }
    });

    // Prevent scrolling when mobile menu is open
    function toggleScroll(disable) {
        document.body.style.overflow = disable ? 'hidden' : '';
    }

    mobileMenuBtn.addEventListener('click', () => {
        toggleScroll(navLinks.classList.contains('active'));
    });

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
    const prev = container.querySelector('.prev');
    const next = container.querySelector('.next');

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

    // Auto advance slides every 5 seconds
    function autoAdvance() {
        moveSlide(1);
    }

    // Initialize slideshow
    if (slides.length > 0) {
        showSlides(slideIndex);
        setInterval(autoAdvance, 5000);
    }

    // Add click event listeners to prev/next buttons
    prev?.addEventListener('click', () => moveSlide(-1));
    next?.addEventListener('click', () => moveSlide(1));

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