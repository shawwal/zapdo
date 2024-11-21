import React, { useEffect, useRef } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  FlatList,
  Keyboard,
} from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import { useRecoilState } from 'recoil';
import {
  isConnectedState,
  showSyncButtonState,
} from '@/recoil/atoms';
import { styles } from '@/components/styles/todoStyles';
import Header from '@/components/Header';
import TodoItem from '@/components/TodoItem';
import InputField from '@/components/InputField';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { useTodos } from '@/hooks/useTodos';
interface Todo {
  id: string;
  text: string;
}

const TodoList: React.FC = () => {
  const tabBarHeight = useBottomTabBarHeight();

  const { todos, syncTodosWithSupabase } = useTodos();

  const [isConnected, setIsConnected] = useRecoilState<boolean>(
    isConnectedState
  );
  const [showSyncButton, setShowSyncButton] = useRecoilState<boolean>(
    showSyncButtonState
  );
  const flatListRef = useRef<FlatList<Todo>>(null); // Ref for FlatList

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      const connected = state.isConnected ?? false;
      setIsConnected(connected);

      if (connected) {
        setShowSyncButton(true); // Show sync button when connected
      } else {
        setShowSyncButton(false); // Hide sync buttonc when disconnected
      }
    });

    return () => {
      unsubscribe();
    };
  }, [setIsConnected, setShowSyncButton]);

  useEffect(() => {
    const showKeyboardListener = Keyboard.addListener('keyboardDidShow', () => {
      flatListRef.current?.scrollToEnd({ animated: true });
    });

    return () => {
      showKeyboardListener.remove();
    };
  }, [todos]);

  const renderTodoItem = ({ item }: { item: Todo }) => (
    <TodoItem item={item} />
  );

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={{ ...styles.container, marginBottom: tabBarHeight }}
    >
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
    </KeyboardAvoidingView>
  );
};

export default TodoList;
