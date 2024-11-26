import React, { useEffect, useRef, useState } from 'react';
import {
  FlatList,
  Keyboard,
  View,
  Platform,
} from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  isConnectedState,
  isEditingState,
  showSyncButtonState,
} from '@/recoil/atoms';
import { styles } from '@/components/styles/todoStyles';
import Header from '@/components/Header';
import TodoItem from '@/components/TodoItem';
import InputField from '@/components/InputField';
import { useTodos } from '@/hooks/useTodos';
import { Todo } from '@/components/types/todoTypes';
import KeyboardAvoidingWrapper from '@/components/KeyboardAvoidingWrapper'; // Import the custom wrapper

const TodoList: React.FC = () => {
  const { todos, syncTodosWithSupabase } = useTodos();

  const [isConnected, setIsConnected] = useRecoilState<boolean>(isConnectedState);
  const [showSyncButton, setShowSyncButton] = useRecoilState<boolean>(showSyncButtonState);

  const flatListRef = useRef<FlatList<Todo>>(null); // Ref for FlatList
  const [keyboardOpen, setKeyboardOpen] = useState(false); // Track if the keyboard is open
  const editing = useRecoilValue(isEditingState);
  // Listen for network changes to show/hide sync button
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      const connected = state.isConnected ?? false;
      setIsConnected(connected);

      if (connected) {
        setShowSyncButton(true); // Show sync button when connected
      } else {
        setShowSyncButton(false); // Hide sync button when disconnected
      }
    });

    return () => {
      unsubscribe();
    };
  }, [setIsConnected, setShowSyncButton]);
  // Scroll to the end when the keyboard opens
  useEffect(() => {
    const showKeyboardListener = Keyboard.addListener('keyboardDidShow', () => {
      if (flatListRef.current  && !editing) {
        flatListRef.current.scrollToEnd({ animated: true });
        setKeyboardOpen(true);
      }
    });

    const hideKeyboardListener = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardOpen(false); // Reset state when keyboard is dismissed
    });

    return () => {
      showKeyboardListener.remove();
      hideKeyboardListener.remove();
    };
  }, []);

  // Scroll to the bottom when new todo is added (with delay)
  useEffect(() => {
    if (keyboardOpen) {
      const timer = setTimeout(() => {
        if (flatListRef.current && todos.length > 0  && !editing) {
          console.log('timer', editing)
          flatListRef.current.scrollToEnd({ animated: true });
        }
      }, 100); // Delay scroll by 100ms (adjust if needed)

      return () => {
        clearTimeout(timer); // Clean up timeout when component unmounts or todos change
      };
    }
  }, [todos, keyboardOpen]);

  const renderTodoItem = ({ item }: { item: Todo }) => (
    <TodoItem item={item} />
  );

  return (
    <KeyboardAvoidingWrapper
      disabled={false}
    >
      <View style={styles.container}>
        <Header onSync={syncTodosWithSupabase} />
        <FlatList
          ref={flatListRef} // Attach ref to FlatList
          data={todos}
          renderItem={renderTodoItem}
          keyExtractor={(item) => item.id}
          style={styles.list}
          showsVerticalScrollIndicator={false}
        />
        <InputField />
      </View>
    </KeyboardAvoidingWrapper>
  );
};

export default TodoList;
