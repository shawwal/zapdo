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

  useEffect(() => {
    const showKeyboardListener = Keyboard.addListener('keyboardDidShow', () => {
      flatListRef.current?.scrollToEnd({ animated: true });
    });

    return () => {
      showKeyboardListener.remove();
    };
  }, [todos]);

  const syncTodosWithSupabase = async () => {
    try {
      const {
        data: { session },
        error: sessionError,
      } = await supabase.auth.getSession();
  
      if (sessionError || !session) {
        Alert.alert('Sync Error', 'User is not authenticated.');
        return;
      }
  
      const user = session.user;
  
      // Attach user_id to each todo
      const todosWithUserId = todos.map((todo) => ({
        ...todo,
        user_id: user.id,
      }));
  
      // Delete all user's todos in Supabase
      const { error: deleteError } = await supabase
        .from('todos')
        .delete()
        .eq('user_id', user.id);
  
      if (deleteError) {
        console.error('Failed to delete todos from Supabase', deleteError);
        Alert.alert(
          'Sync Error',
          `Failed to delete todos: ${deleteError.message}`
        );
        return;
      }
  
      // Upsert local todos into Supabase
      const { error: upsertError } = await supabase
        .from('todos')
        .upsert(todosWithUserId);
  
      if (upsertError) {
        console.error('Failed to upsert todos into Supabase', upsertError);
        Alert.alert(
          'Sync Error',
          `Failed to sync todos: ${upsertError.message}`
        );
      } else {
        Alert.alert(
          'Sync Successful',
          'Your todos have been synced with Supabase.'
        );
        setShowSyncButton(false);
      }
    } catch (e: any) {
      console.error('Error syncing todos with Supabase', e);
      Alert.alert('Sync Error', `An error occurred: ${e.message}`);
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
