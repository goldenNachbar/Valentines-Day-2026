// ==========================================
// LOAD CONFIGURATION
// ==========================================
const CONFIG = window.VALENTINE_CONFIG || {};

// ==========================================
// PASSWORD CONFIGURATION
// ==========================================
const passwords = CONFIG.passwords || {
    morning: 'dodo',
    daytime: 'benjamin',
    evening: 'lspd',
    night: 'böse'
};

// ==========================================
// SECRET MESSAGES FOR EASTER EGGS
// ==========================================
const secretMessages = CONFIG.secretMessages || [
    "Du hast ein Stück meines Herzens gefunden.",
    "Das war nur für dich versteckt.",
    "Manche Dinge sind nur dazu da, entdeckt zu werden.",
    "Jeder Moment mit dir ist ein geheimer Schatz.",
    "Du siehst, was andere nicht sehen—mich.",
    "Distanz ändert nichts daran, was hier versteckt ist.",
    "Ein kleines Stück Ewigkeit, nur für uns.",
    "Hier flüstert mein Herz deinen Namen."
];

// ==========================================
// STATE MANAGEMENT
// ==========================================
let currentTab = null;
let currentAudio = null;
let targetTab = null;

// Use config for progression settings
const startTab = CONFIG.behavior?.startTab || 'morning';
let unlockedTabs = [startTab]; // Start with configured first tab

// Track which tabs have completed their audio
let audioCompletedTabs = [];

// Tab progression order
const tabOrder = ['morning', 'daytime', 'evening', 'night'];

// Get behavior settings from config
const enableProgression = CONFIG.behavior?.enableProgression !== false;
const autoOpenFirstTab = CONFIG.behavior?.autoOpenFirstTab !== false;
const autoOpenDelay = CONFIG.behavior?.autoOpenDelay || 500;
const debugMode = CONFIG.developer?.debugMode || false;
const skipPasswords = CONFIG.developer?.skipPasswords || false;

// ==========================================
// DOM ELEMENTS
// ==========================================
const tabButtons = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');
const passwordModal = document.getElementById('passwordModal');
const passwordInput = document.getElementById('passwordInput');
const submitButton = document.getElementById('submitPassword');
const cancelButton = document.getElementById('cancelPassword');
const errorMessage = document.getElementById('errorMessage');
const secretModal = document.getElementById('secretModal');
const secretText = document.getElementById('secretText');
const closeSecretBtn = document.getElementById('closeSecret');
const playButtons = document.querySelectorAll('.play-btn');

// ==========================================
// INITIALIZE
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    // Debug mode shows all tabs
    if (debugMode) {
        unlockedTabs = [...tabOrder];
    }
    
    updateVisibleTabs();
    initializeTabs();
    initializeAudio();
    initializeModals();
    
    if (CONFIG.behavior?.easterEggsEnabled !== false) {
        generateEasterEggs();
    }
    
    // Auto-open first tab if enabled
    if (autoOpenFirstTab) {
        setTimeout(() => {
            switchTab(startTab);
        }, autoOpenDelay);
    }
    
    // Console messages
    if (CONFIG.developer?.showConsoleMessages !== false) {
        console.log('%c💘 Ein Tag mit mir 💘', 'color: #E8B4BC; font-size: 24px; font-weight: bold; font-family: serif;');
        console.log('%cMit Liebe gemacht für jemand ganz Besonderes', 'color: #B8405E; font-size: 14px; font-style: italic;');
        console.log('%cTipp: Erkunde jede Ecke... 👀', 'color: #F5E6E8; font-size: 12px;');
        
        if (debugMode) {
            console.log('%c🔧 DEBUG MODE AKTIV - Alle Tabs sichtbar', 'color: #FFA500; font-size: 12px; font-weight: bold;');
        }
        if (skipPasswords) {
            console.log('%c🔓 PASSWÖRTER ÜBERSPRUNGEN', 'color: #FFA500; font-size: 12px; font-weight: bold;');
        }
    }
});

// ==========================================
// TAB VISIBILITY & PROGRESSION
// ==========================================
function updateVisibleTabs() {
    tabButtons.forEach(button => {
        const tabName = button.getAttribute('data-tab');
        if (unlockedTabs.includes(tabName)) {
            button.classList.add('visible');
        } else {
            button.classList.remove('visible');
        }
    });
}

