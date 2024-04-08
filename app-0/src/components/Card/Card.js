import Task from '../Task/Task';
import './Card.scss'
import { editCardName, addTaskToCard, updateCardInDOM, deleteCard, setCardColor } from '../../services/cardManager'
import TaskInput from '../TaskInput/TaskInput';
import Button from '../Button/Button';

export default function Card({ id, title, color, tasks }) {  
  // Редактируемый заголовок
  const titleElement = document.createElement('h2');
  titleElement.className = 'card-title';
  titleElement.textContent = title;
  titleElement.setAttribute('contenteditable', 'true');
  titleElement.setAttribute('data-placeholder', 'Type list title');
  titleElement.addEventListener('blur', function() {
    editCardName(id, this.textContent);
  });

  // Список задач карточки
  const tasksListElement = document.createElement('ul');
  tasksListElement.className = 'card-tasks';
  tasks.forEach(task => {
    tasksListElement.appendChild(Task(id, task));
  });

  // Инпут для новой таски
  const taskInput = TaskInput((newTaskTitle) => {
    addTaskToCard(id, newTaskTitle); // Функция для добавления задачи должна быть определена и передана в Card
    updateCardInDOM(id);
  });

  // Кнопка удаления карточки
  const deleteButton = Button('', () => {
    deleteCard(id); // Удаление карточки из localStorage
    updateCardInDOM(id);
  }, 'action', 'trash');

  // Установка цвета карточки
  const colorButton = Button('', () => {
    setCardColor(id, '#F8DAD1'); // Удаление карточки из localStorage
    updateCardInDOM(id);
  }, 'action', 'palette');

  // Контейнер для экшенов
  const actionContainerElement = document.createElement('ul');
  actionContainerElement.className = 'action-container';
  actionContainerElement.appendChild(deleteButton);
  actionContainerElement.appendChild(colorButton);

  // Создание контейнера для карточки и добавление элементов
  const cardElement = document.createElement('div');
  cardElement.className = 'card';
  cardElement.style.backgroundColor = color; // Устанавливаем цвет фона карточки
  cardElement.setAttribute('data-card-id', id);
  cardElement.appendChild(titleElement);
  if (tasks.length > 0) {
    cardElement.appendChild(tasksListElement);
  }
  cardElement.append(taskInput, actionContainerElement); // Добавление инпута для новой задачи в карточку

  return cardElement;
}