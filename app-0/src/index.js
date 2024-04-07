import './style.scss';
import Card from './components/Card/Card';
import MainPage from './pages/Main/MainPage';
import fetchData from './services/dataService';
import { loadCards } from './services/cardManager';

document.addEventListener('DOMContentLoaded', async () => {
    const app = document.querySelector('#root');

    // Создание главной страницы и добавление карточек
    const cardElements = loadCards().map(cardData => Card(cardData));
    const mainPageElement = MainPage(cardElements); // MainPage ожидает массив DOM-элементов карточек

    // Очищаем содержимое корневого элемента и добавляем нашу главную страницу
    app.innerHTML = '';
    app.appendChild(mainPageElement);
  });