import AsyncStorage from '@react-native-async-storage/async-storage';

const getAllAsyncStorageItems = async () => {
  try {
    // Get all keys
    const keys = await AsyncStorage.getAllKeys();

    // Initialize an object to store items
    const items = {};

    // Iterate through keys and retrieve each item
    for (const key of keys) {
      const item = await AsyncStorage.getItem(key);
      // Add the item to the items object
      // @ts-ignore
      items[key] = item;
    }

    return items;
  } catch (error) {
    // @ts-ignore
    console.error('Error retrieving AsyncStorage items:', error.message);
    // Return an empty object in case of error
    return {};
  }
};

const removeAllAsyncStorageItems = async () => {
  try {
    // Get all keys
    const keys = await AsyncStorage.getAllKeys();
    
    // Remove all items corresponding to the keys
    await AsyncStorage.multiRemove(keys);
    
    // console.log('All items removed from AsyncStorage successfully');
  } catch (error) {
    // @ts-ignore
    console.error('Error removing AsyncStorage items:', error.message);
  }
};

// Exporting as an object with named exports
export { getAllAsyncStorageItems, removeAllAsyncStorageItems };
