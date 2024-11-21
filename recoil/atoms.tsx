// recoil/atoms.ts
import { atom } from 'recoil';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface Todo {
  id: string;
  title: string;
  completed: boolean;
  user_id?: string;
  created_at?: string; // Timestamp when the todo was created
  updated_at?: string; // Timestamp when the todo was last updated
  deleted?: boolean;   // Flag to indicate if the todo is deleted
};

const localStorageEffect = (key: any) => ({ onSet, setSelf }: { onSet: any, setSelf: any }) => {
  // Check if AsyncStorage is available
  if (typeof AsyncStorage !== 'undefined') {
    // Load data from AsyncStorage when the atom is initialized
    AsyncStorage.getItem(key)
      .then((savedState) => {
        if (savedState) {
          setSelf(JSON.parse(savedState));
        }
      })
      .catch((error) => {
        console.error('Error loading data from AsyncStorage:', error);
      });

    // Save data to AsyncStorage whenever the atom is updated
    onSet((newValue: any) => {
      AsyncStorage.setItem(key, JSON.stringify(newValue))
        .catch((error) => {
          console.error('Error saving data to AsyncStorage:', error);
        });
    });
  } else {
    // Handle the case where AsyncStorage is not available
    console.error('AsyncStorage is not available in this environment.');
  }
};

export const todosState = atom<Todo[]>({
  key: 'todosState',
  default: [],
  effects: [localStorageEffect('todosState')],
});

export const isConnectedState = atom<boolean>({
  key: 'isConnectedState',
  default: true,
  effects: [localStorageEffect('isConnectedState')],
});

export const showSyncButtonState = atom<boolean>({
  key: 'showSyncButtonState',
  default: false,
  effects: [localStorageEffect('showSyncButtonState')],
});
