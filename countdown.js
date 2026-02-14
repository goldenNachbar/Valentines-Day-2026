// ==========================================
// 🎉 COUNTDOWN CONFIGURATION
// ==========================================

const COUNTDOWN_CONFIG = {
    enabled: true,  // Set to false to disable countdown
    
    // Target date and time (YYYY-MM-DD HH:MM:SS in 24h format)
    // WICHTIG: Datum muss in der ZUKUNFT liegen!
    targetDate: '2026-02-14 12:00:00',  // Valentine's Day 2026, 6 PM
    
    // Time API endpoint (uses timeapi.io which supports CORS)
    timeAPI: 'https://timeapi.io/api/Time/current/zone?timeZone=Europe/Vienna',
    
    // Fallback if API fails
    useFallbackTime: true,
    
    // Background music during countdown
    audio: {
        enabled: true,  // Set to false to disable audio
        file: 'assets/audio/countdown.mp3',  // Path to audio file
        volume: 0.5,  // Volume 0.0 - 1.0 (0.5 = 50%)
        loop: true    // Loop the audio until countdown ends
    },
    
    // Styling
    colors: {
        background: 'linear-gradient(135deg, #1A0910 0%, #2D1520 100%)',
        text: '#E8B4BC',
        accent: '#ff69b4',
        glow: 'rgba(255, 105, 180, 0.5)'
    }
};

// ==========================================
// COUNTDOWN STATE
// ==========================================
let countdownInterval = null;
let serverTimeOffset = 0;
let countdownAudio = null;  // Audio element for countdown music

// ==========================================
// IMMEDIATELY HIDE CONTENT IF COUNTDOWN IS ENABLED
// ==========================================
if (COUNTDOWN_CONFIG.enabled) {
    // Hide content immediately (before DOM loads)
    const style = document.createElement('style');
    style.id = 'countdown-hide-style';
    style.textContent = '.container { display: none !important; }';
    document.head.appendChild(style);
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeCountdown);
    } else {
        initializeCountdown();
    }
}

async function initializeCountdown() {
    console.log('🎉 Initializing countdown...');
    
    // Get accurate server time
    await fetchServerTime();
    
    // Check if countdown should be shown
    if (shouldShowCountdown()) {
        console.log('⏰ Showing countdown screen');
        showCountdownScreen();
        startCountdown();
    } else {
        console.log('✅ Countdown finished, revealing website');
        revealWebsite();
    }
}

// ==========================================
// FETCH SERVER TIME FROM API
// ==========================================
async function fetchServerTime() {
    try {
        const response = await fetch(COUNTDOWN_CONFIG.timeAPI);
        if (!response.ok) {
            throw new Error('API request failed');
        }
        const data = await response.json();
        
        // Parse server time from timeapi.io format
        const serverTime = new Date(data.dateTime);
        const localTime = new Date();
        
        // Calculate offset
        serverTimeOffset = serverTime.getTime() - localTime.getTime();
        
        console.log('✅ Server time synchronized');
        console.log('Server time:', serverTime.toLocaleString());
        console.log('Offset:', Math.round(serverTimeOffset / 1000), 'seconds');
    } catch (error) {
        console.warn('⚠️ Failed to fetch server time, using local time', error);
        serverTimeOffset = 0;
        
        if (COUNTDOWN_CONFIG.useFallbackTime) {
            console.log('✅ Using local time as fallback');
        }
    }
}

// ==========================================
// GET CURRENT TIME (SERVER OR LOCAL)
// ==========================================
function getCurrentTime() {
    const localTime = new Date();
    return new Date(localTime.getTime() + serverTimeOffset);
}

// ==========================================
// CHECK IF COUNTDOWN SHOULD BE SHOWN
// ==========================================
function shouldShowCountdown() {
    const now = getCurrentTime();
    const target = new Date(COUNTDOWN_CONFIG.targetDate);
    return now < target;
}

// ==========================================
// SHOW COUNTDOWN SCREEN
// ==========================================
function showCountdownScreen() {
    console.log('📺 Creating countdown screen...');
    
    // Create countdown overlay
    const overlay = document.createElement('div');
    overlay.id = 'countdownOverlay';
    overlay.innerHTML = `
        <div class="countdown-container">
            <h1 class="countdown-title">💝 Bald ist es soweit... 💝</h1>
            <div class="countdown-timer">
                <div class="countdown-unit">
                    <span class="countdown-value" id="days">00</span>
                    <span class="countdown-label">Tage</span>
                </div>
                <div class="countdown-separator">:</div>
                <div class="countdown-unit">
                    <span class="countdown-value" id="hours">00</span>
                    <span class="countdown-label">Stunden</span>
                </div>
                <div class="countdown-separator">:</div>
                <div class="countdown-unit">
                    <span class="countdown-value" id="minutes">00</span>
                    <span class="countdown-label">Minuten</span>
                </div>
                <div class="countdown-separator">:</div>
                <div class="countdown-unit">
                    <span class="countdown-value" id="seconds">00</span>
                    <span class="countdown-label">Sekunden</span>
                </div>
            </div>
            <p class="countdown-message">Etwas ganz Besonderes wartet auf dich...</p>
            ${COUNTDOWN_CONFIG.audio?.enabled ? '<button class="audio-toggle-btn" id="audioToggle">🔊 Musik</button>' : ''}
        </div>
    `;
    
    // Add styles first
    addCountdownStyles();
    
    // Then add overlay to body
    document.body.appendChild(overlay);
    
    // Start background music if enabled
    if (COUNTDOWN_CONFIG.audio?.enabled) {
        startCountdownAudio();
    }
    
    console.log('✅ Countdown screen created');
}

