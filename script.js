/**
 * Luminous Nix - Main JavaScript
 * Features: Mobile menu, dark mode, terminal animation, PWA, Ko-fi widget
 */

// Dark Mode Toggle
function initTheme() {
    const theme = localStorage.getItem('theme') ||
                  (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
    document.documentElement.setAttribute('data-theme', theme);
    updateThemeIcon(theme);
}

function toggleTheme() {
    const current = document.documentElement.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
    updateThemeIcon(next);
}

function updateThemeIcon(theme) {
    const toggle = document.getElementById('theme-toggle');
    if (toggle) {
        toggle.textContent = theme === 'dark' ? '☀️' : '🌙';
        toggle.setAttribute('aria-label', `Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`);
    }
}

// High Contrast Mode Toggle (Phase 10)
function initHighContrast() {
    const contrast = localStorage.getItem('contrast') || 'normal';
    document.documentElement.setAttribute('data-contrast', contrast);
    updateContrastIcon(contrast);
}

function toggleHighContrast() {
    const current = document.documentElement.getAttribute('data-contrast');
    const next = current === 'high' ? 'normal' : 'high';
    document.documentElement.setAttribute('data-contrast', next);
    localStorage.setItem('contrast', next);
    updateContrastIcon(next);

    // Track high contrast usage
    trackEvent('Accessibility', 'High Contrast', next);
}

function updateContrastIcon(contrast) {
    const toggle = document.getElementById('contrast-toggle');
    if (toggle) {
        toggle.textContent = contrast === 'high' ? '⚪' : '⚫';
        toggle.setAttribute('aria-label', `${contrast === 'high' ? 'Disable' : 'Enable'} high contrast mode`);
        toggle.setAttribute('aria-pressed', contrast === 'high' ? 'true' : 'false');
    }
}

// Mobile Menu Toggle
function initMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', function() {
            const isOpen = navLinks.classList.toggle('active');
            this.setAttribute('aria-expanded', isOpen);
        });

        // Close menu when clicking links
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                mobileMenuBtn.setAttribute('aria-expanded', 'false');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!mobileMenuBtn.contains(e.target) && !navLinks.contains(e.target)) {
                navLinks.classList.remove('active');
                mobileMenuBtn.setAttribute('aria-expanded', 'false');
            }
        });
    }
}

// Terminal Animation - cycle through different commands
function initTerminalAnimation() {
    const terminalContent = document.querySelector('.terminal-content');
    if (!terminalContent) return;

    const commands = [
        {
            input: 'ask-nix "install a web browser"',
            output: '🔍 Understanding your request...\n📦 Found: firefox, chromium, brave\n💡 Recommending: firefox (most popular, open-source)\n\nWould you like to install firefox? [Y/n]',
            response: 'Y',
            result: '✨ Installing firefox...\n✅ Successfully installed! Run \'firefox\' to start.'
        },
        {
            input: 'ask-nix "install photo editor"',
            output: '🔍 Searching packages...\n📦 Found: gimp, krita, darktable\n💡 Recommending: gimp (powerful, feature-rich)\n\nInstall gimp? [Y/n]',
            response: 'Y',
            result: '✨ Installing gimp...\n✅ Done! Run \'gimp\' to start editing.'
        },
        {
            input: 'ask-nix "set up rust development"',
            output: '🦀 Configuring Rust environment...\n📦 Installing: cargo, rustc, rust-analyzer\n💡 Setting up VS Code integration...\n\nContinue? [Y/n]',
            response: 'Y',
            result: '✨ Installing packages...\n✅ Ready to code! Try \'cargo new my-project\'.'
        }
    ];

    let currentIndex = 0;

    function updateTerminal() {
        const cmd = commands[currentIndex];
        terminalContent.innerHTML = `
            <div>
                <span class="terminal-prompt">$</span>
                <span class="terminal-input"> ${cmd.input}</span>
            </div>
            <div class="terminal-output">
                ${cmd.output.replace(/\n/g, '<br>')}
            </div>
            <div>
                <span class="terminal-prompt">$</span>
                <span class="terminal-input"> ${cmd.response}</span>
            </div>
            <div class="terminal-output">
                ${cmd.result.replace(/\n/g, '<br>')}
            </div>
            <div>
                <span class="terminal-prompt">$</span>
                <span class="cursor"></span>
            </div>
        `;
        currentIndex = (currentIndex + 1) % commands.length;
    }

    // Cycle every 8 seconds
    setInterval(updateTerminal, 8000);
}

