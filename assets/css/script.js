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
  const messageContainer = document.getElementById('message');

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

  // Contact form handling
  if (form) {
    form.addEventListener('submit', function (event) {
      event.preventDefault();

      const formData = new FormData(form);

      fetch('contact-form-handler.php', {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json',
        }
      })
        .then(response => response.json())
        .then(data => {
          if (data.success) {
            showToast(data.message, 'success');
            form.reset(); // Reset the form fields after a successful submission
          } else {
            showToast(data.message || 'Error submitting form.', 'error');
          }
        })
        .catch(error => {
          showToast(error.message, 'error');
        });
    });
  }

  // Subscribe form handling
  const subscribeForm = document.getElementById('subscribe-form');
  if (subscribeForm) {
    subscribeForm.addEventListener('submit', function (event) {
      event.preventDefault();

      const email = document.getElementById('subscribe-email').value.trim();
      
      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      
      if (!email) {
        showToast('Please enter your email address.', 'error');
        return;
      }
      
      if (!emailRegex.test(email)) {
        showToast('Please enter a valid email address.', 'error');
        return;
      }
      
      const formData = new FormData(subscribeForm);
      
      fetch('subscribe-handler.php', {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json',
        }
      })
        .then(response => response.json())
        .then(data => {
          if (data.success) {
            showToast(data.message || 'Thank you for subscribing!', 'success');
            subscribeForm.reset();
          } else {
            showToast(data.message || 'Error subscribing. Please try again.', 'error');
          }
        })
        .catch(error => {
          showToast('Error subscribing. Please try again.', 'error');
        });
      
    });
  }
});
