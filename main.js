/* Main JS for Happy 9th Monthsary page (extracted from inline <script>) */
'use strict';

document.addEventListener('DOMContentLoaded', function () {
    // Set target date: October 24, 2025, 12:00 AM
    const targetDate = new Date('2025-10-24T00:00:00').getTime();
    let countdownFinished = false;
    let candlesBlown = false;

    function updateCountdown() {
        const now = new Date().getTime();
        const distance = targetDate - now;

        if (distance < 0 && !countdownFinished) {
            countdownFinished = true;
            showCake();
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        const daysEl = document.getElementById('days');
        const hoursEl = document.getElementById('hours');
        const minutesEl = document.getElementById('minutes');
        const secondsEl = document.getElementById('seconds');

        if (daysEl) daysEl.textContent = days.toString().padStart(2, '0');
        if (hoursEl) hoursEl.textContent = hours.toString().padStart(2, '0');
        if (minutesEl) minutesEl.textContent = minutes.toString().padStart(2, '0');
        if (secondsEl) secondsEl.textContent = seconds.toString().padStart(2, '0');
    }

    function showCake() {
        // Create celebration effects
        function createHeart() {
            const heart = document.createElement('div');
            heart.className = 'heart';
            heart.innerHTML = '💖';
            heart.style.left = Math.random() * window.innerWidth + 'px';
            heart.style.top = Math.random() * (window.innerHeight / 2) + 'px';
            document.body.appendChild(heart);
            setTimeout(() => heart.remove(), 3000);
        }

        function createConfetti() {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.left = Math.random() * window.innerWidth + 'px';
            confetti.style.backgroundColor = ['#ff6b95', '#FFD700', '#7fff00', '#ff00ff'][Math.floor(Math.random() * 4)];
            document.body.appendChild(confetti);
            setTimeout(() => confetti.remove(), 4000);
        }

        function createCelebrationSparkle() {
            const sparkle = document.createElement('div');
            sparkle.className = 'celebration-sparkle';
            sparkle.style.left = Math.random() * window.innerWidth + 'px';
            sparkle.style.top = Math.random() * (window.innerHeight / 2) + 'px';
            sparkle.style.setProperty('--tx', (Math.random() * 200 - 100) + 'px');
            sparkle.style.setProperty('--ty', (Math.random() * 200 - 100) + 'px');
            document.body.appendChild(sparkle);
            setTimeout(() => sparkle.remove(), 2000);
        }

        // Start celebration effects
        for (let i = 0; i < 15; i++) {
            setTimeout(() => createHeart(), i * 200);
            setTimeout(() => createConfetti(), i * 150);
            setTimeout(() => createCelebrationSparkle(), i * 100);
        }

        // Hide countdown but keep title visible
        const countdownNumbers = document.getElementById('countdown');
        if (countdownNumbers) countdownNumbers.style.display = 'none';

        // Reveal title with pop animation
        const titleEl = document.querySelector('.title');
        if (titleEl) {
            titleEl.style.display = 'block';
            titleEl.classList.add('pop');
        }

        // Add tap instruction
        const tapInstruction = document.createElement('p');
        tapInstruction.style.cssText = 'color: #d63384; font-size: 1.2rem; margin-top: 20px; opacity: 0; transition: opacity 0.5s;';
        tapInstruction.textContent = 'Tap anywhere to continue...';
        const countdownSection = document.getElementById('countdownSection');
        if (countdownSection) countdownSection.appendChild(tapInstruction);

        // Show tap instruction after effects
        setTimeout(() => {
            tapInstruction.style.opacity = '1';
        }, 3000);

        // Wait for screen tap
        function handleTap() {
            const countdownSection = document.getElementById('countdownSection');
            if (countdownSection) countdownSection.style.display = 'none';
            const cakeContainer = document.getElementById('cakeContainer');
            if (cakeContainer) cakeContainer.style.display = 'block';
            document.removeEventListener('click', handleTap);
        }
        document.addEventListener('click', handleTap);

        // Try to play background music when celebration starts
        const bgMusic = document.getElementById('bgMusic');
        if (bgMusic) {
            bgMusic.volume = 0.6; // moderate volume
            const playPromise = bgMusic.play();
            if (playPromise !== undefined) {
                playPromise.catch(() => {
                    // Autoplay blocked - show overlay asking user to enable sound
                    const overlay = document.getElementById('enableSoundOverlay');
                    if (overlay) overlay.style.display = 'flex';
                });
            }
        }
    }

    function blowCandles() {
        if (candlesBlown) return;
        candlesBlown = true;

        // Hide flames
        const flames = document.querySelectorAll('.flame');
        flames.forEach(flame => {
            flame.style.opacity = '0';
        });

        // Create sparkles
        for (let i = 0; i < 20; i++) {
            setTimeout(() => {
                createSparkle();
            }, i * 100);
        }

        // Show polaroids after a delay
        setTimeout(() => {
            showPolaroids();
        }, 1000);

        // Show envelope immediately after candles are blown
        const env = document.getElementById('envelopeContainer');
        if (env) env.style.display = 'block';

        // Show polaroids after envelope
        setTimeout(() => {
            showPolaroids();
        }, 1500);
    }

    function createSparkle() {
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle';
        sparkle.style.left = Math.random() * window.innerWidth + 'px';
        sparkle.style.top = Math.random() * window.innerHeight + 'px';
        document.body.appendChild(sparkle);

        setTimeout(() => {
            sparkle.remove();
        }, 2000);
    }

    function showPolaroids() {
        const polaroids = document.querySelectorAll('.polaroid');
        polaroids.forEach((polaroid, index) => {
            setTimeout(() => {
                polaroid.classList.add('show');
            }, index * 200);
        });
    }

    function openLetter() {
        const overlay = document.getElementById('letterOverlay');
        if (overlay) overlay.style.display = 'flex';
    }

    function closeLetter() {
        const overlay = document.getElementById('letterOverlay');
        if (overlay) overlay.style.display = 'none';
    }

    // Event listeners
    const cakeEl = document.getElementById('cake');
    if (cakeEl) cakeEl.addEventListener('click', blowCandles);

    const envelopeEl = document.getElementById('envelope');
    if (envelopeEl) envelopeEl.addEventListener('click', openLetter);

    const closeLetterBtn = document.getElementById('closeLetter');
    if (closeLetterBtn) closeLetterBtn.addEventListener('click', closeLetter);

    const letterOverlay = document.getElementById('letterOverlay');
    if (letterOverlay) {
        letterOverlay.addEventListener('click', function(e) {
            if (e.target === this) {
                closeLetter();
            }
        });
    }

    // Enable-sound overlay button handler
    const enableBtn = document.getElementById('enableSoundBtn');
    if (enableBtn) {
        enableBtn.addEventListener('click', function() {
            const overlay = document.getElementById('enableSoundOverlay');
            const bgMusic = document.getElementById('bgMusic');
            if (bgMusic) {
                bgMusic.volume = 0.0;
                bgMusic.loop = true;
                bgMusic.play().then(() => {
                    fadeInAudio(bgMusic, 0.6, 1200);
                }).catch(() => {
                    // If still failing, ignore
                });
            }
            if (overlay) overlay.style.display = 'none';
        });
    }

    // Pause music when page is hidden
    document.addEventListener('visibilitychange', function() {
        const bgMusic = document.getElementById('bgMusic');
        if (!bgMusic) return;
        if (document.hidden) {
            try { bgMusic.pause(); } catch (e) {}
        }
    });

    // Try to start background music immediately so it plays while counting down.
    // Browsers may block this; if so we'll show the enable overlay and retry on first user gesture.
    function tryStartBgMusic(showOverlayOnFail = true) {
        const bgMusic = document.getElementById('bgMusic');
        if (!bgMusic) return;
        bgMusic.loop = true;
        // Start muted and fade in for a gentle introduction
        bgMusic.volume = 0.0;
        const p = bgMusic.play();
        if (p !== undefined) {
            p.then(() => {
                fadeInAudio(bgMusic, 0.6, 1200);
            }).catch(() => {
                // Autoplay blocked
                if (showOverlayOnFail) {
                    const overlay = document.getElementById('enableSoundOverlay');
                    if (overlay) overlay.style.display = 'flex';
                }
            });
        }
    }

    // Fade in audio from current volume to target over duration(ms)
    function fadeInAudio(audioEl, targetVolume = 0.6, duration = 1200) {
        try {
            const start = performance.now();
            const initial = audioEl.volume || 0;
            function step(now) {
                const elapsed = now - start;
                const t = Math.min(1, elapsed / duration);
                audioEl.volume = initial + (targetVolume - initial) * t;
                if (t < 1) requestAnimationFrame(step);
            }
            requestAnimationFrame(step);
        } catch (e) {
            audioEl.volume = targetVolume;
        }
    }

    // Try immediately (this may be blocked). If it is, retry once on the first user gesture.
    tryStartBgMusic(true);
    function onFirstUserGesture() {
        tryStartBgMusic(false); // retry without showing overlay if it still fails
        document.removeEventListener('click', onFirstUserGesture);
        document.removeEventListener('touchstart', onFirstUserGesture);
    }
    document.addEventListener('click', onFirstUserGesture, { once: true });
    document.addEventListener('touchstart', onFirstUserGesture, { once: true });

    // Start countdown
    updateCountdown();
    setInterval(updateCountdown, 1000);

    // Image fallback: switch to remote GitHub raw URLs when local images fail to load
    function setupImageFallbacks() {
        const imgs = document.querySelectorAll('.polaroid-image img');
        imgs.forEach((img) => {
            const fallback = img.dataset.fallback;
            if (!fallback) return;

            // Avoid infinite loop if fallback also fails
            let triedFallback = false;

            img.addEventListener('error', function onError() {
                if (triedFallback) return;
                triedFallback = true;
                // Use fallback URL
                img.src = fallback;
            });

            // If image already failed to load (broken local file), force fallback
            setTimeout(() => {
                if (img.complete && img.naturalWidth === 0 && !triedFallback) {
                    triedFallback = true;
                    img.src = fallback;
                }
            }, 50);
        });
    }

    setupImageFallbacks();

    // For testing purposes - uncomment the line below to skip countdown
    // setTimeout(showCake, 2000);
});