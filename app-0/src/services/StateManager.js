export class StateManager {
    constructor() {
      if (StateManager.instance) {
        return StateManager.instance;
      }
      this._overlay = { open: false, close: null, onCLose: null } // Закрыт по умолчанию
      this._editableCardId = null; // ID редактируемой карточки, null если нет
      StateManager.instance = this;
    }

    get overlay() {
        return this._overlay;
    }

    set overlay(value) {
        this._overlay = value;
    }

    get editableCardId() {
        return this._editableCardId;
    }

    set editableCardId(value) {
        this._editableCardId = value;
    }
  }
  
export const getStateManager = () => {
    return new StateManager();
  };
  