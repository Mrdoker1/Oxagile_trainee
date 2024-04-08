import './MainPage.scss';
import openOverlay from '../../components/Overlay/Overlay'
import Button from '../../components/Button/Button';
import Card from '../../components/Card/Card';
import { addCard, updateCardInDOM } from '../../services/cardManager';

export default function Page(cards) {
  // Создаем основной элемент страницы
  const pageElement = document.createElement('div');
  pageElement.classList.add('page');
  pageElement.setAttribute('data-page', 'main');

  // Добавляем карточки на страницу
  cards.forEach(card => {
    pageElement.appendChild(card);
  });

  // Создаем и добавляем кнопку на страницу
  const myButton = Button('', () => {
    const newCard = addCard();
    const emptyCard = { title: '', id: newCard.id, tasks: [] }
    const closeOverlay = openOverlay(Card(emptyCard), () => updateCardInDOM(newCard.id));
    console.log('Кнопка была нажата!');
  }, 'cta', 'plus');
  pageElement.appendChild(myButton);

  return pageElement;
}