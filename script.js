const cartCount = document.querySelector('#cart-count');
const toast = document.querySelector('.toast');
let cartItems = 0;

document.querySelectorAll('.quick-add').forEach((button) => {
  button.addEventListener('click', (event) => {
    event.preventDefault();
    event.stopPropagation();
    cartItems += 1;
    cartCount.textContent = cartItems;
    toast.classList.add('show');
    window.clearTimeout(window.smsToastTimer);
    window.smsToastTimer = window.setTimeout(() => toast.classList.remove('show'), 2400);
  });
});

const filterButtons = document.querySelectorAll('.filter-button');
const cards = document.querySelectorAll('.product-card');
function setFilter(filter) {
  filterButtons.forEach((button) => button.classList.toggle('active', button.dataset.filter === filter));
  cards.forEach((card) => {
    const categories = card.dataset.category.split(' ');
    card.hidden = filter !== 'all' && !categories.includes(filter);
  });
  document.querySelector('#shop').scrollIntoView({ behavior: 'smooth', block: 'start' });
}
filterButtons.forEach((button) => button.addEventListener('click', () => setFilter(button.dataset.filter)));
document.querySelectorAll('[data-filter="new"]').forEach((link) => link.addEventListener('click', (event) => {
  event.preventDefault();
  setFilter('new');
}));

const searchModal = document.querySelector('.search-modal');
document.querySelector('.search-button').addEventListener('click', () => {
  searchModal.classList.add('is-open');
  searchModal.setAttribute('aria-hidden', 'false');
  document.querySelector('#site-search').focus();
});
document.querySelector('.close-search').addEventListener('click', () => {
  searchModal.classList.remove('is-open');
  searchModal.setAttribute('aria-hidden', 'true');
});
searchModal.addEventListener('click', (event) => {
  if (event.target === searchModal) document.querySelector('.close-search').click();
});

const menuToggle = document.querySelector('.menu-toggle');
const drawer = document.querySelector('.mobile-drawer');
menuToggle.addEventListener('click', () => {
  const isOpen = drawer.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
  drawer.setAttribute('aria-hidden', String(!isOpen));
});

document.querySelector('.signup-form').addEventListener('submit', (event) => {
  event.preventDefault();
  const message = document.querySelector('.form-message');
  message.textContent = 'You’re on the list. See you in colour.';
  event.currentTarget.querySelector('input').value = '';
});
