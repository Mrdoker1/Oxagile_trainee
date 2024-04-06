import Task from '../Task/Task';
import './Card'

export default function Card(tasksData) {
  const cardElement = document.createElement('div');
  cardElement.className = 'card';

  const titleElement = document.createElement('h2');
  titleElement.className = 'card__title';
  titleElement.textContent = 'Задачи';
  cardElement.appendChild(titleElement);

  const tasksListElement = document.createElement('ul');
  tasksListElement.className = 'card__tasks';

  console.log('tasksData', tasksData)
  
  tasksData.forEach(task => {
    tasksListElement.appendChild(Task(task));
  });

  cardElement.appendChild(tasksListElement);

  return cardElement;
}