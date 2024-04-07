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
  titleElement.addEventListener('blur', function(event) {
    // Сохранение нового значения заголовка карточки
    editCardName(id, this.textContent);
    console.log('Новое значение:', this.textContent);
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
  const deleteButton = Button('Delete Card', () => {
    deleteCard(id); // Удаление карточки из localStorage
    updateCardInDOM(id);
  });

  // Установка цвета карточки
  const colorButton = Button('Set Color', () => {
    setCardColor(id, '#F8DAD1'); // Удаление карточки из localStorage
    updateCardInDOM(id);
  });

  // Создание контейнера для карточки и добавление элементов
  const cardElement = document.createElement('div');
  cardElement.className = 'card';
  cardElement.style.backgroundColor = color; // Устанавливаем цвет фона карточки
  cardElement.setAttribute('data-card-id', id);
  cardElement.appendChild(titleElement);
  cardElement.appendChild(tasksListElement);
  cardElement.appendChild(taskInput); // Добавление инпута для новой задачи в карточку
  cardElement.appendChild(deleteButton);
  cardElement.appendChild(colorButton);

  return cardElement;
}