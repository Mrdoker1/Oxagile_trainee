import './TaskInput.scss'

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
  
    return inputElement;
  }
  