// ==========================================
// START COUNTDOWN BACKGROUND MUSIC
// ==========================================
function startCountdownAudio() {
    if (!COUNTDOWN_CONFIG.audio?.file) {
        console.warn('⚠️ No audio file specified');
        return;
    }
    
    try {
        countdownAudio = new Audio(COUNTDOWN_CONFIG.audio.file);
        countdownAudio.loop = COUNTDOWN_CONFIG.audio.loop !== false;
        countdownAudio.volume = COUNTDOWN_CONFIG.audio.volume || 0.5;
        
        // Auto-play (might be blocked by browser, so we add a button)
        const playPromise = countdownAudio.play();
        
        if (playPromise !== undefined) {
            playPromise
                .then(() => {
                    console.log('🎵 Countdown music started');
                    updateAudioButton(true);
                })
                .catch(error => {
                    console.warn('⚠️ Audio autoplay blocked. User needs to click play.', error);
                    updateAudioButton(false);
                });
        }
        
        // Audio toggle button
        const toggleBtn = document.getElementById('audioToggle');
        if (toggleBtn) {
            toggleBtn.addEventListener('click', toggleCountdownAudio);
        }
        
    } catch (error) {
        console.error('❌ Failed to load countdown audio:', error);
    }
}

// ==========================================
// TOGGLE COUNTDOWN AUDIO
// ==========================================
function toggleCountdownAudio() {
    if (!countdownAudio) return;
    
    if (countdownAudio.paused) {
        countdownAudio.play();
        updateAudioButton(true);
    } else {
        countdownAudio.pause();
        updateAudioButton(false);
    }
}

// ==========================================
// UPDATE AUDIO BUTTON STATE
// ==========================================
function updateAudioButton(isPlaying) {
    const toggleBtn = document.getElementById('audioToggle');
    if (toggleBtn) {
        toggleBtn.textContent = isPlaying ? '🔊 Musik' : '🔇 Musik';
        toggleBtn.classList.toggle('playing', isPlaying);
    }
}

// ==========================================
// STOP COUNTDOWN AUDIO
// ==========================================
function stopCountdownAudio() {
    if (countdownAudio) {
        countdownAudio.pause();
        countdownAudio.currentTime = 0;
        countdownAudio = null;
        console.log('🔇 Countdown music stopped');
    }
}

// ==========================================
// START COUNTDOWN TIMER
// ==========================================
function startCountdown() {
    updateCountdown(); // Initial update
    
    countdownInterval = setInterval(() => {
        updateCountdown();
    }, 1000);
}

// ==========================================
// UPDATE COUNTDOWN DISPLAY
// ==========================================
function updateCountdown() {
    const now = getCurrentTime();
    const target = new Date(COUNTDOWN_CONFIG.targetDate);
    const difference = target - now;
    
    if (difference <= 0) {
        // Countdown finished!
        clearInterval(countdownInterval);
        finishCountdown();
        return;
    }
    
    // Calculate time units
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);
    
    // Update display
    document.getElementById('days').textContent = String(days).padStart(2, '0');
    document.getElementById('hours').textContent = String(hours).padStart(2, '0');
    document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
    document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
}

// ==========================================
// FINISH COUNTDOWN - REVEAL WEBSITE
// ==========================================
function finishCountdown() {
    // Stop countdown audio
    stopCountdownAudio();
    
    // Trigger massive fireworks celebration!
    triggerCountdownFireworks();
    
    // Wait for fireworks, then reveal
    setTimeout(() => {
        const overlay = document.getElementById('countdownOverlay');
        if (overlay) {
            overlay.style.opacity = '0';
            setTimeout(() => {
                overlay.remove();
                revealWebsite();
            }, 1000);
        }
    }, 3000);
}

// ==========================================
// REVEAL WEBSITE AFTER COUNTDOWN
// ==========================================
function revealWebsite() {
    console.log('🎊 Revealing website...');
    
    // Remove the hide style
    const hideStyle = document.getElementById('countdown-hide-style');
    if (hideStyle) {
        hideStyle.remove();
    }
    
    const container = document.querySelector('.container');
    if (container) {
        container.style.display = 'block';
        container.style.opacity = '0';
        setTimeout(() => {
            container.style.transition = 'opacity 1s ease';
            container.style.opacity = '1';
        }, 100);
    }
}

