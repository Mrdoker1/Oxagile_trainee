import Task from '../Task/Task';
import './Card.scss'
import { editCardName, addTaskToCard, updateCardInDOM, deleteCard, setCardColor, getCardColorByID } from '../../services/cardManager'
import TaskInput from '../TaskInput/TaskInput';
import openOverlay from '../../components/Overlay/Overlay'
import ColorPicker from '../ColorPicker/ColorPicker';
import Button from '../Button/Button';
import { getStateManager } from '../../services/StateManager'

export default function Card({ id, title, color, tasks }) {

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
    tasksListElement.appendChild(Task(id, task));
  });

  // Инпут для новой таски
  const taskInput = TaskInput((newTaskTitle) => {
    addTaskToCard(id, newTaskTitle); // Функция для добавления задачи должна быть определена и передана в Card
    updateCardInDOM(id);
  });

  // Кнопка удаления карточки
  const deleteButton = Button('', () => {
    if (stateManager.overlay.open) {
      stateManager.overlay.onCLose();
      console.log('Overlay closed');
    }
    deleteCard(id); // Удаление карточки из localStorage
    updateCardInDOM(id);  
  }, 'action', 'trash');

  // Кнопка редактирования карточки
  const moreButton = Button('', () => {
    stateManager.editableCardId = id;
    openOverlay(Card({ id, title, color, tasks }), () => updateCardInDOM(id));
  }, 'action', 'more');
  moreButton.style.paddingLeft = '20px';

  // Color Picker компонент
  const colorPickerElement = ColorPicker(onColorSelect, getCardColorByID(id));
  function onColorSelect(selectedColor) {
    setCardColor(id, selectedColor);
    const updatedCard = updateCardInDOM(id);
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
  cardElement.style.backgroundColor = color; // Устанавливаем цвет фона карточки
  cardElement.setAttribute('data-card-id', id);
  cardElement.appendChild(titleElement);
  if (tasks.length > 0) {
    cardElement.appendChild(tasksListElement);
  }

  //Если карточка редактируется
  if (stateManager.overlay.open || stateManager.editableCardId === id) {
    cardElement.append(taskInput, actionContainerElement, colorPickerElement);
  } else {
    cardElement.appendChild(moreButton);
  }

  return cardElement;
}