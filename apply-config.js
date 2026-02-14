// ==========================================
// 🎨 APPLY CONFIG TO HTML
// ==========================================
// This script runs before the main script and updates HTML elements based on config

(function() {
    'use strict';
    
    const CONFIG = window.VALENTINE_CONFIG || {};
    
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', applyConfig);
    } else {
        applyConfig();
    }
    
    function applyConfig() {
        // ==========================================
        // UPDATE PAGE TITLE
        // ==========================================
        if (CONFIG.texts?.mainTitle) {
            document.title = CONFIG.texts.mainTitle;
        }
        
        // ==========================================
        // UPDATE HEADER TEXTS
        // ==========================================
        const mainTitleEl = document.querySelector('.main-title');
        if (mainTitleEl && CONFIG.texts?.mainTitle) {
            mainTitleEl.textContent = CONFIG.texts.mainTitle;
        }
        
        const subtitleEl = document.querySelector('.subtitle');
        if (subtitleEl && CONFIG.texts?.subtitle) {
            subtitleEl.textContent = CONFIG.texts.subtitle;
        }
        
        // ==========================================
        // UPDATE TAB BUTTONS
        // ==========================================
        updateTabButton('morning', CONFIG.texts?.morningLabel, CONFIG.tabIcons?.morning);
        updateTabButton('daytime', CONFIG.texts?.daytimeLabel, CONFIG.tabIcons?.daytime);
        updateTabButton('evening', CONFIG.texts?.eveningLabel, CONFIG.tabIcons?.evening);
        updateTabButton('night', CONFIG.texts?.nightLabel, CONFIG.tabIcons?.night);
        
        // ==========================================
        // UPDATE TAB CONTENTS
        // ==========================================
        updateTabContent('morning', {
            title: CONFIG.texts?.morningTitle,
            text: CONFIG.texts?.morningText,
            image: CONFIG.media?.morningImage,
            imageAlt: CONFIG.media?.morningAlt,
            audio: CONFIG.media?.morningAudio
        });
        
        updateTabContent('daytime', {
            title: CONFIG.texts?.daytimeTitle,
            text: CONFIG.texts?.daytimeText,
            image: CONFIG.media?.daytimeImage,
            imageAlt: CONFIG.media?.daytimeAlt,
            audio: CONFIG.media?.daytimeAudio
        });
        
        updateTabContent('evening', {
            title: CONFIG.texts?.eveningTitle,
            text: CONFIG.texts?.eveningText,
            image: CONFIG.media?.eveningImage,
            imageAlt: CONFIG.media?.eveningAlt,
            audio: CONFIG.media?.eveningAudio
        });
        
        updateTabContent('night', {
            title: CONFIG.texts?.nightTitle,
            text: CONFIG.texts?.nightText,
            image: CONFIG.media?.nightImage,
            imageAlt: CONFIG.media?.nightAlt,
            audio: CONFIG.media?.nightAudio
        });
        
        // ==========================================
        // UPDATE LOCKED OVERLAY TEXTS
        // ==========================================
        const lockedOverlays = document.querySelectorAll('.locked-overlay p');
        if (CONFIG.texts?.lockedMessage) {
            lockedOverlays.forEach(overlay => {
                overlay.textContent = CONFIG.texts.lockedMessage;
            });
        }
        
        // ==========================================
        // UPDATE AUDIO LABELS
        // ==========================================
        const audioLabels = document.querySelectorAll('.audio-label');
        if (CONFIG.texts?.audioLabel) {
            audioLabels.forEach(label => {
                label.textContent = CONFIG.texts.audioLabel;
            });
        }
        
        // ==========================================
        // UPDATE PASSWORD MODAL
        // ==========================================
        const modalTitle = document.querySelector('.modal-title');
        if (modalTitle && CONFIG.texts?.passwordModalTitle) {
            modalTitle.textContent = CONFIG.texts.passwordModalTitle;
        }
        
        const modalHint = document.querySelector('.modal-hint');
        if (modalHint && CONFIG.texts?.passwordModalHint) {
            modalHint.textContent = CONFIG.texts.passwordModalHint;
        }
        
        const passwordInput = document.getElementById('passwordInput');
        if (passwordInput && CONFIG.texts?.passwordPlaceholder) {
            passwordInput.placeholder = CONFIG.texts.passwordPlaceholder;
        }
        
        const submitButton = document.getElementById('submitPassword');
        if (submitButton && CONFIG.texts?.unlockButton) {
            submitButton.textContent = CONFIG.texts.unlockButton;
        }
        
        const cancelButton = document.getElementById('cancelPassword');
        if (cancelButton && CONFIG.texts?.cancelButton) {
            cancelButton.textContent = CONFIG.texts.cancelButton;
        }
        
        // ==========================================
        // APPLY CUSTOM COLORS (CSS Variables)
        // ==========================================
        if (CONFIG.colors) {
            const root = document.documentElement;
            
            if (CONFIG.colors.deepRed) root.style.setProperty('--deep-red', CONFIG.colors.deepRed);
            if (CONFIG.colors.rose) root.style.setProperty('--rose', CONFIG.colors.rose);
            if (CONFIG.colors.blush) root.style.setProperty('--blush', CONFIG.colors.blush);
            if (CONFIG.colors.warmBeige) root.style.setProperty('--warm-beige', CONFIG.colors.warmBeige);
            if (CONFIG.colors.darkBg) root.style.setProperty('--dark-bg', CONFIG.colors.darkBg);
            if (CONFIG.colors.goldAccent) root.style.setProperty('--gold-accent', CONFIG.colors.goldAccent);
        }
        
        // ==========================================
        // APPLY LED HEART COLORS
        // ==========================================
        if (CONFIG.colors?.ledPink1 || CONFIG.colors?.ledPink2 || CONFIG.colors?.ledPink3) {
            applyLEDHeartColors();
        }
        
        // ==========================================
        // APPLY TAB POSITIONS
        // ==========================================
        if (CONFIG.tabPositions) {
            applyTabPositions();
        }
        
        // ==========================================
        // APPLY RESPONSIVE SETTINGS
        // ==========================================
        if (CONFIG.responsive) {
            applyResponsiveSettings();
        }
    }
    
    // ==========================================
    // HELPER FUNCTIONS
    // ==========================================
    
    function updateTabButton(tabName, label, icon) {
        const button = document.querySelector(`[data-tab="${tabName}"]`);
        if (!button) return;
        
        if (label) {
            const labelEl = button.querySelector('.tab-label');
            if (labelEl) labelEl.textContent = label;
        }
        
        if (icon) {
            const iconEl = button.querySelector('.tab-icon');
            if (iconEl) iconEl.textContent = icon;
        }
    }
    
    function updateTabContent(tabName, data) {
        const section = document.getElementById(tabName);
        if (!section) return;
        
        // Update title
        if (data.title) {
            const titleEl = section.querySelector('.moment-title');
            if (titleEl) titleEl.textContent = data.title;
        }
        
        // Update text
        if (data.text) {
            const textEl = section.querySelector('.moment-text');
            if (textEl) textEl.textContent = data.text;
        }
        
        // Update image
        if (data.image) {
            const imgEl = section.querySelector('.moment-image');
            if (imgEl) {
                imgEl.src = data.image;
                if (data.imageAlt) imgEl.alt = data.imageAlt;
            }
        }
        
        // Update audio
        if (data.audio) {
            const audioEl = section.querySelector('.audio-element source');
            if (audioEl) audioEl.src = data.audio;
            
            // Reload audio element to apply new source
            const audioElement = section.querySelector('.audio-element');
            if (audioElement) audioElement.load();
        }
    }
    
    function applyLEDHeartColors() {
        const style = document.createElement('style');
        const pink1 = CONFIG.colors.ledPink1 || '#ff1493';
        const pink2 = CONFIG.colors.ledPink2 || '#ff69b4';
        const pink3 = CONFIG.colors.ledPink3 || '#ffb6c1';
        
        style.textContent = `
            @keyframes drawHeartLine {
                0% {
                    stroke-dashoffset: 1000;
                    stroke: ${pink1};
                }
                25% {
                    stroke: ${pink2};
                }
                50% {
                    stroke-dashoffset: 0;
                    stroke: ${pink3};
                }
                75% {
                    stroke: ${pink2};
                }
                100% {
                    stroke-dashoffset: -1000;
                    stroke: ${pink1};
                }
            }
            
            .led-heart path {
                stroke: ${pink2} !important;
            }
            
            .led-heart svg {
                filter: drop-shadow(0 0 15px ${pink2}80)
                        drop-shadow(0 0 30px ${pink1}60) !important;
            }
        `;
        
        document.head.appendChild(style);
    }
    
    function applyTabPositions() {
        const style = document.createElement('style');
        let css = '';
        
        ['morning', 'daytime', 'evening', 'night'].forEach(tab => {
            const pos = CONFIG.tabPositions[tab];
            if (!pos) return;
            
            css += `
                .tab-btn[data-tab="${tab}"] {
                    ${pos.top ? `top: ${pos.top};` : ''}
                    ${pos.left ? `left: ${pos.left};` : ''}
                    ${pos.right ? `right: ${pos.right};` : ''}
                    ${pos.marginLeft ? `margin-left: ${pos.marginLeft};` : ''}
                    ${pos.rotation ? `transform: rotate(${pos.rotation}) scale(0.8);` : ''}
                }
                
                .tab-btn[data-tab="${tab}"].visible {
                    ${pos.rotation ? `transform: rotate(${pos.rotation}) scale(1);` : ''}
                }
            `;
        });
        
        style.textContent = css;
        document.head.appendChild(style);
    }
    
    function applyResponsiveSettings() {
        const style = document.createElement('style');
        const tablet = CONFIG.responsive.tabletBreakpoint || 768;
        const mobile = CONFIG.responsive.mobileBreakpoint || 480;
        const tabletHeart = CONFIG.responsive.tabletLedHeartSize || 250;
        const mobileHeart = CONFIG.responsive.mobileLedHeartSize || 180;
        
        style.textContent = `
            @media (max-width: ${tablet}px) {
                .led-heart {
                    width: ${tabletHeart}px !important;
                    height: ${tabletHeart}px !important;
                    margin-left: -${tabletHeart/2}px !important;
                    margin-top: -${tabletHeart/2}px !important;
                }
            }
            
            @media (max-width: ${mobile}px) {
                .led-heart {
                    width: ${mobileHeart}px !important;
                    height: ${mobileHeart}px !important;
                    margin-left: -${mobileHeart/2}px !important;
                    margin-top: -${mobileHeart/2}px !important;
                }
            }
        `;
        
        document.head.appendChild(style);
    }
    
})();
