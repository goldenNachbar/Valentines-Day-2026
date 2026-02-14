// ==========================================
// 🎨 VALENTINE WEBSITE CONFIGURATION
// ==========================================
// Hier kannst du ALLES anpassen, ohne den Code zu berühren!

const CONFIG = {
    
    // ==========================================
    // 🔐 PASSWÖRTER FÜR JEDEN TAB
    // ==========================================
    passwords: {
        morning: 'sunrise',      // Passwort für Morgen-Tab
        daytime: 'together',     // Passwort für Tag-Tab
        evening: 'golden',       // Passwort für Abend-Tab
        night: 'stars'          // Passwort für Nacht-Tab
    },
    
    // ==========================================
    // 📝 TEXTE & ÜBERSCHRIFTEN
    // ==========================================
    texts: {
        // Header
        mainTitle: 'Ein Tag mit mir',
        subtitle: 'Entdecke jeden Moment, einen nach dem anderen',
        
        // Tab Labels
        morningLabel: 'Morgen',
        daytimeLabel: 'Tag',
        eveningLabel: 'Abend',
        nightLabel: 'Nacht',
        
        // Tab Titel (große Überschriften)
        morningTitle: 'Guten Morgen',
        daytimeTitle: 'Ich denke an dich',
        eveningTitle: 'Fast zusammen',
        nightTitle: 'Gute Nacht',
        
        // Tab Inhalte (Haupttexte)
        morningText: 'Guten Morgen, Liebling. Wenn ich bei dir wäre, wäre dies der Moment, in dem ich dich näher zu mir ziehe, bevor die Welt aufwacht.',
        daytimeText: 'Egal wie hektisch der Tag wird, du bist immer still bei mir.',
        eveningText: 'Die Welt wird hier langsamer. Dies ist der Ort, an dem ich mir dich neben mir vorstelle.',
        nightText: 'Schließe deine Augen in dem Wissen, dass mein letzter Gedanke heute dir gehört.',
        
        // Audio Player
        audioLabel: 'Höre diesen Moment',
        
        // Passwort Modal
        passwordModalTitle: 'Passwort eingeben',
        passwordModalHint: 'Schalte diesen Moment frei...',
        passwordPlaceholder: '•••••',
        unlockButton: 'Freischalten',
        cancelButton: 'Abbrechen',
        errorMessage: 'Falsches Passwort. Versuche es erneut...',
        
        // Locked Overlay
        lockedMessage: 'Gib das Passwort ein, um diesen Moment freizuschalten'
    },
    
    // ==========================================
    // 💝 GEHEIME NACHRICHTEN (EASTER EGGS)
    // ==========================================
    secretMessages: [
        "Du hast ein Stück meines Herzens gefunden.",
        "Das war nur für dich versteckt.",
        "Manche Dinge sind nur dazu da, entdeckt zu werden.",
        "Jeder Moment mit dir ist ein geheimer Schatz.",
        "Du siehst, was andere nicht sehen—mich.",
        "Distanz ändert nichts daran, was hier versteckt ist.",
        "Ein kleines Stück Ewigkeit, nur für uns.",
        "Hier flüstert mein Herz deinen Namen.",
        "Du bist der Grund, warum ich lächle.",
        "In jedem verborgenen Herz steckt ein Gedanke an dich."
    ],
    
    // ==========================================
    // 🎨 FARBEN & DESIGN
    // ==========================================
    colors: {
        // Haupt-Farbpalette
        deepRed: '#8B1538',
        rose: '#B8405E',
        blush: '#E8B4BC',
        warmBeige: '#F5E6E8',
        darkBg: '#1A0910',
        goldAccent: '#D4AF37',
        
        // LED Herz Farben
        ledPink1: '#ff1493',      // DeepPink
        ledPink2: '#ff69b4',      // HotPink
        ledPink3: '#ffb6c1',      // LightPink
        
        // Floating Hearts
        heartColor: '#B8405E'
    },
    
    // ==========================================
    // 🖼️ BILDER & MEDIEN
    // ==========================================
    media: {
        // Bild-Pfade
        morningImage: 'assets/images/morning.jpg',
        daytimeImage: 'assets/images/daytime.jpg',
        eveningImage: 'assets/images/evening.jpg',
        nightImage: 'assets/images/night.jpg',
        
        // Audio-Pfade
        morningAudio: 'assets/audio/morning.mp3',
        daytimeAudio: 'assets/audio/daytime.mp3',
        eveningAudio: 'assets/audio/evening.mp3',
        nightAudio: 'assets/audio/night.mp3',
        
        // Alt-Texte für Bilder
        morningAlt: 'Morgen Moment',
        daytimeAlt: 'Tag Moment',
        eveningAlt: 'Abend Moment',
        nightAlt: 'Nacht Moment'
    },
    
    // ==========================================
    // 💫 ANIMATIONEN & EFFEKTE
    // ==========================================
    animations: {
        // Easter Eggs
        heartsPerTab: 2,                    // Anzahl versteckter Herzen pro Tab
        heartSize: 30,                      // Größe der Easter Egg Herzen (px)
        
        // Floating Hearts Background
        floatingHeartsCount: 10,            // Anzahl schwebender Herzen im Hintergrund
        floatingHeartMinSize: 1.5,          // Minimale Größe (rem)
        floatingHeartMaxSize: 2.5,          // Maximale Größe (rem)
        
        // LED Herz
        ledHeartSize: 400,                  // Größe des LED-Herzens (px)
        ledHeartAnimationDuration: 8,       // Animations-Dauer (Sekunden)
        ledHeartOpacity: 0.7,               // Transparenz (0-1)
        
        // Tab Buttons
        tabFadeInDuration: 0.8,             // Dauer der Tab-Einblendung (Sekunden)
        tabBounceDelay: 0.8,                // Verzögerung vor Bounce-Effekt (Sekunden)
        
        // Transitions
        transitionSpeed: '0.4s',            // Standard-Übergangsgeschwindigkeit
        hoverTransform: 'translateY(-5px)', // Hover-Bewegung
    },
    
    // ==========================================
    // 📱 RESPONSIVE EINSTELLUNGEN
    // ==========================================
    responsive: {
        // Tablet Breakpoint
        tabletBreakpoint: 768,
        tabletLedHeartSize: 250,
        
        // Mobile Breakpoint  
        mobileBreakpoint: 480,
        mobileLedHeartSize: 180,
        mobileMinButtonWidth: 85,
    },
    
    // ==========================================
    // 🎯 TAB POSITIONEN (DESKTOP)
    // ==========================================
    // Position und Rotation für jeden Button
    tabPositions: {
        morning: {
            top: '40px',
            left: '50%',
            marginLeft: '-60px',
            rotation: '-3deg'
        },
        daytime: {
            top: '140px',
            left: '25%',
            marginLeft: '0',
            rotation: '5deg'
        },
        evening: {
            top: '140px',
            right: '25%',
            left: 'auto',
            marginLeft: '0',
            rotation: '-4deg'
        },
        night: {
            top: '280px',
            left: '50%',
            marginLeft: '-60px',
            rotation: '2deg'
        }
    },
    
    // ==========================================
    // 🎭 TAB ICONS
    // ==========================================
    tabIcons: {
        morning: '🌅',
        daytime: '☀️',
        evening: '🌆',
        night: '🌙'
    },
    
    // ==========================================
    // ⚙️ VERHALTEN & FEATURES
    // ==========================================
    behavior: {
        // Progressive Freischaltung
        enableProgression: true,            // Tabs nacheinander freischalten?
        startTab: 'morning',                // Erster verfügbarer Tab
        
        // Auto-Start
        autoOpenFirstTab: true,             // Ersten Tab automatisch öffnen?
        autoOpenDelay: 500,                 // Verzögerung vor Auto-Open (ms)
        
        // Easter Eggs
        easterEggsEnabled: true,            // Easter Eggs aktivieren?
        heartDisappearAfterClick: true,     // Herzen verschwinden nach Klick?
        
        // Audio
        stopAudioOnTabSwitch: true,         // Audio stoppen beim Tab-Wechsel?
        
        // Modals
        closeModalOnEscape: true,           // ESC schließt Modals?
        closeModalOnOutsideClick: true,     // Klick außerhalb schließt Modal?
        
        // Keyboard Shortcuts
        enableNumberShortcuts: true,        // Tabs mit 1-4 wechseln?
    },
    
    // ==========================================
    // 🔧 ENTWICKLER-OPTIONEN
    // ==========================================
    developer: {
        showConsoleMessages: true,          // Nachrichten in der Konsole?
        debugMode: false,                   // Debug-Modus (zeigt alle Tabs)?
        skipPasswords: false,               // Passwörter überspringen (zum Testen)?
    }
};

