import localforage from 'localforage';

export const setItem = async (key, value) => {
  try {
    await localforage.setItem(key, value);
  } catch (error) {
    console.error('Error setting item in local storage:', error);
  }
};

export const getItem = async (key) => {
  try {
    const value = await localforage.getItem(key);
    return value;
  } catch (error) {
    console.error('Error getting item from local storage:', error);
    return null;
  }
};

export const removeItem = async (key) => {
  try {
    await localforage.removeItem(key);
  } catch (error) {
    console.error('Error removing item from local storage:', error);
  }
};

// ... other utility functions as needed (e.g., clearAll)