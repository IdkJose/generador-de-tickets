const form = document.getElementById('ticket-form');
const avatarInput = document.getElementById('avatar');
const ticketSection = document.getElementById('ticket');
const nameResult = document.getElementById('name-result');
const emailResult = document.getElementById('email-result');
const githubResult = document.getElementById('github-result');
const ticketAvatar = document.getElementById('ticket-avatar');

const nameError = document.getElementById('error-name');
const emailError = document.getElementById('error-email');
const githubError = document.getElementById('error-github');
const avatarError = document.getElementById('error-avatar');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  nameError.textContent = '';
  emailError.textContent = '';
  githubError.textContent = '';
  avatarError.textContent = '';

  clearErrorStyles();

  const name = form.fullName.value.trim();
  const email = form.email.value.trim();
  const github = form.github.value.trim();
  const avatarFile = avatarInput.files[0];

  let hasError = false;

  if (!avatarFile) {
    avatarError.textContent = 'Please upload a photo.';
    avatarInput.classList.add('input-error');
    hasError = true;
  } else if (!['image/jpeg', 'image/png'].includes(avatarFile.type) || avatarFile.size > 512000) {
    avatarError.textContent = 'La imagen es muy pesada o no es un formato válido (JPEG o PNG).';
    avatarInput.classList.add('input-error');
    hasError = true;
  }

  if (!name) {
    nameError.textContent = 'Full name is required.';
    form.fullName.classList.add('input-error');
    hasError = true;
  }

  if (!email) {
    emailError.textContent = 'Email is required.';
    form.email.classList.add('input-error');
    hasError = true;
  } else if (!validateEmail(email)) {
    emailError.textContent = 'Please enter a valid email address.';
    form.email.classList.add('input-error');
    hasError = true;
  }

  if (!github) {
    githubError.textContent = 'GitHub username is required.';
    form.github.classList.add('input-error');
    hasError = true;
  }

  if (hasError) return;

  const reader = new FileReader();
  reader.onload = function () {
    ticketAvatar.src = reader.result;
    nameResult.textContent = name;
    emailResult.textContent = email;
    githubResult.textContent = github;

    ticketSection.classList.remove('hidden');
    ticketSection.scrollIntoView({ behavior: 'smooth' });

    form.reset(); 
    clearErrorStyles(); 
  };
  reader.readAsDataURL(avatarFile);
});

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function clearErrorStyles() {
  form.fullName.classList.remove('input-error');
  form.email.classList.remove('input-error');
  form.github.classList.remove('input-error');
  avatarInput.classList.remove('input-error');
}