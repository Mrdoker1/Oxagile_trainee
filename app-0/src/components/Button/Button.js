import './Button.scss';

export default function Button(text = '', onClick = () => {}, type = 'default', icon = null) {
  const button = document.createElement('button');
  button.className = 'button';

  if (type === 'absolute') {
    button.className = 'button-absolute';
  }

  if (text) {
    button.textContent = text;
  }

  button.addEventListener('click', onClick);

  return button;
}