// Form Enhancement with loading states
function initFormEnhancements() {
    const form = document.querySelector('.beta-form');
    if (!form) return;

    const submitBtn = form.querySelector('.submit-btn');
    const emailInput = document.getElementById('email');

    // Add visual feedback on submit
    form.addEventListener('submit', function(e) {
        if (submitBtn) {
            // Add loading state
            submitBtn.classList.add('btn-loading');
            submitBtn.disabled = true;
            submitBtn.setAttribute('aria-busy', 'true');

            // Announce to screen readers
            const announcement = document.createElement('div');
            announcement.className = 'visually-hidden';
            announcement.setAttribute('role', 'status');
            announcement.setAttribute('aria-live', 'polite');
            announcement.textContent = 'Submitting beta signup form...';
            form.appendChild(announcement);
        }

        // Disable all inputs during submission
        const inputs = form.querySelectorAll('input, select, textarea');
        inputs.forEach(input => input.disabled = true);
    });

    // Real-time email validation
    if (emailInput) {
        emailInput.addEventListener('blur', function() {
            if (this.value && !this.validity.valid) {
                this.setCustomValidity('Please enter a valid email address');
                this.reportValidity();
            } else {
                this.setCustomValidity('');
            }
        });

        // Remove error styling on input
        emailInput.addEventListener('input', function() {
            this.classList.remove('error');
        });
    }
}

// Service Worker Registration for PWA
function initServiceWorker() {
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('/sw.js')
                .then((registration) => {
                    console.log('✅ Service Worker registered:', registration.scope);
                })
                .catch((error) => {
                    console.log('❌ Service Worker registration failed:', error);
                });
        });
    }
}

// Ko-fi Widget Initialization
function initKofiWidget() {
    if (typeof kofiWidgetOverlay !== 'undefined') {
        kofiWidgetOverlay.draw('luminousdynamics', {
            'type': 'floating-chat',
            'floating-chat.donateButton.text': '☕',
            'floating-chat.donateButton.background-color': '#5277C3',
            'floating-chat.donateButton.text-color': '#fff'
        });
    }
}

// Performance Monitoring (optional)
function initPerformanceMonitoring() {
    if ('PerformanceObserver' in window) {
        try {
            // Monitor Largest Contentful Paint
            const lcpObserver = new PerformanceObserver((list) => {
                const entries = list.getEntries();
                const lastEntry = entries[entries.length - 1];
                console.log('LCP:', lastEntry.renderTime || lastEntry.loadTime);
            });
            lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

            // Monitor First Input Delay
            const fidObserver = new PerformanceObserver((list) => {
                const entries = list.getEntries();
                entries.forEach((entry) => {
                    console.log('FID:', entry.processingStart - entry.startTime);
                });
            });
            fidObserver.observe({ entryTypes: ['first-input'] });

            // Monitor Cumulative Layout Shift
            let clsScore = 0;
            const clsObserver = new PerformanceObserver((list) => {
                for (const entry of list.getEntries()) {
                    if (!entry.hadRecentInput) {
                        clsScore += entry.value;
                        console.log('CLS:', clsScore);
                    }
                }
            });
            clsObserver.observe({ entryTypes: ['layout-shift'] });
        } catch (e) {
            // Performance monitoring is optional, fail silently
            console.log('Performance monitoring unavailable');
        }
    }
}

// Analytics Event Tracking (privacy-respecting)
function trackEvent(category, action, label = '') {
    // Placeholder for privacy-respecting analytics
    // Could integrate with Plausible, Fathom, or similar
    console.log('Event:', category, action, label);
}

// Initialize everything on DOMContentLoaded
document.addEventListener('DOMContentLoaded', function() {
    initTheme();
    initMobileMenu();
    initTerminalAnimation();
    initFormEnhancements();
    initServiceWorker();
    initKofiWidget();

    // Optional: Enable performance monitoring in development
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        initPerformanceMonitoring();
    }

    // Add theme toggle event listener
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }

    // Track page load
    trackEvent('Page', 'Load', window.location.pathname);
});

// Listen for system theme changes
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
        const theme = e.matches ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', theme);
        updateThemeIcon(theme);
    }
});

