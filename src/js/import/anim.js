document.addEventListener('DOMContentLoaded', function () {
  const sections = document.querySelectorAll('section');
  const header = document.querySelector('header');

  const animateSection = (element, animationClass) => {
    element.classList.add('animate__animated', animationClass);

    const animationEndHandler = () => {
      element.removeEventListener('animationend', animationEndHandler);
    };

    element.addEventListener('animationend', animationEndHandler, {
      once: true,
    });
  };

  const observeElement = (element, animationClass) => {
    const elementObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateSection(element, animationClass);
            elementObserver.unobserve(entry.target);
          }
        });
      },
      {
        threshold: window.innerWidth >= 768 ? 0.5 : 0.25,
      }
    );

    elementObserver.observe(element);
  };

  sections.forEach((section) => observeElement(section, 'animate__fadeIn'));
  observeElement(header, 'animate__fadeInDown');
});
