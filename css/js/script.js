// ============================================
// DOM CONTENT LOADED
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initLoadingScreen();
    initCursorEffects();
    initThemeToggle();
    initMobileMenu();
    initTypingEffect();
    initCounterAnimation();
    initSmoothScroll();
    initBackToTop();
    initPortfolioFilter();
    initTestimonialSlider();
    initContactForm();
    initParticles();
    initAnimations();
    initScrollAnimations();
});

// ============================================
// LOADING SCREEN
// ============================================
function initLoadingScreen() {
    const loadingScreen = document.getElementById('loadingScreen');
    const progressBar = document.getElementById('progressBar');
    
    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.random() * 20;
        if (progress > 100) progress = 100;
        progressBar.style.width = `${progress}%`;
        
        if (progress >= 100) {
            clearInterval(interval);
            setTimeout(() => {
                loadingScreen.classList.add('hidden');
                setTimeout(() => {
                    loadingScreen.style.display = 'none';
                }, 500);
            }, 500);
        }
    }, 100);
}

// ============================================
// CURSOR EFFECTS
// ============================================
function initCursorEffects() {
    const cursor = document.getElementById('cursor');
    const cursorFollower = document.getElementById('cursorFollower');
    
    // Mouse move event
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        
        setTimeout(() => {
            cursorFollower.style.left = e.clientX + 'px';
            cursorFollower.style.top = e.clientY + 'px';
        }, 100);
    });
    
    // Hover effects
    const hoverElements = document.querySelectorAll('a, button, .btn, .nav-link, .card, .feature-card, .portfolio-card');
    
    hoverElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursor.classList.add('hover');
            cursorFollower.style.transform = 'translate(-50%, -50%) scale(1.5)';
        });
        
        element.addEventListener('mouseleave', () => {
            cursor.classList.remove('hover');
            cursorFollower.style.transform = 'translate(-50%, -50%) scale(1)';
        });
    });
    
    // Click effect
    document.addEventListener('click', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(0.8)';
        cursorFollower.style.transform = 'translate(-50%, -50%) scale(0.8)';
        
        setTimeout(() => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1)';
            cursorFollower.style.transform = 'translate(-50%, -50%) scale(1)';
        }, 100);
    });
}

// ============================================
// THEME TOGGLE
// ============================================
function initThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    const icon = themeToggle.querySelector('i');
    
    // Check saved theme
    const savedTheme = localStorage.getItem('theme') || 'light';
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    }
    
    // Toggle theme
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        
        if (document.body.classList.contains('dark-mode')) {
            localStorage.setItem('theme', 'dark');
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        } else {
            localStorage.setItem('theme', 'light');
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        }
    });
}

// ============================================
// MOBILE MENU
// ============================================
function initMobileMenu() {
    const mobileToggle = document.getElementById('mobileToggle');
    const mobileClose = document.getElementById('mobileClose');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileLinks = document.querySelectorAll('.mobile-nav-link');
    
    // Open menu
    mobileToggle.addEventListener('click', () => {
        mobileMenu.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
    
    // Close menu
    mobileClose.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
    });
    
    // Close menu when clicking links
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
    
    // Close menu on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

// ============================================
// TYPING EFFECT
// ============================================
function initTypingEffect() {
    const typingText = document.getElementById('typingText');
    const words = [
        'नया युग',
        'भविष्य',
        'क्रांति',
        'इनोवेशन',
        'तकनीक'
    ];
    
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;
    
    function type() {
        const currentWord = words[wordIndex];
        
        if (isDeleting) {
            typingText.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            typingText.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }
        
        if (!isDeleting && charIndex === currentWord.length) {
            isDeleting = true;
            typingSpeed = 1000; // Pause at end
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typingSpeed = 500; // Pause before next word
        }
        
        setTimeout(type, typingSpeed);
    }
    
    // Start typing effect
    setTimeout(type, 1000);
}

// ============================================
// COUNTER ANIMATION
// ============================================
function initCounterAnimation() {
    const counters = document.querySelectorAll('.stat-number');
    const speed = 200;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = +counter.getAttribute('data-count');
                const count = +counter.innerText;
                const increment = target / speed;
                
                if (count < target) {
                    counter.innerText = Math.ceil(count + increment);
                    setTimeout(() => updateCounter(counter, target, count, increment), 1);
                } else {
                    counter.innerText = target;
                }
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => observer.observe(counter));
    
    function updateCounter(counter, target, count, increment) {
        const newCount = count + increment;
        if (newCount < target) {
            counter.innerText = Math.ceil(newCount);
            setTimeout(() => updateCounter(counter, target, newCount, increment), 1);
        } else {
            counter.innerText = target;
        }
    }
}

