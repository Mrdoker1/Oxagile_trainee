import './ColorPicker.scss';
import checkIcon from '../../icons/check.svg'; // Импортируйте SVG-иконку для галочки

export default function ColorPicker(onColorSelect, selectedColor) {

  const colors = [
    {value: '#D1E5F8', displayed: '#039BF1'},
    {value: '#D1F8DE', displayed: '#359C77'},
    {value: '#F8F6D1', displayed: '#FFB906'},
    {value: '#F8DAD1', displayed: '#EB5757'},
  ]

  const colorPicker = document.createElement('div');
  colorPicker.style.display = 'none';
  colorPicker.className = 'color-picker';

  colors.forEach(color => {
    const colorItem = document.createElement('div');
    colorItem.className = 'color-picker-item';
    colorItem.style.backgroundColor = color.displayed;

    // Добавляем значок галочки
    const checkmark = document.createElement('img');
    checkmark.src = checkIcon;
    checkmark.className = 'checkmark';
    checkmark.style.display = 'none'; // Изначально скрываем галочку
    colorItem.appendChild(checkmark);

    // Обработчик события клика на цветовом сегменте
    colorItem.addEventListener('click', (event) => {
      onColorSelect(color.value);
    });
    
    if (color.value === selectedColor) {
      checkmark.style.display = 'block';
    } else {
      checkmark.style.display = 'none';
    }


    colorPicker.appendChild(colorItem);
  });

  return colorPicker;
}
