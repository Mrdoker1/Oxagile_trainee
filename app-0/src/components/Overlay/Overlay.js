import './Overlay.scss'

export default function openOverlay(content, onClose) {
    // Создание фона оверлея
    const overlayElement = document.createElement('div');
    overlayElement.className = 'overlay';
  
    // Создание контейнера для содержимого
    const contentContainer = document.createElement('div');
    contentContainer.className = 'content-container';
  
    // Добавление пользовательского содержимого в контейнер
    contentContainer.appendChild(content);
    overlayElement.appendChild(contentContainer);
  
    // Обработка клика вне содержимого для закрытия оверлея
    overlayElement.addEventListener('click', function(event) {
      event.stopPropagation();
      if (event.target === overlayElement) {
        close(); // Автоматическое закрытие оверлея
        if (onClose) {
          onClose(); // Вызов дополнительной пользовательской логики при закрытии
          console.log('onClose executed');
        }
      }
    });
  
    // Функция для закрытия оверлея
    function close() {
      document.body.removeChild(overlayElement);
    }
  
    // Добавление оверлея в DOM
    document.body.appendChild(overlayElement);
  
    // Возвращаем метод закрытия, чтобы можно было закрыть оверлей извне
    return { close };
  }
  