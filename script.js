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

// Export functions for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        toggleTheme,
        trackEvent
    };
}