// ==========================================
// 🌐 CONFIG EXPORTIEREN
// ==========================================
// Macht die Config global verfügbar
if (typeof window !== 'undefined') {
    window.VALENTINE_CONFIG = CONFIG;
}

// ==========================================
// 📖 ANLEITUNG
// ==========================================
/*

📝 WIE DU DIE CONFIG VERWENDEST:

1️⃣ PASSWÖRTER ÄNDERN:
   CONFIG.passwords.morning = 'deinPasswort'

2️⃣ TEXTE ANPASSEN:
   CONFIG.texts.mainTitle = 'Dein eigener Titel'
   CONFIG.texts.morningText = 'Dein romantischer Text...'

3️⃣ FARBEN ÄNDERN:
   CONFIG.colors.rose = '#FF0000'  // Rot statt Rose

4️⃣ BILDER AUSTAUSCHEN:
   CONFIG.media.morningImage = 'assets/images/mein-morgen-bild.jpg'

5️⃣ TAB-POSITIONEN ANPASSEN:
   CONFIG.tabPositions.morning.top = '100px'
   CONFIG.tabPositions.morning.rotation = '-10deg'

6️⃣ ANIMATIONEN ANPASSEN:
   CONFIG.animations.heartsPerTab = 5  // 5 Herzen pro Tab
   CONFIG.animations.ledHeartSize = 500 // Größeres LED-Herz

7️⃣ FEATURES EIN/AUS:
   CONFIG.behavior.enableProgression = false  // Alle Tabs sofort sichtbar
   CONFIG.behavior.easterEggsEnabled = false  // Easter Eggs deaktivieren

8️⃣ GEHEIME NACHRICHTEN:
   CONFIG.secretMessages.push('Deine eigene Nachricht')
   CONFIG.secretMessages[0] = 'Erste Nachricht ändern'

9️⃣ TAB-ICONS ÄNDERN:
   CONFIG.tabIcons.morning = '🌄'  // Anderes Emoji

🔟 ENTWICKLER-MODUS:
   CONFIG.developer.debugMode = true      // Zeigt alle Tabs ohne Passwort
   CONFIG.developer.skipPasswords = true  // Überspringt Passwort-Abfrage


💡 TIPPS:

- Änderungen werden sofort aktiv nach dem Neuladen der Seite
- Du kannst jede einzelne Einstellung individuell anpassen
- Für Farben: Nutze Hex-Codes (#RRGGBB) oder RGB-Werte
- Für Größen: Nutze px, rem, %, oder andere CSS-Einheiten
- Backups machen, bevor du große Änderungen machst!

🎨 FARBSCHEMA-IDEEN:

Dunkel-Romantisch (Standard):
  deepRed: '#8B1538', rose: '#B8405E', blush: '#E8B4BC'

Hell-Romantisch:
  deepRed: '#FF6B9D', rose: '#FFC0CB', blush: '#FFE5EC'

Blau-Romantisch:
  deepRed: '#1E3A8A', rose: '#60A5FA', blush: '#DBEAFE'

Lila-Romantisch:
  deepRed: '#6B21A8', rose: '#A855F7', blush: '#E9D5FF'

Gold-Romantisch:
  deepRed: '#92400E', rose: '#D97706', blush: '#FDE68A'

*/
