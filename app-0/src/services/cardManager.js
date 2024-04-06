import { saveToLocalStorage, loadFromLocalStorage } from './storage';

const CARDS_KEY = 'cards';

export const loadCards = () => {
    return loadFromLocalStorage(CARDS_KEY) || [];
};
  
export const saveCards = (cards) => {
    saveToLocalStorage(CARDS_KEY, cards);
};

  export const addCard = (title, description) => {
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
  
  export const deleteCard = (cardId) => {
    let cards = loadCards();
    cards = cards.filter(card => card.id !== cardId);
    saveCards(cards);
  };