import React, { useEffect, useRef } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Alert,
  FlatList,
  Keyboard,
} from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import { useRecoilState } from 'recoil';
import {
  todosState,
  isConnectedState,
  showSyncButtonState,
} from '@/recoil/atoms';
import { styles } from '@/components/styles/todoStyles';
import Header from '@/components/Header';
import TodoItem from '@/components/TodoItem';
import InputField from '@/components/InputField';
import { supabase } from '@/lib/supabase';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';

interface Todo {
  id: string;
  text: string;
}

const TodoList: React.FC = () => {
  const tabBarHeight = useBottomTabBarHeight();
  const [todos, setTodos] = useRecoilState<Todo[]>(todosState);
  const [isConnected, setIsConnected] = useRecoilState<boolean>(
    isConnectedState
  );
  const [showSyncButton, setShowSyncButton] = useRecoilState<boolean>(
    showSyncButtonState
  );
  const flatListRef = useRef<FlatList<Todo>>(null); // Ref for FlatList

  useEffect(() => {
    // Subscribe to network status updates
    const unsubscribe = NetInfo.addEventListener((state) => {
      const connected = state.isConnected ?? false;
      setIsConnected(connected);

      if (connected) {
        // If we have just regained connection, show the sync button
        setShowSyncButton(true);
      } else {
        setShowSyncButton(false);
      }
    });

    return () => {
      unsubscribe();
    };
  }, [setIsConnected, setShowSyncButton]);

  useEffect(() => {
    // Optionally, automatically sync when todos change
    // if (isConnected) {
    //   syncTodosWithSupabase();
    // }
  }, [todos, isConnected]);

  useEffect(() => {
    const showKeyboardListener = Keyboard.addListener('keyboardDidShow', () => {
      // Scroll to the end when the keyboard is shown
      flatListRef.current?.scrollToEnd({ animated: true });
    });

    return () => {
      showKeyboardListener.remove();
    };
  }, [todos]);

  const syncTodosWithSupabase = async () => {
    try {
      // Delete all todos in Supabase
      const { error: deleteError } = await supabase
        .from('todos')
        .delete()
        .neq('id', 0);

      if (deleteError) {
        console.error('Failed to delete todos from Supabase', deleteError);
        return;
      }

      // Insert local todos into Supabase
      const { data, error } = await supabase.from('todos').insert(todos);
      if (error) {
        console.error('Failed to insert todos into Supabase', error);
      } else {
        Alert.alert(
          'Sync Successful',
          'Your todos have been synced with Supabase.'
        );
        setShowSyncButton(false);
      }
    } catch (e) {
      console.error('Error syncing todos with Supabase', e);
    }
  };

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