// ============================================
// SMOOTH SCROLL
// ============================================
function initSmoothScroll() {
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href === '#') return;
            
            e.preventDefault();
            const targetElement = document.querySelector(href);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Update active nav link
                document.querySelectorAll('.nav-link').forEach(link => {
                    link.classList.remove('active');
                });
                this.classList.add('active');
            }
        });
    });
    
    // Active nav link on scroll
    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollY >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// ============================================
// BACK TO TOP
// ============================================
function initBackToTop() {
    const backToTop = document.getElementById('backToTop');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });
    
    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ============================================
// PORTFOLIO FILTER
// ============================================
function initPortfolioFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Filter items
            const filter = button.getAttribute('data-filter');
            
            portfolioItems.forEach(item => {
                if (filter === 'all' || item.getAttribute('data-category') === filter) {
                    item.classList.remove('hidden');
                } else {
                    item.classList.add('hidden');
                }
            });
        });
    });
}

// ============================================
// TESTIMONIAL SLIDER
// ============================================
function initTestimonialSlider() {
    const swiper = new Swiper('.testimonialSwiper', {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        breakpoints: {
            768: {
                slidesPerView: 2,
            },
            1024: {
                slidesPerView: 3,
            },
        },
    });
}

// ============================================
// CONTACT FORM
// ============================================
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // Show success message (in real app, send to server)
            showNotification('आपका संदेश भेज दिया गया है! हम जल्द ही संपर्क करेंगे।', 'success');
            
            // Reset form
            this.reset();
            
            // Add some visual feedback
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            
            submitBtn.innerHTML = '<i class="fas fa-check"></i> भेज दिया!';
            submitBtn.style.background = '#10b981';
            
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.style.background = '';
            }, 3000);
        });
    }
}

