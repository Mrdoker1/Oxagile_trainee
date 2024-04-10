import Task from '../Task/Task';
import './Card.scss'
import { updateCardInDOM } from '../../services/cardManager'
import openOverlay from '../../components/Overlay/Overlay'
import Button from '../Button/Button';
import EditableCard from './EditableCard';

export default function Card({ id, title, color, tasks }) {

  // Редактируемый заголовок
  const titleElement = document.createElement('h2');
  titleElement.className = 'card-title';
  titleElement.textContent = title;

  // Список задач карточки
  const tasksListElement = document.createElement('ul');
  tasksListElement.className = 'card-tasks';
  tasks.forEach(task => {
    tasksListElement.appendChild(Task(id, false, task));
  });

  // Кнопка редактирования карточки
  const moreButton = Button('', () => {
    openOverlay(EditableCard({ id, title, color, tasks }), () => updateCardInDOM(id));
  }, 'action', 'more');
  moreButton.style.paddingLeft = '20px';

  // Создание контейнера для карточки и добавление элементов
  const cardElement = document.createElement('div');
  cardElement.className = 'card';
  cardElement.style.backgroundColor = color; // Устанавливаем цвет фона карточки
  cardElement.setAttribute('data-card-id', id);
  cardElement.appendChild(titleElement);
  if (tasks.length > 0) {
    cardElement.appendChild(tasksListElement);
  }
  cardElement.appendChild(moreButton);

  return cardElement;
}