// Fetch GitHub Stats with skeleton loading
async function fetchGitHubStats() {
    const statElements = ['github-stars', 'github-forks', 'github-contributors'];

    // Show skeleton loading states
    statElements.forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            element.classList.add('skeleton', 'skeleton-text');
            element.textContent = '...';
            element.setAttribute('aria-live', 'polite');
            element.setAttribute('aria-busy', 'true');
        }
    });

    try {
        const response = await fetch('https://api.github.com/repos/Luminous-Dynamics/luminous-nix');
        if (!response.ok) throw new Error('GitHub API request failed');

        const data = await response.json();

        // Update stars
        const starsElement = document.getElementById('github-stars');
        if (starsElement) {
            starsElement.classList.remove('skeleton', 'skeleton-text');
            starsElement.textContent = (data.stargazers_count || 0).toLocaleString();
            starsElement.setAttribute('aria-busy', 'false');
        }

        // Update forks
        const forksElement = document.getElementById('github-forks');
        if (forksElement) {
            forksElement.classList.remove('skeleton', 'skeleton-text');
            forksElement.textContent = (data.forks_count || 0).toLocaleString();
            forksElement.setAttribute('aria-busy', 'false');
        }

        // Fetch contributors
        const contributorsResponse = await fetch(data.contributors_url);
        if (contributorsResponse.ok) {
            const contributors = await contributorsResponse.json();
            const contributorsElement = document.getElementById('github-contributors');
            if (contributorsElement) {
                contributorsElement.classList.remove('skeleton', 'skeleton-text');
                contributorsElement.textContent = contributors.length.toLocaleString();
                contributorsElement.setAttribute('aria-busy', 'false');
            }
        }

        trackEvent('GitHub', 'Stats Loaded', 'Success');
    } catch (error) {
        console.log('Could not fetch GitHub stats:', error.message);
        // Remove skeleton and show fallback values
        const placeholders = {
            'github-stars': '100+',
            'github-forks': '20+',
            'github-contributors': '5+'
        };
        Object.entries(placeholders).forEach(([id, value]) => {
            const element = document.getElementById(id);
            if (element) {
                element.classList.remove('skeleton', 'skeleton-text');
                element.textContent = value;
                element.setAttribute('aria-busy', 'false');
            }
        });
    }
}

// Social Sharing
function initSocialSharing() {
    const shareButtons = document.querySelectorAll('.share-btn[data-share]');
    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent('Luminous Nix - Natural Language NixOS');
    const text = encodeURIComponent('Make NixOS accessible through natural language! 10,000x faster package management.');

    const shareUrls = {
        twitter: `https://twitter.com/intent/tweet?url=${url}&text=${text}`,
        linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
        reddit: `https://reddit.com/submit?url=${url}&title=${title}`,
        hackernews: `https://news.ycombinator.com/submitlink?u=${url}&t=${title}`
    };

    shareButtons.forEach(button => {
        const platform = button.getAttribute('data-share');
        button.addEventListener('click', () => {
            const shareUrl = shareUrls[platform];
            if (shareUrl) {
                window.open(shareUrl, '_blank', 'width=600,height=400');
                trackEvent('Share', 'Click', platform);
            }
        });
    });

    // Web Share API (native sharing on mobile)
    const nativeShareBtn = document.getElementById('native-share-btn');
    if (navigator.share && nativeShareBtn) {
        nativeShareBtn.style.display = 'flex';
        nativeShareBtn.addEventListener('click', async () => {
            try {
                await navigator.share({
                    title: 'Luminous Nix - Natural Language NixOS',
                    text: 'Make NixOS accessible through natural language! 10,000x faster package management.',
                    url: window.location.href
                });
                trackEvent('Share', 'Native Share', 'Success');
            } catch (error) {
                if (error.name !== 'AbortError') {
                    console.log('Share failed:', error);
                }
            }
        });
    }
}

// Newsletter Form Enhancement with loading states
function initNewsletterForm() {
    const form = document.getElementById('newsletter-form');
    if (!form) return;

    const submitBtn = form.querySelector('.newsletter-btn');
    const emailInput = form.querySelector('input[type="email"]');

    form.addEventListener('submit', function(e) {
        if (submitBtn) {
            // Add loading state
            submitBtn.classList.add('btn-loading');
            submitBtn.disabled = true;
            submitBtn.setAttribute('aria-busy', 'true');

            // Announce to screen readers
            const announcement = document.createElement('div');
            announcement.className = 'visually-hidden';
            announcement.setAttribute('role', 'status');
            announcement.setAttribute('aria-live', 'polite');
            announcement.textContent = 'Subscribing to newsletter...';
            form.appendChild(announcement);
        }

        if (emailInput) {
            emailInput.disabled = true;
        }

        // Track newsletter signup attempt
        trackEvent('Newsletter', 'Subscribe Attempt', emailInput?.value ? 'With Email' : 'No Email');

        // Note: Actual submission happens via Formspree
        // Re-enable button after submission (Formspree handles redirect or error)
        setTimeout(() => {
            if (submitBtn) {
                submitBtn.classList.remove('btn-loading');
                submitBtn.disabled = false;
                submitBtn.setAttribute('aria-busy', 'false');
            }
            if (emailInput) {
                emailInput.disabled = false;
            }
        }, 3000);
    });

    // Add visual feedback on input
    if (emailInput) {
        emailInput.addEventListener('input', function() {
            this.classList.remove('error');
        });
    }
}

