// ========================================
// MODERN PHOTOGRAPHY PORTFOLIO - JAVASCRIPT
// ======================================== 

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Close mobile menu if open
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });
});

// Mobile Navigation Toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// ========================================
// ANIMATED COUNTER FOR STATS
// ========================================
const animateCounter = (element, target) => {
    const duration = 2000; // 2 seconds
    const start = 0;
    const increment = target / (duration / 16); // 60fps
    let current = start;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            let finalText = target.toLocaleString();
            if (target === 500 || target === 10000) {
                finalText += '+';
            }
            element.textContent = finalText;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current).toLocaleString();
        }
    }, 16);
};

// ========================================
// LIGHTBOX FUNCTIONALITY
// ========================================
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const closeBtn = document.querySelector('.lightbox-close');
const galleryItems = document.querySelectorAll('.gallery-item');

galleryItems.forEach(item => {
    item.addEventListener('click', () => {
        const img = item.querySelector('img');
        if (img) {
            lightbox.style.display = 'flex';
            // Slight delay to allow display flex to apply before opacity transition
            setTimeout(() => {
                lightbox.classList.add('active');
            }, 10);
            lightboxImg.src = img.src;
            // Disable scrolling
            document.body.style.overflow = 'hidden';
        }
    });
});

const closeLightbox = () => {
    lightbox.classList.remove('active');
    setTimeout(() => {
        lightbox.style.display = 'none';
        // Enable scrolling
        document.body.style.overflow = 'auto';
    }, 300); // Match transition duration
};

if (closeBtn) {
    closeBtn.addEventListener('click', closeLightbox);
}

// Close on background click
if (lightbox) {
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
}

// Intersection Observer for stats animation
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Handle both old stat-number and new stat-number-small
            const statNumbers = entry.target.querySelectorAll('.stat-number, .stat-number-small');
            statNumbers.forEach(stat => {
                const target = parseInt(stat.getAttribute('data-target'));
                animateCounter(stat, target);
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

// Observe both stats section and about-stats
const statsSection = document.querySelector('.stats');
const aboutStats = document.querySelector('.about-stats');
if (statsSection) {
    statsObserver.observe(statsSection);
}
if (aboutStats) {
    statsObserver.observe(aboutStats);
}

// ========================================
// PACKAGE TABS FUNCTIONALITY
// ========================================
const packageTabs = document.querySelectorAll('.package-tab');
const packageCategories = document.querySelectorAll('.package-category');

packageTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        const category = tab.getAttribute('data-category');

        // Remove active class from all tabs
        packageTabs.forEach(t => t.classList.remove('active'));
        // Add active class to clicked tab
        tab.classList.add('active');

        // Hide all package categories
        packageCategories.forEach(cat => cat.classList.remove('active'));
        // Show selected category
        const selectedCategory = document.querySelector(`.package-category[data-category="${category}"]`);
        if (selectedCategory) {
            selectedCategory.classList.add('active');
        }
    });
});

// ========================================
// PACKAGE CARD CLICK HANDLERS
// ========================================
const packageBtns = document.querySelectorAll('.package-btn');

packageBtns.forEach(btn => {
    btn.addEventListener('click', function () {
        const packageCard = this.closest('.package-card');
        const packageCategory = packageCard.closest('.package-category');

        // Get package details
        const packageTitle = packageCard.querySelector('.package-title').textContent.trim();
        const packagePrice = packageCard.querySelector('.amount').textContent.trim();
        const packageTier = packageCard.querySelector('.package-tier')
            ? packageCard.querySelector('.package-tier').textContent.trim()
            : 'Standard';

        // Get category from parent
        const category = packageCategory.getAttribute('data-category');

        // Create package identifier (e.g., "engagement-gold")
        const packageValue = `${category}-${packageTier.toLowerCase()}`;
        const fullPackageName = `${packageTitle} - ${packageTier}`;

        // Scroll to contact form
        const contactSection = document.getElementById('contact');
        contactSection.scrollIntoView({ behavior: 'smooth' });

        // Pre-fill the form with package details after scroll
        setTimeout(() => {
            const displayElement = document.getElementById('packageDisplay');
            const valueElement = document.getElementById('packageValue');
            const messageElement = document.getElementById('messageText');

            const displayText = `${fullPackageName} (₹${packagePrice})`;

            if (displayElement) {
                // Show the package in the display field
                displayElement.value = displayText;

                // Highlight the field
                displayElement.style.borderColor = 'var(--gold-primary)';
                displayElement.style.boxShadow = '0 0 20px rgba(255, 215, 0, 0.3)';
                displayElement.style.background = 'rgba(255, 215, 0, 0.1)';
                setTimeout(() => {
                    displayElement.style.borderColor = '';
                    displayElement.style.boxShadow = '';
                    displayElement.style.background = '';
                }, 2000);
            }

            if (valueElement) {
                // Store the value in hidden field
                valueElement.value = packageValue;
            }

            if (messageElement) {
                // Pre-fill message with package details
                const message = `Hi! I'm interested in the ${fullPackageName} package (₹${packagePrice}). Could you please provide more details about this package and availability?`;
                messageElement.value = message;

                // Highlight the message field
                messageElement.style.borderColor = 'var(--gold-primary)';
                messageElement.style.boxShadow = '0 0 20px rgba(255, 215, 0, 0.3)';
                setTimeout(() => {
                    messageElement.style.borderColor = '';
                    messageElement.style.boxShadow = '';
                }, 2000);
            }
        }, 800);

        // Show notification
        showNotification(`You selected ${fullPackageName} package - ₹${packagePrice}`);
    });
});

