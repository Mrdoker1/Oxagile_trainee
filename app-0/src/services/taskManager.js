import { saveToLocalStorage, loadFromLocalStorage } from './storage';

const TASKS_KEY = 'tasks';

export const loadTasks = () => {
  return loadFromLocalStorage(TASKS_KEY) || [];
};

export const saveTasks = (tasks) => {
  saveToLocalStorage(TASKS_KEY, tasks);
};

// Добавление задачи в карточку
export const addTaskToCard = (cardId, taskTitle) => {
  const cards = loadCards();
  const card = cards.find(card => card.id === cardId);
  if (card) {
    const newTask = {
      id: Date.now(),
      title: taskTitle,
      completed: false
    };
    card.tasks.push(newTask);
    saveCards(cards);
  }
};

// Удаление задачи из карточки
export const deleteTaskFromCard = (cardId, taskId) => {
  const cards = loadCards();
  const card = cards.find(card => card.id === cardId);
  if (card) {
    card.tasks = card.tasks.filter(task => task.id !== taskId);
    saveCards(cards);
  }
};

// Переключение состояния задачи (выполнено/не выполнено)
export const toggleTaskCompleted = (cardId, taskId) => {
  const cards = loadCards();
  const card = cards.find(card => card.id === cardId);
  if (card) {
    const task = card.tasks.find(task => task.id === taskId);
    if (task) {
      task.completed = !task.completed;
      saveCards(cards);
    }
  }
};