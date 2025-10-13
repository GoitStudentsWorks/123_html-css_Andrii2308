/*alert("Привіт, світ!"); */
// Отримуємо елементи з DOM
const burgerMenu = document.querySelector('.burger-menu'); // Саме меню
const burgerOpenButton = document.querySelector('.header-burger-button'); // Кнопка відкриття (в header)
const burgerCloseButton = document.querySelector('.burger-close-button'); // Кнопка закриття (хрестик)

// Функція відкриття меню
function openBurgerMenu() {
  burgerMenu.classList.add('is-open'); // Додаємо клас для відображення
  document.body.style.overflow = 'hidden'; // Блокуємо прокрутку body
}

// Функція закриття меню
function closeBurgerMenu() {
  burgerMenu.classList.remove('is-open'); // Прибираємо клас
  document.body.style.overflow = ''; // Повертаємо прокрутку
}

// Слухачі подій
burgerOpenButton.addEventListener('click', openBurgerMenu); // Відкриття при кліку на бургер
burgerCloseButton.addEventListener('click', closeBurgerMenu); // Закриття при кліку на хрестик

// Закриття при кліку на посилання в меню (опціонально)
const burgerLinks = document.querySelectorAll('.burger-menu-link');
burgerLinks.forEach(link => {
  link.addEventListener('click', closeBurgerMenu);
});