// ========================================
// CONTACT FORM HANDLER
// ========================================
const contactForm = document.querySelector('.contact-form');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Get form data
    const formData = new FormData(contactForm);
    const displayElement = document.getElementById('packageDisplay');
    const valueElement = document.getElementById('packageValue');
    const messageElement = document.getElementById('messageText');

    // Get form field values
    const name = formData.get('name') || document.querySelector('input[type="text"]')?.value || '';
    const email = formData.get('email') || document.querySelector('input[type="email"]')?.value || '';
    const phone = formData.get('phone') || document.querySelector('input[type="tel"]')?.value || '';

    // Get selected package details
    const selectedPackageDisplay = displayElement ? displayElement.value : '';
    const packageValue = valueElement ? valueElement.value : '';
    const message = messageElement ? messageElement.value : '';

    // Check if package is selected
    if (!packageValue) {
        showNotification('Please select a package from the Packages section above!', 'info');
        // Scroll to packages
        document.getElementById('packages').scrollIntoView({ behavior: 'smooth' });
        return;
    }

    // Create submission data
    const submissionData = {
        name: name,
        email: email,
        phone: phone,
        packageValue: packageValue,
        packageDisplay: selectedPackageDisplay,
        message: message
    };

    // Create WhatsApp message
    const whatsappNumber = '919042614414'; // Your WhatsApp number (with country code, no + or spaces)

    // Format the message for WhatsApp
    const whatsappMessage = `*New Photography Inquiry*\n\n` +
        `*Name:* ${name}\n` +
        `*Email:* ${email}\n` +
        `*Phone:* ${phone}\n` +
        `*Selected Package:* ${selectedPackageDisplay}\n\n` +
        `*Message:*\n${message}`;

    // Encode the message for URL
    const encodedMessage = encodeURIComponent(whatsappMessage);

    // Create WhatsApp URL
    const whatsappURL = `https://wa.me/${9042614414}?text=${encodedMessage}`;

    // Show success notification
    showNotification(`Redirecting to WhatsApp for ${selectedPackageDisplay}...`, 'success');

    // Log submission data to console
    console.log('=== PACKAGE INQUIRY SUBMISSION ===');
    console.log('Full Submission Data:', submissionData);
    console.log('Selected Package:', selectedPackageDisplay);
    console.log('Package Code:', packageValue);
    console.log('WhatsApp URL:', whatsappURL);
    console.log('================================');

    // Open WhatsApp in new tab after a short delay
    setTimeout(() => {
        window.open(whatsappURL, '_blank');

        // Reset form (but keep package selection visible)
        const packageDisplayValue = displayElement.value;
        const packageValueValue = valueElement.value;
        contactForm.reset();
        if (displayElement) displayElement.value = packageDisplayValue;
        if (valueElement) valueElement.value = packageValueValue;
    }, 1000);
});

// ========================================
// NOTIFICATION SYSTEM
// ========================================
function showNotification(message, type = 'info') {
    // Remove any existing notification
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
        <span>${message}</span>
    `;

    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: rgba(255, 215, 0, 0.95);
        color: #0a0a0a;
        padding: 1rem 1.5rem;
        border-radius: 12px;
        box-shadow: 0 8px 32px rgba(255, 215, 0, 0.4);
        z-index: 9999;
        display: flex;
        align-items: center;
        gap: 0.75rem;
        font-weight: 600;
        animation: slideInRight 0.3s ease-out;
        backdrop-filter: blur(10px);
    `;

    document.body.appendChild(notification);

    // Auto remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add notification animations to document
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ========================================
// SCROLL ANIMATIONS
// ========================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all sections and cards
document.querySelectorAll('.section-header, .stat-card, .gallery-item, .package-card, .contact-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    scrollObserver.observe(el);
});

// ========================================
// WHATSAPP BUTTON VISIBILITY
// ========================================
const whatsappBtn = document.getElementById('whatsappFloat');

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        whatsappBtn.style.opacity = '1';
        whatsappBtn.style.visibility = 'visible';
    } else {
        whatsappBtn.style.opacity = '0';
        whatsappBtn.style.visibility = 'hidden';
    }
});

// ========================================
// PARALLAX EFFECT FOR HERO IMAGE
// ========================================
const heroImage = document.querySelector('.hero-image');

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxSpeed = 0.5;

    if (heroImage && scrolled < window.innerHeight) {
        heroImage.style.transform = `translateY(${scrolled * parallaxSpeed}px) scale(1.1)`;
    }
});

// ========================================
// CUSTOM CURSOR EFFECT (OPTIONAL)
// ========================================




// ========================================
// PAGE LOAD ANIMATIONS
// ========================================
window.addEventListener('load', () => {
    // Hide loading screen if you add one
    document.body.style.overflow = 'visible';

    // Trigger initial animations
    setTimeout(() => {
        document.querySelectorAll('.hero-content > *').forEach((el, index) => {
            el.style.animationDelay = `${index * 0.2}s`;
        });
    }, 100);
});

// ========================================
// PERFORMANCE OPTIMIZATION
// ========================================
// Debounce function for scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Optimize scroll event listener
const optimizedScroll = debounce(() => {
    // Your scroll logic here
}, 10);

window.addEventListener('scroll', optimizedScroll);

console.log('Photography Portfolio loaded successfully! 📸✨');