// ==========================================
// TAB SWITCHING LOGIC
// ==========================================
function initializeTabs() {
    // Tab buttons only switch to the tab visually
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tabName = button.getAttribute('data-tab');
            
            // Check if tab is visible/unlocked
            if (!button.classList.contains('visible')) {
                return;
            }
            
            // Just switch to the tab (shows locked overlay if locked)
            switchTab(tabName);
        });
    });
    
    // Unlock buttons trigger password modal
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('unlock-btn')) {
            const tabName = e.target.getAttribute('data-unlock');
            targetTab = tabName;
            openPasswordModal();
        }
    });
}

function switchTab(tabName) {
    // Stop any playing audio if configured
    if (CONFIG.behavior?.stopAudioOnTabSwitch !== false) {
        stopAllAudio();
    }
    
    // Update buttons
    tabButtons.forEach(btn => {
        if (btn.getAttribute('data-tab') === tabName) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
    
    // Update content
    tabContents.forEach(content => {
        if (content.id === tabName) {
            content.classList.add('active');
        } else {
            content.classList.remove('active');
        }
    });
    
    currentTab = tabName;
    
    // Auto-scroll to content if tab is unlocked
    const tabContent = document.getElementById(tabName);
    if (tabContent && tabContent.getAttribute('data-locked') === 'false') {
        scrollToContent(tabName);
    }
}

// ==========================================
// PASSWORD MODAL LOGIC
// ==========================================
function openPasswordModal() {
    passwordModal.classList.add('active');
    passwordInput.value = '';
    errorMessage.textContent = '';
    passwordInput.focus();
}

function closePasswordModal() {
    passwordModal.classList.remove('active');
    targetTab = null;
}

function validatePassword() {
    // Skip password check in debug mode
    if (skipPasswords) {
        unlockTab(targetTab);
        closePasswordModal();
        triggerHeartFireworks();
        scrollToContent(targetTab);
        return;
    }
    
    const enteredPassword = passwordInput.value.trim().toLowerCase();
    const correctPassword = passwords[targetTab];
    
    if (enteredPassword === correctPassword) {
        unlockTab(targetTab);
        closePasswordModal();
        
        // Success animation
        passwordInput.style.borderColor = '#4ade80';
        setTimeout(() => {
            passwordInput.style.borderColor = '';
        }, 300);
        
        // Trigger heart fireworks celebration!
        triggerHeartFireworks();
        
        // Scroll to content after fireworks (but don't switch tab - it's already visible)
        setTimeout(() => {
            scrollToContent(targetTab);
        }, 800);
    } else {
        const errorMsg = CONFIG.texts?.errorMessage || 'Falsches Passwort. Versuche es erneut...';
        showError(errorMsg);
        passwordInput.value = '';
        
        // Error animation
        passwordInput.style.borderColor = '#ff6b6b';
        passwordInput.classList.add('shake');
        setTimeout(() => {
            passwordInput.classList.remove('shake');
            passwordInput.style.borderColor = '';
        }, 500);
    }
}

// ==========================================
// SMOOTH SCROLL TO CONTENT
// ==========================================
function scrollToContent(tabName) {
    const tabContent = document.getElementById(tabName);
    if (!tabContent) return;
    
    // Small delay to ensure content is rendered
    setTimeout(() => {
        // Get the content inner element
        const contentInner = tabContent.querySelector('.content-inner');
        if (!contentInner) return;
        
        // Calculate position with offset for better visibility
        const elementPosition = contentInner.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - 100; // 100px offset from top
        
        // Smooth scroll to position
        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    }, 200);
}

// ==========================================
// HEART FIREWORKS CELEBRATION
// ==========================================
function triggerHeartFireworks() {
    const fireworksContainer = document.createElement('div');
    fireworksContainer.className = 'fireworks-container';
    document.body.appendChild(fireworksContainer);
    
    // Create multiple bursts at different positions
    const burstPositions = [
        { x: '30%', y: '40%', delay: 0 },
        { x: '70%', y: '35%', delay: 200 },
        { x: '50%', y: '25%', delay: 400 },
        { x: '20%', y: '50%', delay: 600 },
        { x: '80%', y: '45%', delay: 800 }
    ];
    
    burstPositions.forEach(pos => {
        setTimeout(() => {
            createHeartBurst(fireworksContainer, pos.x, pos.y);
        }, pos.delay);
    });
    
    // Remove container after animation
    setTimeout(() => {
        fireworksContainer.remove();
    }, 3000);
}

function createHeartBurst(container, x, y) {
    const burstCenter = document.createElement('div');
    burstCenter.style.position = 'absolute';
    burstCenter.style.left = x;
    burstCenter.style.top = y;
    burstCenter.style.transform = 'translate(-50%, -50%)';
    container.appendChild(burstCenter);
    
    // Create 12 hearts flying outward
    const heartCount = 12;
    const colors = ['#ff1493', '#ff69b4', '#ffb6c1', '#ff85c1', '#ff4da6'];
    
    for (let i = 0; i < heartCount; i++) {
        const heart = document.createElement('div');
        heart.className = 'firework-heart';
        heart.innerHTML = '♥';
        heart.style.color = colors[Math.floor(Math.random() * colors.length)];
        
        // Calculate angle for this heart
        const angle = (360 / heartCount) * i;
        const distance = 150 + Math.random() * 100;
        
        // Convert to radians
        const rad = (angle * Math.PI) / 180;
        const endX = Math.cos(rad) * distance;
        const endY = Math.sin(rad) * distance;
        
        heart.style.setProperty('--end-x', `${endX}px`);
        heart.style.setProperty('--end-y', `${endY}px`);
        heart.style.setProperty('--rotation', `${Math.random() * 720 - 360}deg`);
        
        burstCenter.appendChild(heart);
        
        // Remove heart after animation
        setTimeout(() => {
            heart.remove();
        }, 2000);
    }
}

function unlockTab(tabName) {
    const tabContent = document.getElementById(tabName);
    tabContent.setAttribute('data-locked', 'false');
    
    // Fade out the locked overlay
    const overlay = tabContent.querySelector('.locked-overlay');
    overlay.style.opacity = '0';
    setTimeout(() => {
        overlay.style.display = 'none';
    }, 400);
    
    // Keep the tab active (don't hide it)
    tabContent.classList.add('active');
    
    // Update the tab button to active state
    const tabButton = document.querySelector(`[data-tab="${tabName}"]`);
    if (tabButton) {
        tabButton.classList.add('active');
    }
    
    // NOTE: Next tab will only unlock after audio is fully played
    // See unlockNextTabAfterAudio() function
}

function showError(message) {
    errorMessage.textContent = message;
    setTimeout(() => {
        errorMessage.textContent = '';
    }, 3000);
}

function initializeModals() {
    submitButton.addEventListener('click', validatePassword);
    cancelButton.addEventListener('click', closePasswordModal);
    
    passwordInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            validatePassword();
        }
    });
    
    closeSecretBtn.addEventListener('click', () => {
        secretModal.classList.remove('active');
    });
    
    // Close modals on outside click (if configured)
    if (CONFIG.behavior?.closeModalOnOutsideClick !== false) {
        passwordModal.addEventListener('click', (e) => {
            if (e.target === passwordModal) {
                closePasswordModal();
            }
        });
        
        secretModal.addEventListener('click', (e) => {
            if (e.target === secretModal) {
                secretModal.classList.remove('active');
            }
        });
    }
}

