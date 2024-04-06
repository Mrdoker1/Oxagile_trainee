import './MainPage.scss';
import Button from '../../components/Button/Button';

export default function Page(cards) {
  // Создаем основной элемент страницы
  const pageElement = document.createElement('div');
  pageElement.classList.add('page');
  pageElement.setAttribute('data-page', 'main');

  // Добавляем карточки на страницу
  // Предполагается, что cards - это уже DOM-элементы
  cards.forEach(card => {
    pageElement.appendChild(card);
  });

  // Создаем и добавляем кнопку в страницу
  const myButton = Button('Нажать меня', () => {
    console.log('Кнопка была нажата!');
  });
  pageElement.appendChild(myButton);

  return pageElement;
}