import './style.scss';
import Card from './components/Card/Card';
import MainPage from './pages/Main/MainPage';
import fetchData from './services/dataService';
import { loadTasks, saveTasks } from './services/taskManager';

document.addEventListener('DOMContentLoaded', async () => {
    const app = document.querySelector('#root');
  
    // Попытка загрузить задачи из localStorage
    let tasks = loadTasks();
  
    // Если задач нет в localStorage, загружаем их с API и сохраняем
    if (!tasks || tasks.length === 0) {
      tasks = await fetchData(6);
      saveTasks(tasks);
    }
  
    // Подготовка данных для карточек (предполагается, что fetchData возвращает массив задач)
    const cards = [Card(tasks)]; // Создаем карточки для каждой задачи
  
    // Создание главной страницы и добавление карточек
    const mainPageElement = MainPage(cards); // MainPage ожидает массив DOM-элементов карточек
  
    // Очищаем содержимое корневого элемента и добавляем нашу главную страницу
    app.innerHTML = '';
    app.appendChild(mainPageElement);
  });