// ==========================================
// AUDIO PLAYER LOGIC
// ==========================================
function initializeAudio() {
    playButtons.forEach(button => {
        button.addEventListener('click', () => {
            const audioName = button.getAttribute('data-audio');
            const audioElement = document.querySelector(`audio[data-track="${audioName}"]`);
            
            if (button.classList.contains('playing')) {
                // Pause current audio (don't reset position)
                audioElement.pause();
                button.classList.remove('playing');
                currentAudio = null;
            } else {
                // Stop all other audio first (pause them)
                stopAllAudio();
                
                // Play this audio (continues from where it was paused)
                audioElement.play();
                button.classList.add('playing');
                currentAudio = { element: audioElement, button: button };
            }
        });
    });
    
    // Handle audio ended event
    document.querySelectorAll('.audio-element').forEach(audio => {
        audio.addEventListener('ended', () => {
            const audioName = audio.getAttribute('data-track');
            const button = document.querySelector(`button[data-audio="${audioName}"]`);
            button.classList.remove('playing');
            currentAudio = null;
            
            // Mark this tab's audio as completed
            if (!audioCompletedTabs.includes(audioName)) {
                audioCompletedTabs.push(audioName);
                
                // Unlock next tab after audio completion
                unlockNextTabAfterAudio(audioName);
            }
        });
    });
}

function stopAllAudio() {
    playButtons.forEach(button => {
        button.classList.remove('playing');
    });
    
    // Pause all audio but DON'T reset currentTime
    // This allows audio to continue from where it was paused
    document.querySelectorAll('.audio-element').forEach(audio => {
        audio.pause();
    });
    
    currentAudio = null;
}

