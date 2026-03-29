// Mirror Language Website Scripts

document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            e.preventDefault();
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Tab functionality for examples
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');

            // Remove active class from all
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));

            // Add active class to selected
            this.classList.add('active');
            document.getElementById(targetTab).classList.add('active');
        });
    });

    // Highlight current section in nav
    highlightCurrentSection();

    // Animate elements on scroll
    animateOnScroll();
});

// Highlight current section in navigation
function highlightCurrentSection() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');
    
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.style.color = '';
            if (link.getAttribute('href') === '#' + current) {
                link.style.color = 'var(--primary)';
            }
        });
    });
}

// Animate elements on scroll
function animateOnScroll() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    });
    
    // Observe feature cards
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `all 0.6s ease ${index * 0.1}s`;
        observer.observe(card);
    });
    
    // Observe lib categories
    const libCategories = document.querySelectorAll('.lib-category');
    libCategories.forEach((cat, index) => {
        cat.style.opacity = '0';
        cat.style.transform = 'translateY(30px)';
        cat.style.transition = `all 0.6s ease ${index * 0.1}s`;
        observer.observe(cat);
    });
}

// Download tracking
function trackDownload() {
    // Visual feedback is handled by initDownload()
}

// Initialize download tracking
trackDownload();

// Mobile menu toggle (for future implementation)
function toggleMobileMenu() {
    const navMenu = document.querySelector('.nav-menu');
    navMenu.classList.toggle('active');
}

// Syntax highlighting helper
function highlightSyntax(code) {
    const keywords = ['var', 'func', 'ret', 'echo', 'ask', 'use', 'if', 'else', 'switch', 'case', 'default', 'for', 'in', 'while', 'loop', 'try', 'catch', 'finally', 'raise', 'stop', 'next', 'yes', 'no', 'nil'];
    
    keywords.forEach(keyword => {
        const regex = new RegExp(`\\b${keyword}\\b`, 'g');
        code = code.replace(regex, `<span class="keyword">${keyword}</span>`);
    });
    
    // Highlight strings
    code = code.replace(/(["'])(?:(?=(\\?))\2.)*?\1/g, '<span class="string">$&</span>');
    
    // Highlight numbers
    code = code.replace(/\b\d+(\.\d+)?\b/g, '<span class="number">$&</span>');
    
    // Highlight comments
    code = code.replace(/(#|\/\/).*$/gm, '<span class="comment">$&</span>');
    
    return code;
}

// Form handling for future newsletter/contact forms
function initForms() {
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            // Handle form submission
            console.log('Form submitted');
        });
    });
}

// Lazy loading for images (for future implementation)
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Initialize on load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        initForms();
        initLazyLoading();
        initDownload();
    });
} else {
    initForms();
    initLazyLoading();
    initDownload();
}

// Download handler
function initDownload() {
    const downloadBtn = document.querySelector('.btn-download');
    if (downloadBtn) {
        downloadBtn.addEventListener('click', function(e) {
            // Visual feedback
            const originalText = this.innerHTML;
            this.innerHTML = '⬇️ Загрузка...';
            setTimeout(() => {
                this.innerHTML = '✅ Загрузка началась!';
            }, 1000);
            setTimeout(() => {
                this.innerHTML = originalText;
            }, 3000);
        });
    }
}

console.log('🪞 Mirror Language Website Loaded Successfully!');
