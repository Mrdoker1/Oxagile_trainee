import './CardContainer.scss'
import { updateCardInDOM, setCardColor } from '../../services/cardManager'
import ColorPicker from '../ColorPicker/ColorPicker';

export default function CardContainer(CardElement) {
  const cardContainerElement = document.createElement('div');
  cardContainerElement.className = 'card-container'
  cardContainerElement.setAttribute('data-card-container-id', id);

  const colors = ['#D1E5F8', '#D1F8DE', '#F8F6D1', '#F8DAD1'];
  function onColorSelect(selectedColor) {
    setCardColor(id, selectedColor);
    updateCardInDOM(id);
  };
  const colorPickerElement = ColorPicker(colors, onColorSelect);

  cardContainerElement.append(cardElement, colorPickerElement);

  return cardContainerElement;
}