// Scroll-triggered Animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    // Observe elements that should animate on scroll
    const animatedElements = document.querySelectorAll(
        '.feature-card, .testimonial-card, .persona-card, .comparison-row, .stat-badge'
    );

    animatedElements.forEach(el => observer.observe(el));
}

// Lazy Loading Images (for future use when images are added)
function initLazyLoading() {
    if ('loading' in HTMLImageElement.prototype) {
        // Browser supports native lazy loading
        const images = document.querySelectorAll('img[loading="lazy"]');
        images.forEach(img => {
            img.src = img.dataset.src || img.src;
        });
    } else {
        // Fallback for browsers that don't support lazy loading
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.classList.add('loaded');
                    imageObserver.unobserve(img);
                }
            });
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
}

// Copy Code Blocks
function initCodeCopyButtons() {
    document.querySelectorAll('.code-block').forEach(block => {
        // Skip if already has a copy button
        if (block.querySelector('.copy-btn')) return;

        const button = document.createElement('button');
        button.className = 'copy-btn';
        button.innerHTML = '📋 Copy';
        button.style.cssText = 'position: absolute; top: 0.5rem; right: 0.5rem; background: var(--nix-blue); color: white; border: none; padding: 0.25rem 0.5rem; border-radius: 4px; cursor: pointer; font-size: 0.8rem; opacity: 0; transition: opacity 0.3s;';

        block.style.position = 'relative';
        block.addEventListener('mouseenter', () => button.style.opacity = '1');
        block.addEventListener('mouseleave', () => button.style.opacity = '0');

        button.addEventListener('click', async () => {
            const code = block.textContent.trim();
            try {
                await navigator.clipboard.writeText(code);
                button.innerHTML = '✅ Copied!';
                trackEvent('Code', 'Copy', 'Success');
                setTimeout(() => {
                    button.innerHTML = '📋 Copy';
                }, 2000);
            } catch (error) {
                button.innerHTML = '❌ Failed';
                setTimeout(() => {
                    button.innerHTML = '📋 Copy';
                }, 2000);
            }
        });

        block.appendChild(button);
    });
}

