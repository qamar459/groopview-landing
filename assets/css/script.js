// owl-carousel
$(".owl-carousel").owlCarousel({
  loop: true,
  margin: 40,
  nav: true,
  dots: false,
  autoplay: true,
  navText: [
    '<i class="fa-solid fa-angle-left"></i>',
    '<i class="fa-solid fa-angle-right"></i>',
  ],
  autoplayTimeout: 10000,
  slideTransition: "linear",
  autoplaySpeed: 1000,
  responsive: {
    0: {
      items: 1,
    },
    768: {
      items: 1,
    },
    991: {
      items: 2,
    },
    1200: {
      items: 3,
    },
  },
});
// owl-carousel

// Header Active
$(window).scroll(function () {
  var scroll = $(window).scrollTop();
  if (scroll > 0) {
    $("#header").addClass("active");
  } else {
    $("#header").removeClass("active");
  }
});
// Header Active

// AOS
AOS.init();
// AOS

// mega-menu
document.querySelectorAll(".dropdown-menu").forEach(function (dropdown) {
  dropdown.addEventListener("click", function (e) {
    e.stopPropagation();
  });
});
// mega-menu

// Wait for the DOM to load
document.addEventListener("DOMContentLoaded", function () {
  const links = document.querySelectorAll(".dropdown-item");

  links.forEach((link) => {
    link.addEventListener("click", function () {
      // Remove 'active' from all dropdown items
      links.forEach((l) => l.classList.remove("active"));
      // Add 'active' to the clicked link
      this.classList.add("active");
    });
  });

  // Global close toast function
  function closeToast(toast) {
    if (!toast) return;
    
    toast.classList.remove('show');
    setTimeout(() => {
      if (toast.parentNode) {
        toast.parentNode.removeChild(toast);
      }
    }, 400);
  }

  const form = document.getElementById('contact-form');

  // Create toast container
  const toastContainer = document.createElement('div');
  toastContainer.className = 'toast-container';
  document.body.appendChild(toastContainer);

  // Toast function
  function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
      <div class="toast-content">
        <span class="toast-message">${message}</span>
      </div>
      <button class="toast-close">×</button>
    `;
    
    // Add click event listener to close button
    const closeBtn = toast.querySelector('.toast-close');
    closeBtn.addEventListener('click', () => {
      closeToast(toast);
    });
    
    toastContainer.appendChild(toast);
    
    // Trigger animation
    setTimeout(() => {
      toast.classList.add('show');
    }, 100);
    
    // Auto remove after 20 seconds
    setTimeout(() => {
      closeToast(toast);
    }, 20000);
  }

  // Function to set button loading state
  function setButtonLoading(button, isLoading) {
    if (isLoading) {
      button.disabled = true;
      button.innerHTML = '<span class="spinner"></span> Sending...';
      button.classList.add('loading');
    } else {
      button.disabled = false;
      button.innerHTML = button.getAttribute('data-original-text') || 'Contact Us';
      button.classList.remove('loading');
    }
  }

  // Function to show success message in place of form
  function showContactSuccess(message) {
    const formCard = document.querySelector('.form-card');
    if (formCard) {
      formCard.innerHTML = `
        <div class="success-message">
          <div class="success-icon">
            <i class="fa-solid fa-check"></i>
          </div>
          <h3>Thank You!</h3>
          <p>${message}</p>
        </div>
      `;
    }
  }

  // Function to show error message at bottom of form
  function showContactError(message) {
    // Remove any existing error message
    const existingError = document.querySelector('.form-error');
    if (existingError) {
      existingError.remove();
    }

    // Create error message element
    const errorDiv = document.createElement('div');
    errorDiv.className = 'form-error';
    errorDiv.innerHTML = `
      <div class="error-content">
        <i class="fa-solid fa-exclamation-triangle"></i>
        <span>${message}</span>
      </div>
    `;

    // Insert error message after the form
    const formCard = document.querySelector('.form-card');
    if (formCard) {
      formCard.appendChild(errorDiv);
      
      // Scroll to error message
      errorDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }

  // Function to show subscribe success message
  function showSubscribeSuccess(message) {
    // Remove any existing messages
    const existingMessage = document.querySelector('.subscribe-message');
    if (existingMessage) {
      existingMessage.remove();
    }

    // Create success message element
    const successDiv = document.createElement('div');
    successDiv.className = 'subscribe-message subscribe-success';
    successDiv.innerHTML = `
      <div class="message-content">
        <i class="fa-solid fa-check-circle"></i>
        <span>${message}</span>
      </div>
    `;

    // Insert success message after the subscribe form
    const subscribeCard = document.querySelector('.subscribe-card');
    if (subscribeCard) {
      subscribeCard.appendChild(successDiv);
      
      // Scroll to success message
      successDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }

  // Function to show subscribe error message
  function showSubscribeError(message) {
    // Remove any existing messages
    const existingMessage = document.querySelector('.subscribe-message');
    if (existingMessage) {
      existingMessage.remove();
    }

    // Create error message element
    const errorDiv = document.createElement('div');
    errorDiv.className = 'subscribe-message subscribe-error';
    errorDiv.innerHTML = `
      <div class="message-content">
        <i class="fa-solid fa-exclamation-triangle"></i>
        <span>${message}</span>
      </div>
    `;

    // Insert error message after the subscribe form
    const subscribeCard = document.querySelector('.subscribe-card');
    if (subscribeCard) {
      subscribeCard.appendChild(errorDiv);
      
      // Scroll to error message
      errorDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }

  // Contact form handling
  if (form) {
    const submitButton = form.querySelector('button[type="submit"]');
    
    // Store original button text
    if (submitButton) {
      submitButton.setAttribute('data-original-text', submitButton.innerHTML);
    }

    form.addEventListener('submit', function (event) {
      event.preventDefault();

      // Remove any existing error message
      const existingError = document.querySelector('.form-error');
      if (existingError) {
        existingError.remove();
      }

      // Set loading state
      setButtonLoading(submitButton, true);

      const formData = new FormData(form);

      // 
      showContactSuccess('Thank you for contacting us! We will get back to you soon.');
    });
  }

  // Subscribe form handling
  const subscribeForm = document.getElementById('subscribe-form');
  if (subscribeForm) {
    const subscribeButton = subscribeForm.querySelector('button[type="submit"]');
    
    // Store original button text
    if (subscribeButton) {
      subscribeButton.setAttribute('data-original-text', subscribeButton.innerHTML);
    }

    subscribeForm.addEventListener('submit', function (event) {
      event.preventDefault();

      const email = document.getElementById('subscribe-email').value.trim();
      
      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      
      if (!email) {
        showSubscribeError('Please enter your email address.');
        return;
      }
      
      if (!emailRegex.test(email)) {
        showSubscribeError('Please enter a valid email address.');
        return;
      }
      
      // Set loading state
      setButtonLoading(subscribeButton, true);
      
      const formData = new FormData(subscribeForm);
      
      fetch('./subscribe-handler.php', {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json',
        }
      })
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.text().then(text => {
            try {
              return JSON.parse(text);
            } catch (e) {
              console.error('Invalid JSON response:', text);
              throw new Error('Server returned invalid response');
            }
          });
        })
        .then(data => {
          if (data.success) {
            showSubscribeSuccess(data.message || 'Thank you for subscribing!');
            subscribeForm.reset();
          } else {
            showSubscribeError(data.message || 'Error subscribing. Please try again.');
          }
        })
        .catch(error => {
          console.error('Subscribe error:', error);
          showSubscribeError('Error subscribing. Please try again later.');
        })
        .finally(() => {
          // Reset button state
          setButtonLoading(subscribeButton, false);
        });
      
    });
  }
});
