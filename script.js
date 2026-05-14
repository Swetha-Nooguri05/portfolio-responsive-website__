// ========================================
// Portfolio Website - Interactive JavaScript
// ========================================

// Initialize AOS (Animate On Scroll)
if (typeof AOS !== 'undefined') {
  AOS.init({
    duration: 800,
    once: true,
    offset: 100,
  });
}

// ========================================
// Smooth Scroll for Internal Links
// ========================================
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href !== '#' && document.querySelector(href)) {
      e.preventDefault();
      const target = document.querySelector(href);
      const offsetTop = target.offsetTop - 80; // Account for sticky navbar
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth',
      });
    }
  });
});

// ========================================
// Contact Form Handler with Validation
// ========================================
const contactForm = document.getElementById('contactForm');

if (contactForm) {
  contactForm.addEventListener('submit', async function (e) {
    e.preventDefault();

    // Get form values
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();

    // Validation
    if (!name || !email || !subject || !message) {
      showAlert('Please fill in all fields', 'danger');
      return;
    }

    if (!validateEmail(email)) {
      showAlert('Please enter a valid email address', 'danger');
      return;
    }

    if (message.length < 10) {
      showAlert('Message must be at least 10 characters long', 'danger');
      return;
    }

    // Disable submit button
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Sending...';

    try {
      // Here you would normally send the form data to a server
      // For now, we'll simulate a successful submission
      await simulateFormSubmission(name, email, subject, message);

      // Success
      showAlert('Message sent successfully! I\'ll get back to you soon.', 'success');
      contactForm.reset();

      // Log form data (for debugging)
      console.log('Form submitted:', { name, email, subject, message });
    } catch (error) {
      showAlert('An error occurred. Please try again later.', 'danger');
      console.error('Form submission error:', error);
    } finally {
      // Re-enable submit button
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalText;
    }
  });
}

// ========================================
// Email Validation Function
// ========================================
function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// ========================================
// Alert Display Function
// ========================================
function showAlert(message, type = 'info') {
  const alertBox = document.createElement('div');
  alertBox.className = `alert alert-${type} alert-dismissible fade show`;
  alertBox.setAttribute('role', 'alert');
  alertBox.innerHTML = `
    ${message}
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
  `;

  // Insert at the top of the contact section
  const contactSection = document.getElementById('contact');
  if (contactSection) {
    contactSection.insertAdjacentElement('afterbegin', alertBox);

    // Auto-dismiss after 5 seconds
    setTimeout(() => {
      alertBox.remove();
    }, 5000);
  }
}

// ========================================
// Simulate Form Submission
// ========================================
function simulateFormSubmission(name, email, subject, message) {
  return new Promise((resolve) => {
    // Simulate network delay
    setTimeout(() => {
      resolve({
        status: 'success',
        message: 'Your message has been received.',
      });
    }, 1500);
  });
}

// ========================================
// Navbar Active Link Handler
// ========================================
document.addEventListener('scroll', () => {
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.navbar-nav .nav-link');

  let current = '';
  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 120;
    if (scrollY >= sectionTop) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove('active');
    if (link.getAttribute('href').slice(1) === current) {
      link.classList.add('active');
    }
  });
});

// ========================================
// Scroll Progress Indicator
// ========================================
window.addEventListener('scroll', () => {
  const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
  // You can use this for a progress bar if needed
  // Example: document.querySelector('.progress-bar').style.width = scrollPercent + '%';
});

// ========================================
// Mobile Menu Close on Link Click
// ========================================
document.querySelectorAll('.navbar-nav .nav-link').forEach((link) => {
  link.addEventListener('click', () => {
    const navbarToggle = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');

    if (navbarCollapse.classList.contains('show')) {
      navbarToggle.click();
    }
  });
});

// ========================================
// Skill Progress Animation
// ========================================
function animateSkillBars() {
  const progressBars = document.querySelectorAll('.progress-bar');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
        const width = entry.target.style.width;
        entry.target.style.width = '0';
        entry.target.classList.add('animated');

        setTimeout(() => {
          entry.target.style.transition = 'width 1.5s ease';
          entry.target.style.width = width;
        }, 100);
      }
    });
  });

  progressBars.forEach((bar) => observer.observe(bar));
}

// Call skill animation on page load
document.addEventListener('DOMContentLoaded', animateSkillBars);

// ========================================
// Counter Animation (if needed)
// ========================================
function animateCounters() {
  const counters = document.querySelectorAll('[data-count]');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
        const target = parseInt(entry.target.getAttribute('data-count'));
        let current = 0;
        const increment = target / 50;

        entry.target.classList.add('animated');

        const updateCount = () => {
          current += increment;
          if (current < target) {
            entry.target.textContent = Math.floor(current) + '+';
            requestAnimationFrame(updateCount);
          } else {
            entry.target.textContent = target + '+';
          }
        };

        updateCount();
      }
    });
  });

  counters.forEach((counter) => observer.observe(counter));
}

// Call counter animation on page load
document.addEventListener('DOMContentLoaded', animateCounters);

// ========================================
// Keyboard Navigation
// ========================================
document.addEventListener('keydown', (e) => {
  // Escape key to close modals or alerts
  if (e.key === 'Escape') {
    const alerts = document.querySelectorAll('.alert');
    alerts.forEach((alert) => alert.remove());
  }
});

// ========================================
// Performance: Lazy Loading Images
// ========================================
if ('IntersectionObserver' in window) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.remove('lazy');
        observer.unobserve(img);
      }
    });
  });

  document.querySelectorAll('img[data-src]').forEach((img) => imageObserver.observe(img));
}

// ========================================
// Dark Mode Toggle (Optional Feature)
// ========================================
function initDarkMode() {
  const darkModeToggle = document.getElementById('darkModeToggle');
  if (darkModeToggle) {
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    if (isDarkMode) {
      document.body.classList.add('dark-mode');
      darkModeToggle.checked = true;
    }

    darkModeToggle.addEventListener('change', () => {
      document.body.classList.toggle('dark-mode');
      localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
    });
  }
}

document.addEventListener('DOMContentLoaded', initDarkMode);

// ========================================
// Print Friendly Styles
// ========================================
window.addEventListener('beforeprint', () => {
  document.body.style.backgroundImage = 'none';
});

// ========================================
// Console Message
// ========================================
console.log('%cWelcome to my portfolio! 🎉', 'font-size: 20px; color: #0d6efd; font-weight: bold;');
console.log('%cLooking for freelance or full-time opportunities.', 'font-size: 14px; color: #6c757d;');
console.log('%cGet in touch: swetha@example.com', 'font-size: 14px; color: #198754; font-weight: bold;');
