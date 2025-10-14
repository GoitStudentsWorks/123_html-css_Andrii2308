import './js/menu';
document.addEventListener('DOMContentLoaded', () => {
  // Розширений селектор: всі a[href^="#"] в хедері і футері (або скрізь на сторінці)
  // Якщо хочеш тільки хедер + футер: '.header-menu-links, .tel-list'
  const allAnchorLinks = document.querySelectorAll('a[href^="#"]');
  const sections = document.querySelectorAll('section[id]');

  // Плавне прокручування при кліку (тепер для всіх якірних посилань)
  allAnchorLinks.forEach(link => {
    link.addEventListener('click', e => {
      const href = link.getAttribute('href');
      if (href === '#' || href === '') return; // Ігноруємо порожні

      e.preventDefault(); // Запобігаємо стандартному переходу
      const targetId = href.substring(1); // Отримуємо id без "#"
      const targetSection = document.getElementById(targetId);

      if (targetSection) {
        // Опціонально: offset для фіксованого хедера (щоб не ховав секцію)
        const headerOffset = 80; // Заміни на висоту твого хедера (наприклад, 100 якщо вищий)
        const elementPosition =
          targetSection.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = elementPosition - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth', // Плавний скрол
        });

        // Оновлюємо клас current тільки для хедерних посилань (як було)
        // Якщо хочеш для футера теж — розшир navLinks
        const navLinks = document.querySelectorAll('.header-menu-list a'); // Залишаємо тільки хедер
        navLinks.forEach(l => l.classList.remove('current'));
        const correspondingHeaderLink = document.querySelector(
          `.header-menu-list a[href="${href}"]`
        );
        if (correspondingHeaderLink) {
          correspondingHeaderLink.classList.add('current');
        }
      }
    });
  });

  // Відстеження видимих розділів при прокручуванні (залишаємо для хедера)
  const observerOptions = {
    root: null,
    rootMargin: '-50% 0px -50% 0px', // Краще для центру екрану, або твій threshold: 0.5
    threshold: 0,
  };

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        const navLinks = document.querySelectorAll('.header-menu-list a'); // Тільки хедер
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
