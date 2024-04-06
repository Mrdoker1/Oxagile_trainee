import './Task.scss'

export default function Task({ id, title, completed }) {
  const taskElement = document.createElement('li');
  taskElement.className = `task ${completed ? 'task--completed' : ''}`;
  taskElement.setAttribute('data-id', id);
  taskElement.textContent = title;

  return taskElement;
}