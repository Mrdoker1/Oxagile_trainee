import './Button.scss';
// Импорт SVG файла как URL
import plusIcon from '../../icons/plus.svg';
import paletteIcon from '../../icons/palette.svg';
import trashIcon from '../../icons/trash.svg';
import crossIcon from '../../icons/cross.svg';
import moreIcon from '../../icons/more.svg';

export default function Button(text = '', onClick = () => {}, type = 'default', icon = null) {
  const button = document.createElement('div');
  button.className = 'button';

  if (type === 'cta') {
    button.classList.add('button-cta');
  }
  if (type === 'action') {
    button.classList.add('button-action');
  }

  if (icon) {
    const img = document.createElement('img');
    if (icon === 'plus') {
      img.src = plusIcon;
    }
    if (icon === 'palette') {
      img.src = paletteIcon;
    }
    if (icon === 'trash') {
      img.src = trashIcon;
    }
    if (icon === 'cross') {
      img.src = crossIcon;
    }
    if (icon === 'more') {
      img.src = moreIcon;
    }
    button.appendChild(img);
  }

  if (text) {
    button.appendChild(document.createTextNode(text));
  }

  button.addEventListener('click', onClick);

  return button;
}
