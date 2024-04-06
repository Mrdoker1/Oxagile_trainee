export const saveToLocalStorage = (key, data) => {
    const dataJson = JSON.stringify(data);
    localStorage.setItem(key, dataJson);
  };
  
  export const loadFromLocalStorage = (key) => {
    const dataJson = localStorage.getItem(key);
    if (dataJson) {
      return JSON.parse(dataJson);
    }
    return null;
  };