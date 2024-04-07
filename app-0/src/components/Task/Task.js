import './Task.scss'
import { editTaskInCard, toggleTaskCompleted, deleteTaskFromCard, updateCardInDOM } from '../../services/cardManager'
import Button from '../../components/Button/Button';

export default function Task(cardID, { id, title, completed }) {

  // Чекбокс
  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.checked = completed; // Установка начального состояния чекбокса
  checkbox.className = 'task-checkbox'; // Добавляем класс для возможного стилизирования
   // Обработчик события изменения чекбокса
   checkbox.addEventListener('change', () => {
    toggleTaskCompleted(cardID, id); // Переключение состояния задачи
    updateCardInDOM(cardID)
  });

  // Редактируемый заголовок
  const titleElement = document.createElement('div'); 
  titleElement.textContent = title;
  titleElement.setAttribute('contenteditable', 'true');
  titleElement.setAttribute('data-placeholder', 'List item');
  titleElement.className = 'task-title';
  titleElement.addEventListener('blur', function(event) {
    console.log('Новое значение:', this.textContent);
    editTaskInCard(cardID, id, this.textContent);
    // Здесь код для сохранения нового значения в localStorage
  });

  // Создание кнопки удаления и добавление ее в элемент задачи
  const deleteButton = Button('Delete', () => {
      deleteTaskFromCard(cardID, id); // Удаление задачи из карточки
      updateCardInDOM(cardID); // Обновление DOM для отражения изменений
    }
  );

  // Создание контейнера для задачи и добавление задачи
  const taskElement = document.createElement('li');
  taskElement.className = `task ${completed ? 'task-completed' : ''}`;
  taskElement.setAttribute('data-task-id', id);
  taskElement.appendChild(checkbox); // Сначала добавляем чекбокс
  taskElement.appendChild(titleElement); // Затем заголовок задачи
  taskElement.appendChild(deleteButton); // Добавление кнопки удаления в элемент задачи

  return taskElement;
}