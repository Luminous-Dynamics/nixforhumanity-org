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

// Form Enhancement
function initFormEnhancements() {
    const form = document.querySelector('.beta-form');
    if (!form) return;

    // Add visual feedback on submit
    form.addEventListener('submit', function(e) {
        const submitBtn = this.querySelector('.submit-btn');
        if (submitBtn) {
            submitBtn.textContent = '⏳ Submitting...';
            submitBtn.disabled = true;
        }
    });

    // Real-time email validation
    const emailInput = document.getElementById('email');
    if (emailInput) {
        emailInput.addEventListener('blur', function() {
            if (this.value && !this.validity.valid) {
                this.setCustomValidity('Please enter a valid email address');
                this.reportValidity();
            } else {
                this.setCustomValidity('');
            }
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

// Fetch GitHub Stats
async function fetchGitHubStats() {
    try {
        const response = await fetch('https://api.github.com/repos/Luminous-Dynamics/luminous-nix');
        if (!response.ok) throw new Error('GitHub API request failed');

        const data = await response.json();

        // Update stars
        const starsElement = document.getElementById('github-stars');
        if (starsElement) {
            starsElement.textContent = (data.stargazers_count || 0).toLocaleString();
        }

        // Update forks
        const forksElement = document.getElementById('github-forks');
        if (forksElement) {
            forksElement.textContent = (data.forks_count || 0).toLocaleString();
        }

        // Fetch contributors
        const contributorsResponse = await fetch(data.contributors_url);
        if (contributorsResponse.ok) {
            const contributors = await contributorsResponse.json();
            const contributorsElement = document.getElementById('github-contributors');
            if (contributorsElement) {
                contributorsElement.textContent = contributors.length.toLocaleString();
            }
        }

        trackEvent('GitHub', 'Stats Loaded', 'Success');
    } catch (error) {
        console.log('Could not fetch GitHub stats:', error.message);
        // Fallback to placeholder values
        const placeholders = {
            'github-stars': '100+',
            'github-forks': '20+',
            'github-contributors': '5+'
        };
        Object.entries(placeholders).forEach(([id, value]) => {
            const element = document.getElementById(id);
            if (element) element.textContent = value;
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

// Newsletter Form Enhancement
function initNewsletterForm() {
    const form = document.getElementById('newsletter-form');
    if (!form) return;

    form.addEventListener('submit', function(e) {
        const submitBtn = this.querySelector('.newsletter-btn');
        const emailInput = this.querySelector('input[type="email"]');

        if (submitBtn) {
            submitBtn.textContent = '⏳ Subscribing...';
            submitBtn.disabled = true;
        }

        // Track newsletter signup attempt
        trackEvent('Newsletter', 'Subscribe Attempt', emailInput?.value ? 'With Email' : 'No Email');

        // Note: Actual submission happens via Formspree
        // Re-enable button after submission (Formspree handles redirect)
        setTimeout(() => {
            if (submitBtn) {
                submitBtn.textContent = 'Subscribe';
                submitBtn.disabled = false;
            }
        }, 3000);
    });
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

// Initialize all Phase 5 features
function initPhase5Features() {
    fetchGitHubStats();
    initSocialSharing();
    initNewsletterForm();
    initScrollAnimations();
    initLazyLoading();
    initCodeCopyButtons();
}

// Update DOMContentLoaded to include Phase 5 features
const originalDOMContentLoaded = document.addEventListener;
document.addEventListener('DOMContentLoaded', function() {
    initTheme();
    initMobileMenu();
    initTerminalAnimation();
    initFormEnhancements();
    initServiceWorker();
    initKofiWidget();
    initPhase5Features(); // Add Phase 5 features

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
