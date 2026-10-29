// 7th International Yogini Awards & Conference 2027 — App Logic
window.YOGINI_WEBHOOK_URL = 'https://script.google.com/macros/s/AKfycbyISPhB5iCN_Ec5MO25HyMiFZA6kkYzE8H_qa-wbt3u5Bqs_vAfrkPNnAdljBYGK6k/exec';

document.addEventListener('DOMContentLoaded', () => {

  // 1. Mobile Menu
  const menuToggle = document.getElementById('menuToggle');
  const menuClose = document.getElementById('menuClose');
  const mobileMenu = document.getElementById('mobileMenu');
  const mLinks = document.querySelectorAll('.m-link');

  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener('click', () => mobileMenu.classList.add('open'));
    if (menuClose) menuClose.addEventListener('click', () => mobileMenu.classList.remove('open'));
    mLinks.forEach(link => link.addEventListener('click', () => mobileMenu.classList.remove('open')));
  }

  // 2. Dynamic Countdown Timer (30 Jan 2027 IST)
  const targetDate = new Date('2027-01-30T09:00:00+05:30').getTime();
  const cDays = document.getElementById('cDays');
  const cHours = document.getElementById('cHours');
  const cMins = document.getElementById('cMins');
  const cSecs = document.getElementById('cSecs');

  function updateCountdown() {
    const now = new Date().getTime();
    const diff = targetDate - now;

    if (diff <= 0) {
      if (cDays) cDays.textContent = '00';
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const secs = Math.floor((diff % (1000 * 60)) / 1000);

    if (cDays) cDays.textContent = String(days).padStart(2, '0');
    if (cHours) cHours.textContent = String(hours).padStart(2, '0');
    if (cMins) cMins.textContent = String(mins).padStart(2, '0');
    if (cSecs) cSecs.textContent = String(secs).padStart(2, '0');
  }
  updateCountdown();
  setInterval(updateCountdown, 1000);

  // 3. 3D Trophy Mouse Tilt
  const trophyStage = document.getElementById('trophyStage');
  const trophyImg = document.getElementById('trophyImg');
  if (trophyStage && trophyImg) {
    trophyStage.addEventListener('mousemove', (e) => {
      const rect = trophyStage.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      trophyImg.style.transform = `rotateY(${x * 30}deg) rotateX(${-y * 30}deg) scale(1.04)`;
    });
    trophyStage.addEventListener('mouseleave', () => {
      trophyImg.style.transform = 'rotateY(0deg) rotateX(0deg) scale(1)';
    });
  }

  // 4. Schedule Tabs (Day 1 / Day 2)
  const tabDay1 = document.getElementById('tabDay1');
  const tabDay2 = document.getElementById('tabDay2');
  const schedDay1 = document.getElementById('schedDay1');
  const schedDay2 = document.getElementById('schedDay2');

  if (tabDay1 && tabDay2) {
    tabDay1.addEventListener('click', () => {
      tabDay1.classList.add('active');
      tabDay2.classList.remove('active');
      schedDay1.style.display = 'flex';
      schedDay2.style.display = 'none';
    });
    tabDay2.addEventListener('click', () => {
      tabDay2.classList.add('active');
      tabDay1.classList.remove('active');
      schedDay1.style.display = 'none';
      schedDay2.style.display = 'flex';
    });
  }

  // 5. Category Selection from Category Cards
  const applyBtns = document.querySelectorAll('.btn-apply');
  const fCat = document.getElementById('fCat');
  applyBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const cat = btn.getAttribute('data-cat');
      if (fCat && cat) fCat.value = cat;
      const nomSection = document.getElementById('nominate');
      if (nomSection) nomSection.scrollIntoView({ behavior: 'smooth' });
    });
  });

  // 6. Multi-Step Form Navigation & Validation
  const step1 = document.getElementById('step1');
  const step2 = document.getElementById('step2');
  const step3 = document.getElementById('step3');
  const tabS1 = document.getElementById('tabS1');
  const tabS2 = document.getElementById('tabS2');
  const tabS3 = document.getElementById('tabS3');

  const btnNext1 = document.getElementById('btnNext1');
  const btnNext2 = document.getElementById('btnNext2');
  const btnBack1 = document.getElementById('btnBack1');
  const btnBack2 = document.getElementById('btnBack2');
  const nomForm = document.getElementById('nomForm');
  const successBox = document.getElementById('successBox');

  // Step 1 Validation
  if (btnNext1) {
    btnNext1.addEventListener('click', () => {
      const name = document.getElementById('fName').value.trim();
      const email = document.getElementById('fEmail').value.trim();
      const mobile = document.getElementById('fMobile').value.trim();
      const age = document.getElementById('fAge').value.trim();
      const loc = document.getElementById('fLocation').value.trim();

      let valid = true;
      document.getElementById('err-fName').textContent = name ? '' : 'Name is required';
      document.getElementById('err-fEmail').textContent = (/^[^\s@]+@[^\s@]+\.[^\s@]+$/).test(email) ? '' : 'Valid email is required';
      document.getElementById('err-fMobile').textContent = mobile.length >= 8 ? '' : 'Valid mobile number is required';
      document.getElementById('err-fAge').textContent = age >= 18 ? '' : 'Age must be 18 or above';
      document.getElementById('err-fLocation').textContent = loc ? '' : 'Location is required';

      if (!name || !(/^[^\s@]+@[^\s@]+\.[^\s@]+$/).test(email) || mobile.length < 8 || age < 18 || !loc) {
        valid = false;
      }

      if (valid) {
        step1.style.display = 'none';
        step2.style.display = 'block';
        tabS1.classList.remove('active');
        tabS2.classList.add('active');
      }
    });
  }

  // Step 2 Navigation
  if (btnBack1) {
    btnBack1.addEventListener('click', () => {
      step2.style.display = 'none';
      step1.style.display = 'block';
      tabS2.classList.remove('active');
      tabS1.classList.add('active');
    });
  }

  if (btnNext2) {
    btnNext2.addEventListener('click', () => {
      const role = document.getElementById('fRole').value;
      const exp = document.getElementById('fExp').value.trim();
      const bio = document.getElementById('fBio').value.trim();

      let valid = true;
      document.getElementById('err-fRole').textContent = role ? '' : 'Please select your role';
      document.getElementById('err-fExp').textContent = exp !== '' && exp >= 0 ? '' : 'Years of experience required';
      document.getElementById('err-fBio').textContent = bio.length >= 10 ? '' : 'Please provide brief details (10+ characters)';

      if (!role || exp === '' || exp < 0 || bio.length < 10) {
        valid = false;
      }

      if (valid) {
        step2.style.display = 'none';
        step3.style.display = 'block';
        tabS2.classList.remove('active');
        tabS3.classList.add('active');
      }
    });
  }

  // Step 3 Navigation & Submission
  if (btnBack2) {
    btnBack2.addEventListener('click', () => {
      step3.style.display = 'none';
      step2.style.display = 'block';
      tabS3.classList.remove('active');
      tabS2.classList.add('active');
    });
  }

  if (nomForm) {
    nomForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const cat = document.getElementById('fCat').value;
      const reason = document.getElementById('fReason').value.trim();
      const consent = document.getElementById('fConsent').checked;

      let valid = true;
      document.getElementById('err-fCat').textContent = cat ? '' : 'Please select a category';
      document.getElementById('err-fReason').textContent = reason.length >= 10 ? '' : 'Please provide nomination reason';
      document.getElementById('err-fConsent').textContent = consent ? '' : 'You must accept the organizer review terms';

      if (!cat || reason.length < 10 || !consent) {
        valid = false;
      }

      if (!valid) return;

      const btnSubmit = document.getElementById('btnSubmit');
      btnSubmit.disabled = true;
      btnSubmit.textContent = 'Submitting...';

      // Generate unique Application ID
      const hex = Math.random().toString(36).substring(2, 8).toUpperCase();
      const appId = `YOGINI-2027-${hex}`;

      // Prevent Formula Injection
      const sanitize = (val) => {
        const s = String(val || '').trim();
        return /^[=+\-@]/.test(s) ? `'${s}` : s;
      };

      const payload = {
        applicationId: appId,
        timestamp: new Date().toISOString(),
        fullName: sanitize(document.getElementById('fName').value),
        email: sanitize(document.getElementById('fEmail').value),
        mobile: sanitize(document.getElementById('fMobile').value),
        age: sanitize(document.getElementById('fAge').value),
        location: sanitize(document.getElementById('fLocation').value),
        role: sanitize(document.getElementById('fRole').value),
        experience: sanitize(document.getElementById('fExp').value),
        institution: sanitize(document.getElementById('fInst').value),
        biography: sanitize(document.getElementById('fBio').value),
        category: sanitize(cat),
        reason: sanitize(reason),
        portfolio: sanitize(document.getElementById('fLink').value)
      };

      // 1. Store in localStorage as persistent backup
      const saved = JSON.parse(localStorage.getItem('yogini_nominations') || '[]');
      saved.push(payload);
      localStorage.setItem('yogini_nominations', JSON.stringify(saved));

      // 2. Post to Google Apps Script Webhook if configured
      if (window.YOGINI_WEBHOOK_URL) {
        try {
          await fetch(window.YOGINI_WEBHOOK_URL, {
            method: 'POST',
            mode: 'no-cors',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
          });
        } catch (err) {
          console.warn('Webhook delivery error:', err);
        }
      }

      // Show success screen
      nomForm.style.display = 'none';
      if (successBox) {
        successBox.style.display = 'block';
        const display = document.getElementById('appIdDisplay');
        if (display) display.textContent = appId;
      }
    });
  }
});

// Lightbox functions (global)
function openLightbox(src) {
  const lb = document.getElementById('lightbox');
  const img = document.getElementById('lightboxImg');
  if (lb && img) {
    img.src = src;
    lb.classList.add('open');
  }
}

function closeLightbox() {
  const lb = document.getElementById('lightbox');
  if (lb) lb.classList.remove('open');
}