function unlockNextTabAfterAudio(audioName) {
    // Find current tab index
    const currentIndex = tabOrder.indexOf(audioName);
    const nextTab = tabOrder[currentIndex + 1];
    
    if (nextTab && !unlockedTabs.includes(nextTab) && enableProgression) {
        // Small delay for effect
        setTimeout(() => {
            unlockedTabs.push(nextTab);
            updateVisibleTabs();
            
            // Animate the new button sliding into position
            const nextButton = document.querySelector(`[data-tab="${nextTab}"]`);
            if (nextButton) {
                // Add a special entrance animation
                nextButton.style.animation = 'slideFromCenter 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards';
            }
        }, 500);
    }
}

// ==========================================
// EASTER EGGS - STRATEGIC HEART PLACEMENT
// ==========================================
function generateEasterEggs() {
    const heartsPerTab = CONFIG.animations?.heartsPerTab || 2;
    
    tabContents.forEach(tab => {
        const contentInner = tab.querySelector('.content-inner');
        
        // Define strategic positions for hearts (in percentage)
        const positions = [
            { top: '15%', left: '10%' },      // Oben Links
            { top: '15%', right: '10%' },     // Oben Rechts
            { top: '50%', left: '5%' },       // Mitte Links
            { top: '50%', right: '5%' },      // Mitte Rechts
            { top: '75%', left: '15%' },      // Unten Links
            { top: '75%', right: '15%' },     // Unten Rechts
            { top: '30%', left: '50%', transform: 'translateX(-50%)' },  // Oben Mitte
            { top: '85%', left: '50%', transform: 'translateX(-50%)' }   // Unten Mitte
        ];
        
        // Shuffle positions to make it random each time
        const shuffledPositions = positions.sort(() => Math.random() - 0.5);
        
        // Create configured number of hearts per tab
        for (let i = 0; i < heartsPerTab && i < shuffledPositions.length; i++) {
            const heart = createPositionedHeart(contentInner, shuffledPositions[i]);
            contentInner.appendChild(heart);
        }
    });
}

function createPositionedHeart(container, position) {
    const heart = document.createElement('div');
    heart.className = 'hidden-heart';
    heart.innerHTML = '♥';
    
    // Apply the predefined position
    if (position.top) heart.style.top = position.top;
    if (position.bottom) heart.style.bottom = position.bottom;
    if (position.left) heart.style.left = position.left;
    if (position.right) heart.style.right = position.right;
    if (position.transform) heart.style.transform = position.transform;
    
    // Random delay for breathing animation
    heart.style.animationDelay = `${Math.random() * 2}s`;
    
    // Click handler
    heart.addEventListener('click', (e) => {
        e.stopPropagation();
        showSecretMessage();
        
        // Heart disappears after being found (if configured)
        if (CONFIG.behavior?.heartDisappearAfterClick !== false) {
            heart.style.transition = 'all 0.6s ease';
            heart.style.transform = 'scale(2) rotate(360deg)';
            heart.style.opacity = '0';
            
            setTimeout(() => {
                heart.remove();
            }, 600);
        }
    });
    
    return heart;
}

function showSecretMessage() {
    const randomMessage = secretMessages[Math.floor(Math.random() * secretMessages.length)];
    secretText.textContent = randomMessage;
    secretModal.classList.add('active');
}

// ==========================================
// UTILITY: SHAKE ANIMATION
// ==========================================
const style = document.createElement('style');
style.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-10px); }
        75% { transform: translateX(10px); }
    }
    .shake {
        animation: shake 0.3s ease;
    }
`;
document.head.appendChild(style);

// ==========================================
// KEYBOARD SHORTCUTS (OPTIONAL)
// ==========================================
document.addEventListener('keydown', (e) => {
    // ESC to close modals
    if (e.key === 'Escape' && CONFIG.behavior?.closeModalOnEscape !== false) {
        if (passwordModal.classList.contains('active')) {
            closePasswordModal();
        }
        if (secretModal.classList.contains('active')) {
            secretModal.classList.remove('active');
        }
    }
    
    // Number keys 1-4 to switch tabs (if enabled and unlocked)
    if (CONFIG.behavior?.enableNumberShortcuts !== false) {
        if (e.key >= '1' && e.key <= '4') {
            const tabIndex = parseInt(e.key) - 1;
            const tabButton = tabButtons[tabIndex];
            if (tabButton && tabButton.classList.contains('visible')) {
                tabButton.click();
            }
        }
    }
});

// ==========================================
// CONSOLE MESSAGE
// ==========================================
console.log('%c💘 Ein Tag mit mir 💘', 'color: #E8B4BC; font-size: 24px; font-weight: bold; font-family: serif;');
console.log('%cMit Liebe gemacht für jemand ganz Besonderes', 'color: #B8405E; font-size: 14px; font-style: italic;');
console.log('%cTipp: Erkunde jede Ecke... 👀', 'color: #F5E6E8; font-size: 12px;');