// ==========================================
// COUNTDOWN FIREWORKS (BIGGER CELEBRATION)
// ==========================================
function triggerCountdownFireworks() {
    const fireworksContainer = document.createElement('div');
    fireworksContainer.className = 'fireworks-container';
    document.body.appendChild(fireworksContainer);
    
    // Create MASSIVE burst pattern - more bursts, more hearts!
    const burstCount = 15; // 15 bursts instead of 5
    
    for (let i = 0; i < burstCount; i++) {
        setTimeout(() => {
            const x = 10 + Math.random() * 80 + '%';
            const y = 10 + Math.random() * 80 + '%';
            createHeartBurst(fireworksContainer, x, y);
        }, i * 200);
    }
    
    // Remove container after animation
    setTimeout(() => {
        fireworksContainer.remove();
    }, 5000);
}

// ==========================================
// ADD COUNTDOWN STYLES
// ==========================================
function addCountdownStyles() {
    const style = document.createElement('style');
    style.textContent = `
        #countdownOverlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: ${COUNTDOWN_CONFIG.colors.background};
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 99999;
            transition: opacity 1s ease;
        }
        
        .countdown-container {
            text-align: center;
            padding: 2rem;
        }
        
        .countdown-title {
            font-family: 'Cormorant Garamond', serif;
            font-size: clamp(2rem, 5vw, 3.5rem);
            color: ${COUNTDOWN_CONFIG.colors.text};
            margin-bottom: 3rem;
            font-weight: 300;
            font-style: italic;
            text-shadow: 0 0 20px ${COUNTDOWN_CONFIG.colors.glow};
            animation: pulse 2s ease-in-out infinite;
        }
        
        .countdown-timer {
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 1rem;
            margin-bottom: 2rem;
        }
        
        .countdown-unit {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 0.5rem;
        }
        
        .countdown-value {
            font-family: 'Montserrat', sans-serif;
            font-size: clamp(3rem, 8vw, 5rem);
            font-weight: 300;
            color: ${COUNTDOWN_CONFIG.colors.accent};
            text-shadow: 
                0 0 20px ${COUNTDOWN_CONFIG.colors.glow},
                0 0 40px ${COUNTDOWN_CONFIG.colors.glow};
            min-width: 2ch;
            animation: glow 2s ease-in-out infinite;
        }
        
        .countdown-label {
            font-family: 'Montserrat', sans-serif;
            font-size: clamp(0.8rem, 2vw, 1rem);
            color: ${COUNTDOWN_CONFIG.colors.text};
            text-transform: uppercase;
            letter-spacing: 2px;
            opacity: 0.7;
        }
        
        .countdown-separator {
            font-size: clamp(2rem, 6vw, 4rem);
            color: ${COUNTDOWN_CONFIG.colors.accent};
            opacity: 0.5;
            animation: blink 1s ease-in-out infinite;
        }
        
        .countdown-message {
            font-family: 'Cormorant Garamond', serif;
            font-size: clamp(1.2rem, 3vw, 1.8rem);
            color: ${COUNTDOWN_CONFIG.colors.text};
            font-style: italic;
            opacity: 0.8;
            animation: fadeInOut 3s ease-in-out infinite;
        }
        
        @keyframes glow {
            0%, 100% {
                text-shadow: 
                    0 0 20px ${COUNTDOWN_CONFIG.colors.glow},
                    0 0 40px ${COUNTDOWN_CONFIG.colors.glow};
            }
            50% {
                text-shadow: 
                    0 0 30px ${COUNTDOWN_CONFIG.colors.glow},
                    0 0 60px ${COUNTDOWN_CONFIG.colors.glow},
                    0 0 80px ${COUNTDOWN_CONFIG.colors.glow};
            }
        }
        
        @keyframes blink {
            0%, 100% { opacity: 0.5; }
            50% { opacity: 0.2; }
        }
        
        @keyframes fadeInOut {
            0%, 100% { opacity: 0.8; }
            50% { opacity: 0.4; }
        }
        
        .audio-toggle-btn {
            margin-top: 2rem;
            padding: 0.8rem 2rem;
            background: rgba(255, 105, 180, 0.2);
            border: 2px solid ${COUNTDOWN_CONFIG.colors.accent};
            color: ${COUNTDOWN_CONFIG.colors.text};
            border-radius: 50px;
            font-size: 1rem;
            cursor: pointer;
            transition: all 0.3s ease;
            backdrop-filter: blur(10px);
            font-family: 'Montserrat', sans-serif;
        }
        
        .audio-toggle-btn:hover {
            background: rgba(255, 105, 180, 0.4);
            transform: scale(1.05);
            box-shadow: 0 0 20px ${COUNTDOWN_CONFIG.colors.glow};
        }
        
        .audio-toggle-btn.playing {
            animation: pulse 2s ease-in-out infinite;
            box-shadow: 0 0 15px ${COUNTDOWN_CONFIG.colors.glow};
        }
        
        @media (max-width: 768px) {
            .countdown-timer {
                gap: 0.5rem;
            }
            
            .countdown-separator {
                display: none;
            }
            
            .audio-toggle-btn {
                padding: 0.6rem 1.5rem;
                font-size: 0.9rem;
            }
        }
    `;
    document.head.appendChild(style);
}