// ============================================
// PARTICLES BACKGROUND
// ============================================
function initParticles() {
    const particlesContainer = document.getElementById('particles');
    
    if (!particlesContainer) return;
    
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        // Random properties
        const size = Math.random() * 4 + 1;
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        const duration = Math.random() * 20 + 10;
        const delay = Math.random() * 5;
        
        // Apply styles
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${posX}%`;
        particle.style.top = `${posY}%`;
        particle.style.background = getComputedStyle(document.documentElement)
            .getPropertyValue('--primary');
        particle.style.opacity = Math.random() * 0.5 + 0.1;
        particle.style.borderRadius = '50%';
        particle.style.position = 'absolute';
        particle.style.animation = `float ${duration}s ease-in-out ${delay}s infinite`;
        
        particlesContainer.appendChild(particle);
    }
}

// ============================================
// ANIMATIONS
// ============================================
function initAnimations() {
    // Floating cube animation
    const cube = document.querySelector('.cube');
    if (cube) {
        let x = 0;
        let y = 0;
        
        document.addEventListener('mousemove', (e) => {
            x = (e.clientX / window.innerWidth - 0.5) * 20;
            y = (e.clientY / window.innerHeight - 0.5) * 20;
            
            cube.style.transform = `rotateX(${y}deg) rotateY(${x}deg)`;
        });
    }
    
    // Orbit animations
    const orbits = document.querySelectorAll('.orbit');
    orbits.forEach((orbit, index) => {
        const dot = orbit.querySelector('.orbit-dot');
        let angle = 0;
        const radius = orbit.offsetWidth / 2;
        const speed = 0.5 + index * 0.2;
        
        function animateOrbit() {
            angle += speed;
            const x = Math.cos(angle * Math.PI / 180) * radius;
            const y = Math.sin(angle * Math.PI / 180) * radius;
            
            if (dot) {
                dot.style.transform = `translate(${x}px, ${y}px)`;
            }
            
            requestAnimationFrame(animateOrbit);
        }
        
        animateOrbit();
    });
}

// ============================================
// SCROLL ANIMATIONS
// ============================================
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('aos-animate');
            }
        });
    }, observerOptions);
    
    // Observe all elements with data-aos attribute
    document.querySelectorAll('[data-aos]').forEach(el => observer.observe(el));
}

// ============================================
// NOTIFICATION SYSTEM
// ============================================
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existing = document.querySelector('.notification');
    if (existing) existing.remove();
    
    // Create notification
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
        <span>${message}</span>
        <button class="notification-close"><i class="fas fa-times"></i></button>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : '#6366f1'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 0.5rem;
        display: flex;
        align-items: center;
        gap: 0.75rem;
        z-index: 9999;
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        animation: slideIn 0.3s ease;
    `;
    
    // Add to DOM
    document.body.appendChild(notification);
    
    // Close button
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Add notification styles
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
    
    .notification-close {
        background: none;
        border: none;
        color: white;
        cursor: pointer;
        margin-left: auto;
        padding: 0;
    }
`;
document.head.appendChild(style);

// ============================================
// SERVICE TABS
// ============================================
function initServiceTabs() {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons and panes
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabPanes.forEach(pane => pane.classList.remove('active'));
            
            // Add active class to clicked button
            button.classList.add('active');
            
            // Show corresponding pane
            const tabId = button.getAttribute('data-tab');
            const tabPane = document.getElementById(`${tabId}-tab`);
            if (tabPane) {
                tabPane.classList.add('active');
            }
        });
    });
}

// Initialize service tabs
initServiceTabs();

// ============================================
// PARALLAX EFFECT
// ============================================
function initParallax() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.parallax');
        
        parallaxElements.forEach(element => {
            const speed = element.getAttribute('data-speed') || 0.5;
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    });
}

// Initialize parallax
initParallax();

// ============================================
// FORM VALIDATION
// ============================================
function initFormValidation() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            let isValid = true;
            const requiredFields = this.querySelectorAll('[required]');
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    field.style.borderColor = '#ef4444';
                    isValid = false;
                    
                    // Add error message
                    if (!field.nextElementSibling?.classList.contains('error-message')) {
                        const error = document.createElement('div');
                        error.className = 'error-message';
                        error.textContent = 'यह फ़ील्ड आवश्यक है';
                        error.style.color = '#ef4444';
                        error.style.fontSize = '0.8rem';
                        error.style.marginTop = '0.25rem';
                        field.parentNode.appendChild(error);
                    }
                } else {
                    field.style.borderColor = '';
                    
                    // Remove error message
                    const error = field.nextElementSibling;
                    if (error?.classList.contains('error-message')) {
                        error.remove();
                    }
                }
            });
            
            if (!isValid) {
                e.preventDefault();
                showNotification('कृपया सभी आवश्यक फ़ील्ड भरें', 'error');
            }
        });
        
        // Real-time validation
        const inputs = form.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            input.addEventListener('input', () => {
                if (input.value.trim()) {
                    input.style.borderColor = '#10b981';
                } else {
                    input.style.borderColor = '';
                }
            });
        });
    });
}

// Initialize form validation
initFormValidation();

// ============================================
// LAZY LOADING IMAGES
// ============================================
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.getAttribute('data-src');
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading
initLazyLoading();

// ============================================
// KEYBOARD SHORTCUTS
// ============================================
function initKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
        // Ctrl/Cmd + K to focus search
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            const searchInput = document.querySelector('input[type="search"]');
            if (searchInput) searchInput.focus();
        }
        
        // Escape to close modals
        if (e.key === 'Escape') {
            const openModals = document.querySelectorAll('.modal.open, .mobile-menu.active');
            openModals.forEach(modal => {
                modal.classList.remove('open', 'active');
                document.body.style.overflow = '';
            });
        }
        
        // Ctrl/Cmd + / for help
        if ((e.ctrlKey || e.metaKey) && e.key === '/') {
            e.preventDefault();
            showNotification('कीबोर्ड शॉर्टकट: Ctrl+K (सर्च), Escape (क्लोज)', 'info');
        }
    });
}

// Initialize keyboard shortcuts
initKeyboardShortcuts();

// ============================================
// PERFORMANCE OPTIMIZATION
// ============================================
function initPerformance() {
    // Debounce scroll events
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            // Do heavy operations here
        }, 100);
    });
    
    // Throttle resize events
    let resizeTimeout;
    window.addEventListener('resize', () => {
        if (!resizeTimeout) {
            resizeTimeout = setTimeout(() => {
                resizeTimeout = null;
                // Handle resize
            }, 200);
        }
    });
}

// Initialize performance optimizations
initPerformance();

// ============================================
// OFFLINE DETECTION
// ============================================
function initOfflineDetection() {
    window.addEventListener('online', () => {
        showNotification('इंटरनेट कनेक्शन बहाल किया गया', 'success');
    });
    
    window.addEventListener('offline', () => {
        showNotification('आप ऑफलाइन हैं। कुछ सुविधाएं सीमित हो सकती हैं।', 'warning');
    });
}

// Initialize offline detection
initOfflineDetection();

// ============================================
// PWA FEATURES
// ============================================
function initPWA() {
    // Check if PWA is installable
    let deferredPrompt;
    
    window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault();
        deferredPrompt = e;
        
        // Show install button
        const installBtn = document.createElement('button');
        installBtn.className = 'install-btn';
        installBtn.innerHTML = '<i class="fas fa-download"></i> ऐप इंस्टॉल करें';
        installBtn.style.cssText = `
            position: fixed;
            bottom: 80px;
            right: 20px;
            background: var(--gradient-primary);
            color: white;
            border: none;
            padding: 0.75rem 1.5rem;
            border-radius: 0.5rem;
            cursor: pointer;
            z-index: 999;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        `;
        
        installBtn.addEventListener('click', async () => {
            if (deferredPrompt) {
                deferredPrompt.prompt();
                const { outcome } = await deferredPrompt.userChoice;
                if (outcome === 'accepted') {
                    installBtn.remove();
                }
                deferredPrompt = null;
            }
        });
        
        document.body.appendChild(installBtn);
        
        // Auto hide after 10 seconds
        setTimeout(() => {
            if (installBtn.parentNode) {
                installBtn.remove();
            }
        }, 10000);
    });
}

// Initialize PWA features
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js').catch(() => {
            console.log('Service Worker registration failed');
        });
    });
}

// Initialize PWA
initPWA();

// ============================================
// ANALYTICS
// ============================================
function initAnalytics() {
    // Track page views
    const trackPageView = () => {
        if (typeof gtag !== 'undefined') {
            gtag('config', 'GA_MEASUREMENT_ID', {
                page_path: window.location.pathname,
            });
        }
    };
    
    // Track events
    const trackEvent = (category, action, label) => {
        if (typeof gtag !== 'undefined') {
            gtag('event', action, {
                event_category: category,
                event_label: label,
            });
        }
    };
    
    // Track button clicks
    document.querySelectorAll('.btn, .nav-link').forEach(button => {
        button.addEventListener('click', () => {
            const label = button.textContent || button.getAttribute('aria-label');
            trackEvent('engagement', 'click', label);
        });
    });
    
    // Track form submissions
    document.querySelectorAll('form').forEach(form => {
        form.addEventListener('submit', () => {
            trackEvent('conversion', 'form_submit', form.id);
        });
    });
    
    // Initial page view
    trackPageView();
}

// Initialize analytics
initAnalytics();

// ============================================
// ERROR HANDLING
// ============================================
function initErrorHandling() {
    // Global error handler
    window.addEventListener('error', (e) => {
        console.error('Global error:', e.error);
        
        // Don't show error for external resources
        if (e.message.includes('Failed to load resource')) return;
        
        // Show user-friendly error
        showNotification('कुछ तकनीकी समस्या आई। पेज रीलोड करें।', 'error');
    });
    
    // Unhandled promise rejections
    window.addEventListener('unhandledrejection', (e) => {
        console.error('Unhandled promise rejection:', e.reason);
        showNotification('सिस्टम त्रुटि। कृपया पुनः प्रयास करें।', 'error');
    });
}

// Initialize error handling
initErrorHandling();

// ============================================
// WEBSOCKET (REAL-TIME UPDATES)
// ============================================
function initWebSocket() {
    // Only initialize if WebSocket is supported
    if (!('WebSocket' in window)) return;
    
    // Try to connect to WebSocket server
    try {
        const ws = new WebSocket('wss://your-websocket-server.com');
        
        ws.onopen = () => {
            console.log('WebSocket connected');
            showNotification('रियल-टाइम अपडेट सक्रिय', 'success');
        };
        
        ws.onmessage = (event) => {
            const data = JSON.parse(event.data);
            
            // Handle different types of messages
            switch (data.type) {
                case 'notification':
                    showNotification(data.message, data.level);
                    break;
                case 'update':
                    // Update UI based on data
                    break;
            }
        };
        
        ws.onclose = () => {
            console.log('WebSocket disconnected');
            // Try to reconnect after 5 seconds
            setTimeout(initWebSocket, 5000);
        };
        
        ws.onerror = (error) => {
            console.error('WebSocket error:', error);
        };
    } catch (error) {
        console.error('WebSocket initialization failed:', error);
    }
}

// Uncomment to enable WebSocket (requires server)
// initWebSocket();

// ============================================
// FINAL INITIALIZATION
// ============================================
console.log(`
╔═══════════════════════════════════════╗
║      NeoWeb Pro Initialized          ║
║      Version: 2.0.0                  ║
║      Features:                       ║
║      • Quantum Effects               ║
║      • AI Integration                ║
║      • Real-time Updates             ║
║      • Advanced Animations           ║
║      • PWA Support                   ║
╚═══════════════════════════════════════╝
`);
