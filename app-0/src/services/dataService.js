const fetchData = async (limit) => {
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/todos?_limit=${limit}`);
      if (!response.ok) {
        throw new Error('Network error!');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Ошибка при получении данных:", error);
      return [];
    }
  };
  
  export default fetchData;