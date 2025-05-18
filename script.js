// Add this JavaScript to your existing script
document.addEventListener('DOMContentLoaded', function () {
    const navLinks = document.querySelectorAll('nav a');
    const menuBtn = document.getElementById('menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    // Highlight active section
    function highlightNav() {
        const scrollPosition = window.scrollY + 100;

        document.querySelectorAll('section').forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    // Smooth scroll with offset
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 80,
                    behavior: 'smooth'
                });

                // Close mobile menu if open
                if (mobileMenu.classList.contains('hidden') === false) {
                    mobileMenu.classList.add('hidden');
                    menuBtn.classList.remove('active');
                }
            }
        });
    });

    // Mobile menu toggle
    menuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
        menuBtn.classList.toggle('active');
    });

    // Highlight nav on scroll
    window.addEventListener('scroll', highlightNav);
    highlightNav(); // Initial call

    // Add hover effect to mobile menu items
    const mobileLinks = document.querySelectorAll('#mobile-menu a');
    mobileLinks.forEach(link => {
        link.addEventListener('mouseenter', () => {
            link.style.transform = 'translateX(5px)';
            link.style.transition = 'transform 0.2s ease';
        });

        link.addEventListener('mouseleave', () => {
            link.style.transform = 'translateX(0)';
        });
    });
});

// Add this to your existing theme toggle code to handle nav colors
const themeToggleBtn = document.getElementById('theme-toggle');
themeToggleBtn.addEventListener('click', () => {
    // Your existing theme toggle code
    // The nav colors will automatically update because of the CSS we added
});

// Coffee Game Logic
document.addEventListener('DOMContentLoaded', function () {
    const coffeeCup = document.getElementById('coffee-cup');
    const gameModal = document.getElementById('coffee-game-modal');
    const closeGameBtn = document.getElementById('close-game');
    let currentStep = 1;

    const gameState = {
        grinds: 0,
        boils: 0,
        brewing: false
    };

    function resetGame() {
        gameState.grinds = 0;
        gameState.boils = 0;
        gameState.brewing = false;
        currentStep = 1;

        document.querySelectorAll('.step').forEach(step => {
            step.classList.add('hidden');
            if (step.dataset.step === '1') step.classList.remove('hidden');
        });

        document.getElementById('game-complete').classList.add('hidden');
        updateProgress('grind', 0);
        updateProgress('boil', 0);
        updateProgress('brew', 0);
    }

    function updateProgress(type, value) {
        const progressBars = {
            grind: { bar: 'grind-progress', count: 'grind-count', max: 10 },
            boil: { bar: 'boil-progress', count: 'boil-count', max: 5 },
            brew: { bar: 'brew-progress', max: 10 }
        };

        const { bar, count, max } = progressBars[type];
        const progress = (value / max) * 100;

        document.getElementById(bar).style.width = `${progress}%`;
        if (count) document.getElementById(count).textContent = value;
    }

    // Event Listeners
    coffeeCup.addEventListener('click', () => {
        gameModal.classList.remove('hidden');
        resetGame();
    });

    closeGameBtn.addEventListener('click', () => {
        gameModal.classList.add('hidden');
    });

    document.querySelector('.grind-btn').addEventListener('click', () => {
        gameState.grinds = Math.min(gameState.grinds + 1, 10);
        updateProgress('grind', gameState.grinds);

        if (gameState.grinds === 10) {
            document.querySelector('[data-step="1"]').classList.add('hidden');
            document.querySelector('[data-step="2"]').classList.remove('hidden');
            currentStep = 2;
        }
    });

    document.querySelector('.boil-btn').addEventListener('click', () => {
        gameState.boils = Math.min(gameState.boils + 1, 5);
        updateProgress('boil', gameState.boils);

        if (gameState.boils === 5) {
            document.querySelector('[data-step="2"]').classList.add('hidden');
            document.querySelector('[data-step="3"]').classList.remove('hidden');
            currentStep = 3;
        }
    });

    document.getElementById('start-brew').addEventListener('click', () => {
        if (gameState.brewing) return;
        gameState.brewing = true;

        let seconds = 0;
        const brewInterval = setInterval(() => {
            seconds++;
            updateProgress('brew', seconds);

            if (seconds >= 10) {
                clearInterval(brewInterval);
                document.querySelector('[data-step="3"]').classList.add('hidden');
                document.getElementById('game-complete').classList.remove('hidden');
            }
        }, 1000);
    });

    document.querySelector('.replay-btn').addEventListener('click', () => {
        resetGame();
    });
});
// Update your existing mobile menu code with this:
// Mobile menu toggle and close logic
menuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
    menuBtn.classList.toggle('active');
});

// Add this code to close menu on nav item click
document.querySelectorAll('#mobile-menu a').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        menuBtn.classList.remove('active');
    });
});

// Update your existing smooth scroll code to include mobile menu close
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);

        if (targetSection) {
            window.scrollTo({
                top: targetSection.offsetTop - 80,
                behavior: 'smooth'
            });

            // Close mobile menu if open
            if (!mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.add('hidden');
                menuBtn.classList.remove('active');
            }
        }
    });
});
