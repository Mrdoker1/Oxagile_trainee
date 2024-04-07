import { saveToLocalStorage, loadFromLocalStorage } from './storage';
import Card from '../components/Card/Card';

const CARDS_KEY = 'cards';

export const loadCards = () => {
    return loadFromLocalStorage(CARDS_KEY) || [];
};
  
export const saveCards = (cards) => {
    saveToLocalStorage(CARDS_KEY, cards);
};

export const addCard = (title) => {
  const cards = loadCards();
  const newCard = {
    id: Date.now(), // Простой способ создать уникальный ID
    title,
    tasks: [] // Изначально задач нет
  };
  cards.push(newCard);
  saveCards(cards);
  return newCard;
};

export const editCardName = (cardId, newTitle) => {
  let cards = loadCards(); // Загрузка текущего списка карточек
  // Находим карточку по ID и обновляем её заголовок
  const cardIndex = cards.findIndex(card => card.id === cardId);
  if (cardIndex !== -1) { // Проверка, что карточка с таким ID существует
    cards[cardIndex].title = newTitle; // Обновление заголовка карточки
    saveCards(cards); // Сохранение обновлённого списка карточек в localStorage
    return true; // Возвращаем true, как индикатор успешного обновления
  }
  return false; // Возвращаем false, если карточка с таким ID не найдена
};

export const getCardByID = (cardId) => {
  let cards = loadCards(); // Загрузка текущего списка карточек
    // Находим карточку по ID и обновляем её заголовок
    const cardIndex = cards.findIndex(card => card.id === cardId);
    if (cardIndex !== -1) { // Проверка, что карточка с таким ID существует
      return cards[cardIndex];
    }
    return false; // Возвращаем false, если карточка с таким ID не найдена
}

// Добавление задачи в карточку
export const addTaskToCard = (cardId, taskTitle) => {
  const cards = loadCards(); // Загружаем все карточки
  const card = cards.find(card => card.id === cardId); // Находим нужную карточку по ID

  if (card) {
    const newTask = {
      id: Date.now(), // Создаём уникальный ID для задачи
      title: taskTitle,
      completed: false // Изначально задача не выполнена
    };
    card.tasks.push(newTask); // Добавляем новую задачу в массив задач карточки
    saveCards(cards); // Сохраняем обновлённый список карточек в localStorage
  }
};

export const editTaskInCard = (cardId, taskId, newTitle) => {
  const cards = loadCards(); // Загружаем все карточки
  const cardIndex = cards.findIndex(card => card.id === cardId); // Находим индекс нужной карточки

  if (cardIndex !== -1) { // Если карточка найдена
    const taskIndex = cards[cardIndex].tasks.findIndex(task => task.id === taskId); // Находим индекс нужной задачи в карточке

    if (taskIndex !== -1) { // Если задача найдена
      cards[cardIndex].tasks[taskIndex].title = newTitle; // Обновляем заголовок задачи
      saveCards(cards); // Сохраняем изменения в localStorage
      return true; // Возвращаем true, как индикатор успешного обновления
    }
  }
  return false; // Возвращаем false, если не удалось найти карточку или задачу
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

export const updateCardInDOM = (id) => {
  const existingCardElement = document.querySelector(`[data-card-id="${id}"]`);
  const cardData = getCardByID(id); // Получаем актуальные данные карточки

  if (cardData) {
    // Если данные карточки найдены, обновляем или добавляем карточку в DOM
    const updatedCardElement = Card(cardData); // Создаем обновленный элемент карточки

    if (existingCardElement) {
      // Если карточка уже существует в DOM, заменяем её на обновленную
      existingCardElement.replaceWith(updatedCardElement);
    } else {
      // Если карточки нет в DOM, добавляем её
      document.querySelector(`[data-page="main"]`).appendChild(updatedCardElement);
    }
  } else if (existingCardElement) {
    // Если данные карточки не найдены (карточка удалена из данных), но элемент существует в DOM, удаляем элемент
    existingCardElement.remove();
  }
}

export const deleteCard = (cardId) => {
  let cards = loadCards();
  cards = cards.filter(card => card.id !== cardId);
  saveCards(cards);
};