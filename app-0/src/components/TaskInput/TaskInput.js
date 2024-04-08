import './TaskInput.scss'
import addIcon from '../../icons/add.svg';

export default function TaskInput(callback) {
    const inputElement = document.createElement('div');
    inputElement.className = 'task-input';
    inputElement.setAttribute('contenteditable', 'true');
    inputElement.setAttribute('role', 'textbox'); // Улучшение доступности
    inputElement.setAttribute('data-placeholder', 'Add a new task');

    // Обработка события потери фокуса для добавления задачи
    inputElement.addEventListener('blur', function(event) {
      const text = this.textContent.trim();
      if (text !== '') {
        callback(text);
        this.innerHTML = ''; // Очистка содержимого после добавления задачи
      }
    });

    const inputContainerElement = document.createElement('div');
    inputContainerElement.className = 'input-container';
    const img = document.createElement('img');
    img.src = addIcon;
    inputContainerElement.append(img, inputElement);
  
    return inputContainerElement;
  }
  