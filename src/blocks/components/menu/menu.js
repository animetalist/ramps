const menuButton = document.getElementById('topmenu-btn');
const mobileMenu = document.getElementById('topmenu');

const openMobileMenu = (event) => {
  menuButton.classList.toggle('active');
  mobileMenu.classList.toggle('active');
  event.stopPropagation();
};

const closeMobileMenu = () => {
  menuButton.classList.remove('active');
  mobileMenu.classList.remove('active');
};

const setupMobileMenu = () => {
  if (window.innerWidth < 768) {
    menuButton.addEventListener('click', openMobileMenu);
    document.addEventListener('click', closeMobileMenu);
  } else {
    menuButton.removeEventListener('click', openMobileMenu);
    document.removeEventListener('click', closeMobileMenu);
    closeMobileMenu();
  }
};

setupMobileMenu();

window.addEventListener('resize', () => {
  setupMobileMenu();
});
