import './Task.scss'
import { editTaskInCard, toggleTaskCompleted, deleteTaskFromCard, updateCardInDOM } from '../../services/cardManager'
import Button from '../../components/Button/Button';

export default function Task(cardID, editable, { id, title, completed }) {

  const taskContainerElement = document.createElement('div');
  taskContainerElement.className = 'task-container';

  // Чекбокс
  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.checked = completed; // Установка начального состояния чекбокса
  checkbox.className = 'task-checkbox'; // Добавляем класс для возможного стилизирования
   // Обработчик события изменения чекбокса
  checkbox.addEventListener('change', () => {
    toggleTaskCompleted(cardID, id); // Переключение состояния задачи
    editable ? updateCardInDOM(cardID, true) : updateCardInDOM(cardID)
  });

  // Редактируемый заголовок
  const titleElement = document.createElement('div'); 
  titleElement.textContent = title;
  titleElement.setAttribute('data-placeholder', 'List item');
  titleElement.className = 'task-title';
  if (editable) {
    titleElement.setAttribute('contenteditable', 'true');
    titleElement.classList.add('editable');
    titleElement.addEventListener('blur', function(event) {
      console.log('Новое значение:', this.textContent);
      editTaskInCard(cardID, id, this.textContent);
      // Здесь код для сохранения нового значения в localStorage
    });
  }

  taskContainerElement.append(checkbox, titleElement);

  // Создание кнопки удаления и добавление ее в элемент задачи
  const deleteButton = Button('', () => {
      deleteTaskFromCard(cardID, id); // Удаление задачи из карточки
      updateCardInDOM(cardID, true); // Обновление DOM для отражения изменений
    }
  , 'action', 'cross');

  // Создание контейнера для задачи и добавление задачи
  const taskElement = document.createElement('li');
  taskElement.className = `task ${completed ? 'task-completed' : ''}`;
  taskElement.setAttribute('data-task-id', id);
  taskElement.appendChild(taskContainerElement);
  if (editable) {
    taskElement.appendChild(deleteButton);
  }

  return taskElement;
}