// Ripple Effect on Buttons
function initRippleEffect() {
    const buttons = document.querySelectorAll('.cta-btn, .submit-btn, .newsletter-btn, .share-btn');

    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.5);
                top: ${y}px;
                left: ${x}px;
                pointer-events: none;
                transform: scale(0);
                animation: ripple 0.6s ease-out;
            `;

            // Add ripple animation if not already in CSS
            if (!document.getElementById('ripple-keyframes')) {
                const style = document.createElement('style');
                style.id = 'ripple-keyframes';
                style.textContent = `
                    @keyframes ripple {
                        to {
                            transform: scale(4);
                            opacity: 0;
                        }
                    }
                `;
                document.head.appendChild(style);
            }

            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);

            setTimeout(() => ripple.remove(), 600);
        });
    });
}

// Smooth Scroll with Offset
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;

            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                const offsetTop = target.offsetTop - 80; // Account for fixed header
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });

                // Update URL without jumping
                history.pushState(null, null, href);

                // Focus target for accessibility
                target.focus({ preventScroll: true });
                trackEvent('Navigation', 'Smooth Scroll', href);
            }
        });
    });
}

// Parallax Scroll Effect (subtle)
function initParallaxEffect() {
    const parallaxElements = document.querySelectorAll('.hero-section, .feature-section');

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        return; // Skip parallax for users who prefer reduced motion
    }

    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        parallaxElements.forEach((element, index) => {
            const speed = 0.5;
            const yPos = -(scrolled * speed * (index + 1) * 0.1);
            element.style.transform = `translateY(${yPos}px)`;
        });
    }, { passive: true });
}

// Keyboard Shortcuts
function initKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
        // Ctrl/Cmd + K: Focus search (if implemented later)
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            const searchInput = document.querySelector('input[type="search"]');
            if (searchInput) {
                searchInput.focus();
                trackEvent('Keyboard', 'Shortcut', 'Search Focus');
            }
        }

        // Ctrl/Cmd + /: Toggle theme
        if ((e.ctrlKey || e.metaKey) && e.key === '/') {
            e.preventDefault();
            toggleTheme();
            trackEvent('Keyboard', 'Shortcut', 'Toggle Theme');
        }

        // Escape: Close mobile menu
        if (e.key === 'Escape') {
            const mobileMenu = document.querySelector('.nav-links');
            const menuBtn = document.querySelector('.mobile-menu-btn');
            if (mobileMenu && mobileMenu.classList.contains('active')) {
                mobileMenu.classList.remove('active');
                if (menuBtn) {
                    menuBtn.setAttribute('aria-expanded', 'false');
                }
                trackEvent('Keyboard', 'Shortcut', 'Close Menu');
            }
        }
    });
}

// Tooltip on Hover (for stat badges and icons)
function initTooltips() {
    const tooltipElements = document.querySelectorAll('[data-tooltip]');

    tooltipElements.forEach(element => {
        let tooltip = null;

        element.addEventListener('mouseenter', function() {
            const text = this.getAttribute('data-tooltip');
            if (!text) return;

            tooltip = document.createElement('div');
            tooltip.className = 'tooltip';
            tooltip.textContent = text;
            tooltip.style.cssText = `
                position: absolute;
                background: var(--soft-black);
                color: white;
                padding: 0.5rem 1rem;
                border-radius: 6px;
                font-size: 0.875rem;
                white-space: nowrap;
                z-index: 1000;
                pointer-events: none;
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
                opacity: 0;
                transition: opacity 0.2s;
            `;

            document.body.appendChild(tooltip);

            const rect = this.getBoundingClientRect();
            tooltip.style.top = `${rect.top - tooltip.offsetHeight - 8}px`;
            tooltip.style.left = `${rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2)}px`;

            setTimeout(() => tooltip.style.opacity = '1', 10);
        });

        element.addEventListener('mouseleave', function() {
            if (tooltip) {
                tooltip.style.opacity = '0';
                setTimeout(() => tooltip.remove(), 200);
                tooltip = null;
            }
        });
    });
}

// Initialize all Phase 5 features
function initPhase5Features() {
    fetchGitHubStats();
    initSocialSharing();
    initNewsletterForm();
    initScrollAnimations();
    initLazyLoading();
    initCodeCopyButtons();
}

// Scroll Progress Indicator
function initScrollProgress() {
    // Create progress bar element
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    progressBar.setAttribute('role', 'progressbar');
    progressBar.setAttribute('aria-label', 'Page scroll progress');
    progressBar.setAttribute('aria-valuemin', '0');
    progressBar.setAttribute('aria-valuemax', '100');
    progressBar.setAttribute('aria-valuenow', '0');
    document.body.prepend(progressBar);

    // Update progress on scroll
    function updateProgress() {
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight - windowHeight;
        const scrolled = window.pageYOffset;
        const progress = (scrolled / documentHeight) * 100;

        progressBar.style.width = `${Math.min(progress, 100)}%`;
        progressBar.setAttribute('aria-valuenow', Math.round(progress));
    }

    // Update on scroll with throttling for performance
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                updateProgress();
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });

    // Initial update
    updateProgress();
}

// Back to Top Button
function initBackToTop() {
    const backToTopBtn = document.createElement('button');
    backToTopBtn.className = 'back-to-top';
    backToTopBtn.innerHTML = '↑';
    backToTopBtn.setAttribute('aria-label', 'Scroll back to top');
    backToTopBtn.style.cssText = `
        position: fixed;
        bottom: 2rem;
        right: 2rem;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: var(--nix-blue);
        color: white;
        border: none;
        font-size: 1.5rem;
        cursor: pointer;
        opacity: 0;
        transform: scale(0);
        transition: opacity 0.3s, transform 0.3s;
        z-index: 1000;
        box-shadow: 0 4px 12px rgba(82, 119, 195, 0.4);
    `;

    document.body.appendChild(backToTopBtn);

    // Show/hide based on scroll position
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 500) {
            backToTopBtn.style.opacity = '1';
            backToTopBtn.style.transform = 'scale(1)';
        } else {
            backToTopBtn.style.opacity = '0';
            backToTopBtn.style.transform = 'scale(0)';
        }
    }, { passive: true });

    // Scroll to top on click
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        trackEvent('Navigation', 'Back to Top', 'Click');
    });

    // Hover effect
    backToTopBtn.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1)';
        this.style.boxShadow = '0 6px 20px rgba(82, 119, 195, 0.6)';
    });

    backToTopBtn.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
        this.style.boxShadow = '0 4px 12px rgba(82, 119, 195, 0.4)';
    });
}

// FAQ Accordion (Phase 7)
function initFAQAccordion() {
    const faqQuestions = document.querySelectorAll('.faq-question');

    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            const answer = this.nextElementSibling;

            // Close all other FAQs (optional - remove if you want multiple open)
            faqQuestions.forEach(q => {
                if (q !== this) {
                    q.setAttribute('aria-expanded', 'false');
                    q.nextElementSibling.classList.remove('active');
                }
            });

            // Toggle current FAQ
            this.setAttribute('aria-expanded', !isExpanded);
            answer.classList.toggle('active');

            // Track FAQ interactions
            if (!isExpanded) {
                const questionText = this.querySelector('span').textContent;
                trackEvent('FAQ', 'Open', questionText);
            }

            // Smooth scroll to question if it's below viewport
            if (!isExpanded) {
                setTimeout(() => {
                    const rect = this.getBoundingClientRect();
                    if (rect.top < 100) {
                        this.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                }, 300);
            }
        });

        // Keyboard navigation
        question.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });

    // Allow URL hash to open specific FAQ
    if (window.location.hash) {
        const hash = window.location.hash.substring(1);
        const targetQuestion = Array.from(faqQuestions).find(q => {
            const text = q.querySelector('span').textContent.toLowerCase();
            return text.includes(hash.toLowerCase().replace(/-/g, ' '));
        });

        if (targetQuestion) {
            setTimeout(() => {
                targetQuestion.click();
                targetQuestion.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 500);
        }
    }
}

// Initialize all Phase 6 micro-interactions
function initPhase6MicroInteractions() {
    initRippleEffect();
    initSmoothScroll();
    initParallaxEffect();
    initKeyboardShortcuts();
    initTooltips();
    initScrollProgress();
    initBackToTop();
}

// Initialize all Phase 7 features
function initPhase7Features() {
    initFAQAccordion();
}

// ============================================
// Phase 9: Community Statistics Counter Animation
// ============================================

/**
 * Animates a number from start to end value over a duration
 * @param {HTMLElement} element - The element to animate
 * @param {number} start - Starting value
 * @param {number} end - Ending value
 * @param {number} duration - Animation duration in milliseconds
 */
function animateCounter(element, start, end, duration) {
    const startTime = performance.now();
    const isPercentage = element.textContent.includes('%');
    const hasComma = end >= 1000;

    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Easing function (easeOutCubic for smooth deceleration)
        const easeProgress = 1 - Math.pow(1 - progress, 3);

        const current = Math.floor(start + (end - start) * easeProgress);

        // Format the number
        let formattedValue = current.toString();
        if (hasComma) {
            formattedValue = current.toLocaleString('en-US');
        }
        if (isPercentage) {
            formattedValue = current + '%';
        }

        element.textContent = formattedValue;

        if (progress < 1) {
            requestAnimationFrame(update);
        } else {
            // Ensure final value is exact
            let finalValue = end.toString();
            if (hasComma) {
                finalValue = end.toLocaleString('en-US');
            }
            if (isPercentage) {
                finalValue = end + '%';
            }
            element.textContent = finalValue;
        }
    }

    requestAnimationFrame(update);
}

/**
 * Initialize Community Statistics section with Intersection Observer
 * Triggers counter animations when the section comes into view
 */
function initCommunityStats() {
    const statCards = document.querySelectorAll('.community-stat-card');

    if (statCards.length === 0) return;

    // Track which cards have been animated
    const animatedCards = new Set();

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !animatedCards.has(entry.target)) {
                const valueElement = entry.target.querySelector('.stat-value');

                if (valueElement) {
                    const targetText = valueElement.getAttribute('data-target');
                    let target;

                    // Handle percentage values
                    if (targetText.includes('%')) {
                        target = parseInt(targetText.replace('%', ''));
                        valueElement.textContent = '0%';
                    } else {
                        target = parseInt(targetText.replace(/,/g, ''));
                        valueElement.textContent = '0';
                    }

                    // Start animation with 2-second duration
                    animateCounter(valueElement, 0, target, 2000);

                    // Mark as animated
                    animatedCards.add(entry.target);
                }

                // Don't unobserve - allow re-animation if user scrolls away and back
                // observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.3, // Trigger when 30% of the card is visible
        rootMargin: '0px 0px -50px 0px' // Start slightly before it enters viewport
    });

    // Observe all stat cards
    statCards.forEach(card => observer.observe(card));

    // Track when community stats section is viewed
    trackEvent('Section', 'View', 'Community Statistics');
}

/**
 * Interactive Terminal Demo Data
 * Each demo shows a realistic Luminous Nix interaction
 */
const terminalDemos = {
    browser: {
        command: 'ask-nix "install a web browser"',
        steps: [
            { type: 'output', content: '🔍 Understanding your request...', delay: 400 },
            { type: 'output', content: '📦 Found: firefox, chromium, brave, vivaldi', delay: 600 },
            { type: 'output', content: '💡 Recommending: <span class="demo-output info">firefox</span> (most popular, open-source, privacy-focused)', delay: 500 },
            { type: 'output', content: '\nWould you like to install firefox? [Y/n]', delay: 300 },
            { type: 'input', content: 'Y', delay: 800 },
            { type: 'output', content: '✨ Installing firefox...', delay: 500, class: 'success' },
            { type: 'output', content: '✅ Successfully installed! Run \'firefox\' to start.', delay: 700, class: 'success' }
        ]
    },
    photo: {
        command: 'ask-nix "install photo editing software"',
        steps: [
            { type: 'output', content: '🔍 Searching for photo editing tools...', delay: 400 },
            { type: 'output', content: '📦 Found: gimp, krita, darktable, rawtherapee', delay: 600 },
            { type: 'output', content: '💡 Recommending: <span class="demo-output info">gimp</span> (powerful, feature-rich, industry standard)', delay: 500 },
            { type: 'output', content: '\nInstall gimp? [Y/n]', delay: 300 },
            { type: 'input', content: 'Y', delay: 800 },
            { type: 'output', content: '✨ Installing gimp...', delay: 500, class: 'success' },
            { type: 'output', content: '✅ Done! Run \'gimp\' to start editing.', delay: 700, class: 'success' }
        ]
    },
    rust: {
        command: 'ask-nix "set up rust development environment"',
        steps: [
            { type: 'output', content: '🦀 Analyzing Rust development requirements...', delay: 400 },
            { type: 'output', content: '📦 Packages needed: cargo, rustc, rust-analyzer, rustfmt', delay: 600 },
            { type: 'output', content: '💡 Setting up complete Rust toolchain with IDE support', delay: 500 },
            { type: 'output', content: '\nContinue with installation? [Y/n]', delay: 300 },
            { type: 'input', content: 'Y', delay: 800 },
            { type: 'output', content: '✨ Installing Rust toolchain...', delay: 600, class: 'success' },
            { type: 'output', content: '✅ Ready to code! Try \'cargo new my-project\'', delay: 700, class: 'success' }
        ]
    },
    python: {
        command: 'ask-nix "create python data science environment"',
        steps: [
            { type: 'output', content: '🐍 Configuring Python data science stack...', delay: 400 },
            { type: 'output', content: '📦 Packages: python3, numpy, pandas, matplotlib, jupyter', delay: 600 },
            { type: 'output', content: '💡 Including Jupyter notebooks and visualization tools', delay: 500 },
            { type: 'output', content: '\nInstall complete data science environment? [Y/n]', delay: 300 },
            { type: 'input', content: 'Y', delay: 800 },
            { type: 'output', content: '✨ Installing packages...', delay: 700, class: 'success' },
            { type: 'output', content: '✅ Environment ready! Run \'jupyter notebook\' to start.', delay: 700, class: 'success' }
        ]
    },
    gaming: {
        command: 'ask-nix "install steam and gaming tools"',
        steps: [
            { type: 'output', content: '🎮 Setting up gaming environment...', delay: 400 },
            { type: 'output', content: '📦 Found: steam, lutris, wine, gamemode', delay: 600 },
            { type: 'output', content: '💡 Recommending: <span class="demo-output info">steam</span> + gamemode for optimal performance', delay: 500 },
            { type: 'output', content: '\nInstall gaming stack? [Y/n]', delay: 300 },
            { type: 'input', content: 'Y', delay: 800 },
            { type: 'output', content: '✨ Installing Steam and optimization tools...', delay: 700, class: 'success' },
            { type: 'output', content: '✅ Gaming setup complete! Launch Steam to begin.', delay: 700, class: 'success' }
        ]
    }
};

/**
 * Type text character by character with realistic delays
 * @param {HTMLElement} element - Target element
 * @param {string} text - Text to type
 * @param {number} speed - Typing speed in ms per character
 * @returns {Promise} - Resolves when typing is complete
 */
function typeText(element, text, speed = 30) {
    return new Promise(resolve => {
        let i = 0;
        const interval = setInterval(() => {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
            } else {
                clearInterval(interval);
                resolve();
            }
        }, speed);
    });
}

/**
 * Run a terminal demo with realistic typing animation
 * @param {string} demoKey - Key from terminalDemos object
 */
async function runTerminalDemo(demoKey) {
    const demo = terminalDemos[demoKey];
    if (!demo) return;

    const output = document.getElementById('interactive-terminal-output');
    if (!output) return;

    // Clear previous content
    output.innerHTML = '';

    // Add initial command with typing effect
    const commandLine = document.createElement('div');
    commandLine.className = 'demo-command-line';

    const prompt = document.createElement('span');
    prompt.className = 'demo-prompt';
    prompt.textContent = '$ ';

    const input = document.createElement('span');
    input.className = 'demo-input';

    commandLine.appendChild(prompt);
    commandLine.appendChild(input);
    output.appendChild(commandLine);

    // Type the command
    await typeText(input, demo.command, 40);
    await new Promise(resolve => setTimeout(resolve, 300));

    // Execute each step with delays
    for (const step of demo.steps) {
        await new Promise(resolve => setTimeout(resolve, step.delay));

        if (step.type === 'output') {
            const outputDiv = document.createElement('div');
            outputDiv.className = 'demo-output' + (step.class ? ' ' + step.class : '');
            outputDiv.innerHTML = step.content;
            output.appendChild(outputDiv);
        } else if (step.type === 'input') {
            const inputLine = document.createElement('div');
            inputLine.className = 'demo-command-line';

            const inputPrompt = document.createElement('span');
            inputPrompt.className = 'demo-prompt';
            inputPrompt.textContent = '$ ';

            const userInput = document.createElement('span');
            userInput.className = 'demo-input';
            userInput.textContent = step.content;

            inputLine.appendChild(inputPrompt);
            inputLine.appendChild(userInput);
            output.appendChild(inputLine);
        }

        // Auto-scroll to bottom
        output.scrollTop = output.scrollHeight;
    }

    // Track demo interaction
    trackEvent('Interactive Demo', 'Run', demoKey);
}

/**
 * Initialize Interactive Terminal Demo
 */
function initInteractiveDemo() {
    const demoButtons = document.querySelectorAll('.demo-example-btn');

    if (demoButtons.length === 0) return;

    // Add click handlers
    demoButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Update active state
            demoButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            // Run the demo
            const demoKey = this.getAttribute('data-demo');
            runTerminalDemo(demoKey);
        });
    });

    // Run the first demo on load
    const firstDemo = demoButtons[0].getAttribute('data-demo');
    setTimeout(() => runTerminalDemo(firstDemo), 500);
}

// Initialize all Phase 9 features
function initPhase9Features() {
    initCommunityStats();
    initInteractiveDemo();
}

// Update DOMContentLoaded to include Phase 5, 6, 7, 9 & 10 features
const originalDOMContentLoaded = document.addEventListener;
document.addEventListener('DOMContentLoaded', function() {
    initTheme();
    initHighContrast(); // Phase 10: High contrast mode
    initMobileMenu();
    initTerminalAnimation();
    initFormEnhancements();
    initServiceWorker();
    initKofiWidget();
    initPhase5Features(); // Add Phase 5 features
    initPhase6MicroInteractions(); // Add Phase 6 micro-interactions
    initPhase7Features(); // Add Phase 7 features
    initPhase9Features(); // Add Phase 9 features (Community stats counter animation)

    // Optional: Enable performance monitoring in development
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        initPerformanceMonitoring();
    }

    // Add theme toggle event listener
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }

    // Add high contrast toggle event listener (Phase 10)
    const contrastToggle = document.getElementById('contrast-toggle');
    if (contrastToggle) {
        contrastToggle.addEventListener('click', toggleHighContrast);
    }

    // Track page load
    trackEvent('Page', 'Load', window.location.pathname);
});

// Export functions for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        toggleTheme,
        trackEvent,
        fetchGitHubStats,
        initSocialSharing,
        initScrollAnimations
    };
}
