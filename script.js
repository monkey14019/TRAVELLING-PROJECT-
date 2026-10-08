// travelingproject - Modern Interactive Script
document.addEventListener('DOMContentLoaded', () => {
  // Mobile navigation toggle
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mainNav = document.getElementById('mainNav');

  if (mobileMenuBtn && mainNav) {
    mobileMenuBtn.addEventListener('click', () => {
      mainNav.classList.toggle('active');
      const icon = mobileMenuBtn.querySelector('i');
      if (icon) {
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-xmark');
      }
    });

    // Close menu when clicking links
    mainNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mainNav.classList.remove('active');
        const icon = mobileMenuBtn.querySelector('i');
        if (icon) {
          icon.classList.add('fa-bars');
          icon.classList.remove('fa-xmark');
        }
      });
    });
  }

  // Smooth scroll with active navbar highlighting
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id], header[id]');

  window.addEventListener('scroll', () => {
    let current = '';
    const scrollPosition = window.pageYOffset + 120;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });

  // Video Modal handling
  const playVideoBtn = document.getElementById('playVideoBtn');
  const videoModal = document.getElementById('videoModal');
  const closeVideoModal = document.getElementById('closeVideoModal');
  const modalVideoFrame = document.getElementById('modalVideoFrame');

  if (playVideoBtn && videoModal && closeVideoModal) {
    playVideoBtn.addEventListener('click', () => {
      videoModal.classList.add('active');
      document.body.style.overflow = 'hidden';
      // Load sample video or travel teaser embed
      if (modalVideoFrame) {
        modalVideoFrame.src = 'https://www.youtube.com/embed/ScMzIvxBSi4?autoplay=1';
      }
    });

    const closeModal = () => {
      videoModal.classList.remove('active');
      document.body.style.overflow = '';
      if (modalVideoFrame) {
        modalVideoFrame.src = '';
      }
    };

    closeVideoModal.addEventListener('click', closeModal);
    videoModal.addEventListener('click', (e) => {
      if (e.target === videoModal) closeModal();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && videoModal.classList.contains('active')) {
        closeModal();
      }
    });
  }

  // Request a Call action
  const requestCallBtn = document.getElementById('requestCallBtn');
  if (requestCallBtn) {
    requestCallBtn.addEventListener('click', () => {
      showToast('📞 Thank you! A travel consultant will call you within 15 minutes.', 'success');
    });
  }

  // Destination Card interactive booking
  const destCards = document.querySelectorAll('.destination-card');
  destCards.forEach(card => {
    const bookBtn = card.querySelector('.book-btn');
    const destName = card.querySelector('.dest-name')?.textContent || 'this destination';
    const price = card.querySelector('.price-tag')?.textContent || '';

    if (bookBtn) {
      bookBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        showToast(`🎉 Great choice! Package for ${destName} (${price}) added to your itinerary wishlist.`, 'success');
      });
    }

    card.addEventListener('click', () => {
      showToast(`📍 Selected ${destName} — ${price} / person`, 'info');
    });
  });

  // Newsletter form submission
  const newsletterForm = document.getElementById('newsletterForm');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const nameInput = document.getElementById('newsName');
      const emailInput = document.getElementById('newsEmail');

      if (!nameInput.value.trim() || !emailInput.value.trim()) {
        showToast('⚠️ Please enter both your name and email address.', 'warning');
        return;
      }

      if (!validateEmail(emailInput.value)) {
        showToast('⚠️ Please enter a valid email address.', 'warning');
        return;
      }

      showToast(`✨ Thanks for subscribing, ${nameInput.value.trim()}! Special deals are on their way.`, 'success');
      nameInput.value = '';
      emailInput.value = '';
    });
  }

  // Helper: Email validation
  function validateEmail(email) {
    return String(email)
      .toLowerCase()
      .match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  }

  // Modern Toast notification system
  function showToast(message, type = 'info') {
    let toastContainer = document.getElementById('toastContainer');
    if (!toastContainer) {
      toastContainer = document.createElement('div');
      toastContainer.id = 'toastContainer';
      toastContainer.className = 'toast-container';
      document.body.appendChild(toastContainer);
    }

    const toast = document.createElement('div');
    toast.className = `toast-item toast-${type}`;
    toast.innerHTML = `
      <div class="toast-content">${message}</div>
      <button class="toast-close" aria-label="Close notification">&times;</button>
    `;

    toastContainer.appendChild(toast);

    // Auto dismiss after 4.5 seconds
    const timer = setTimeout(() => {
      removeToast(toast);
    }, 4500);

    toast.querySelector('.toast-close').addEventListener('click', () => {
      clearTimeout(timer);
      removeToast(toast);
    });
  }

  function removeToast(toast) {
    toast.classList.add('toast-fadeout');
    setTimeout(() => {
      if (toast.parentElement) toast.parentElement.removeChild(toast);
    }, 300);
  }
});
