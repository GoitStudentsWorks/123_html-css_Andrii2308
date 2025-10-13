import './js/menu';
document.addEventListener('DOMContentLoaded', () => {
  const navLinks = document.querySelectorAll('.header-menu-list a');
  const sections = document.querySelectorAll('section[id]');

  // Плавне прокручування при кліку
  navLinks.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault(); // Запобігаємо стандартному переходу
      const targetId = link.getAttribute('href').substring(1); // Отримуємо id без "#"
      const targetSection = document.getElementById(targetId);

      if (targetSection) {
        targetSection.scrollIntoView({ behavior: 'smooth' }); // Плавне прокручування
      }

      // Оновлюємо клас current
      navLinks.forEach(l => l.classList.remove('current'));
      link.classList.add('current');
    });
  });

  // Відстеження видимих розділів при прокручуванні
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.5, // Активувати, коли 50% секції видно
  };

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.classList.remove('current');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('current');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(section => observer.observe(section));
});
