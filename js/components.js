document.addEventListener('DOMContentLoaded', () => {
  // Age verification
  checkAge();

  // Load header.html
  fetch('./components/header.html')
    .then(response => {
      if (!response.ok) throw new Error(`Failed to load: ${response.statusText}`);
      return response.text();
    })
    .then(data => {
      const header = document.getElementById('header');
      if (header) {
        header.innerHTML = data;
      } else {
        console.error('Header container not found!');
      }
    })
    .catch(error => console.error('Error loading header component:', error));

  // Load footer.html
  fetch('./components/footer.html')
    .then(response => {
      if (!response.ok) throw new Error(`Failed to load: ${response.statusText}`);
      return response.text();
    })
    .then(data => {
      const footer = document.getElementById('footer');
      if (footer) {
        footer.innerHTML = data;
      } else {
        console.error('Footer container not found!');
      }
    })
    .catch(error => console.error('Error loading footer component:', error));
});

function checkAge() {
  const ageVerified = localStorage.getItem('ageVerified');
  if (ageVerified !== 'true') {
    showAgeModal();
  } else {
    checkCookies();
  }
}

function showAgeModal() {
  const modal = document.createElement('div');
  modal.id = 'age-modal';
  modal.classList.add('modal');

  const modalContent = document.createElement('div');
  modalContent.classList.add('modal-content');

  const question = document.createElement('p');
  question.textContent = 'Are you 18 years old or older?';

  const yesButton = document.createElement('button');
  yesButton.textContent = 'Yes';
  yesButton.onclick = () => {
    localStorage.setItem('ageVerified', 'true');
    modal.style.opacity = '0';
    setTimeout(() => {
      document.body.removeChild(modal);
      checkCookies();
    }, 500);
  };

  const noButton = document.createElement('button');
  noButton.textContent = 'No';
  noButton.onclick = () => {
    alert('You must be 18 years old or older to view this content.');
    window.location.href = 'https://www.google.com';
  };

  modalContent.appendChild(question);
  modalContent.appendChild(yesButton);
  modalContent.appendChild(noButton);
  modal.appendChild(modalContent);
  document.body.appendChild(modal);
}

function checkCookies() {
  const cookiesAccepted = localStorage.getItem('cookiesAccepted');
  const cookiesDecline = localStorage.getItem('cookiesDecline');
  if (cookiesAccepted !== 'true' && cookiesDecline !== 'true') {
    showCookiesBanner();
  }
}

function showCookiesBanner() {
  const banner = document.createElement('div');
  banner.id = 'cookies-banner';
  banner.classList.add('cookies-banner');

  const message = document.createElement('p');
  message.innerHTML = 'We use cookies on this site to enhance your user experience. For a complete overview of all cookies used, please see your <a href="cookie-policy.html" class="cookies-link">Cookie Policy</a>. You can familiarize with our <a href="privacy-policy.html" class="cookies-link">Privacy Policy</a>.';

  const acceptButton = document.createElement('button');
  acceptButton.textContent = 'Accept';
  acceptButton.classList.add('cookies-button');
  acceptButton.onclick = () => {
    localStorage.setItem('cookiesAccepted', 'true');
    banner.style.transform = 'translateY(100%)';
    setTimeout(() => {
      document.body.removeChild(banner);
    }, 500);
  };

  const declineButton = document.createElement('button');
  declineButton.textContent = 'Decline';
  declineButton.classList.add('cookies-button');
  declineButton.onclick = () => {
    localStorage.setItem('cookiesDecline', 'true');
    banner.style.transform = 'translateY(100%)';
    setTimeout(() => {
      document.body.removeChild(banner);
    }, 500);
  };

  banner.appendChild(message);
  banner.appendChild(acceptButton);
  banner.appendChild(declineButton);
  document.body.appendChild(banner);

  setTimeout(() => {
    banner.style.transform = 'translateY(0)';
  }, 10);
}