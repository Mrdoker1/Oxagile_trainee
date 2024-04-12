import Task from '../Task/Task';
import './Card.scss'
import { editCardName, addTaskToCard, updateCardInDOM, deleteCard, setCardColor, getCardColorByID } from '../../services/cardManager'
import TaskInput from '../TaskInput/TaskInput';
import ColorPicker from '../ColorPicker/ColorPicker';
import Button from '../Button/Button';
import { getStateManager } from '../../services/StateManager'

export default function EditableCard({ id, title, color, tasks }) {

  const stateManager = getStateManager();

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
    tasksListElement.appendChild(Task(id, true, task));
  });

  // Инпут для новой таски
  const taskInput = TaskInput((newTaskTitle) => {
    addTaskToCard(id, newTaskTitle); // Функция для добавления задачи должна быть определена и передана в Card
    updateCardInDOM(id, true);
  });

  // Кнопка удаления карточки
  const deleteButton = Button('', () => {
    deleteCard(id); // Удаление карточки из localStorage
    if (stateManager.overlay.open) {
      stateManager.overlay.close();
    }
    updateCardInDOM(id, true);
  }, 'action', 'trash');

  // Color Picker компонент
  const colorPickerElement = ColorPicker(onColorSelect, getCardColorByID(id));
  function onColorSelect(selectedColor) {
    setCardColor(id, selectedColor);
    const updatedCard = updateCardInDOM(id, true);
    const colorPicker = updatedCard.querySelector('.color-picker');
    colorPicker.style.display = 'flex';
  };

  const colorButton = Button('', () => {
    if (colorPickerElement.style.display === 'none') {
      colorPickerElement.style.display = 'flex'; // Показать ColorPicker при первом нажатии
    } else {
      colorPickerElement.style.display = 'none'; // Скрыть ColorPicker при повторном нажатии
    }
  }, 'action', 'palette');

  // Контейнер для экшенов
  const actionContainerElement = document.createElement('ul');
  actionContainerElement.className = 'action-container';
  actionContainerElement.append(colorButton, deleteButton);

  // Создание контейнера для карточки и добавление элементов
  const cardElement = document.createElement('div');
  cardElement.className = 'card';
  cardElement.classList.add('editable');
  cardElement.style.backgroundColor = color; // Устанавливаем цвет фона карточки
  cardElement.setAttribute('data-editable-card-id', id);
  cardElement.appendChild(titleElement);
  if (tasks.length > 0) {
    cardElement.appendChild(tasksListElement);
  }
  cardElement.append(taskInput, actionContainerElement, colorPickerElement);

  return cardElement;
}