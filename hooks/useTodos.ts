// src/hooks/useTodos.ts
import { useRecoilState } from 'recoil';
import { todosState, showSyncButtonState, Todo } from '@/recoil/atoms';
import { supabase } from '@/lib/supabase';
import { Alert } from 'react-native';
import { generateUUID } from '@/utils/generateUUID';


export const useTodos = () => {
  const [todos, setTodos] = useRecoilState<Todo[]>(todosState);
  const [showSyncButton, setShowSyncButton] = useRecoilState<boolean>(showSyncButtonState);

  // Function to add a new todo
  const addTodo = (text: string) => {
    const newTodo: Todo = {
      id: generateUUID(),
      title: text,
      completed: false,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      deleted: false,
    };
    setTodos([...todos, newTodo]);
    setShowSyncButton(true);
  };

  // Function to delete a todo locally
  const deleteTodo = (id: string) => {
    const updatedTodos = todos.map(todo =>
      todo.id === id
        ? { ...todo, deleted: true, updated_at: new Date().toISOString() }
        : todo
    );
    setTodos(updatedTodos);
    setShowSyncButton(true);
  };

  // Function to update a todo locally
  const updateTodo = (id: string, updates: Partial<Todo>) => {
    const updatedTodos = todos.map(todo =>
      todo.id === id
        ? { ...todo, ...updates, updated_at: new Date().toISOString() }
        : todo
    );
    setTodos(updatedTodos);
    setShowSyncButton(true);
  };


  const syncTodosWithSupabase = async () => {
    try {
      // Get the current session
      const {
        data: { session },
        error: sessionError,
      } = await supabase.auth.getSession();

      if (sessionError || !session) {
        Alert.alert('Sync Error', 'User is not authenticated.');
        return;
      }

      const user = session.user;

      // Attach user_id to each todo and ensure timestamps
      const todosWithUserId = todos.map(todo => ({
        ...todo,
        user_id: user.id,
        // Ensure created_at and updated_at are set
        created_at: todo.created_at || new Date().toISOString(),
        updated_at: todo.updated_at || new Date().toISOString(),
        deleted: todo.deleted || false,
      }));

      // Separate todos into toUpsert and toDelete
      const todosToUpsert = todosWithUserId.filter(todo => !todo.deleted);
      const todosToDelete = todosWithUserId.filter(todo => todo.deleted);

      // Start a transaction-like process

      // 1. Upsert non-deleted todos
      if (todosToUpsert.length > 0) {
        const { error: upsertError } = await supabase
          .from('todos')
          .upsert(todosToUpsert, { onConflict: 'id' });

        if (upsertError) {
          console.error('Failed to upsert todos into Supabase', upsertError);
          Alert.alert(
            'Sync Error',
            `Failed to sync todos: ${upsertError.message}`
          );
          return;
        }
      }

      // 2. Delete todos marked as deleted
      if (todosToDelete.length > 0) {
        const idsToDelete = todosToDelete.map(todo => todo.id);
        const { error: deleteError } = await supabase
          .from('todos')
          .delete()
          .in('id', idsToDelete)
          .eq('user_id', user.id); // Ensure deletion only for current user

        if (deleteError) {
          console.error('Failed to delete todos from Supabase', deleteError);
          Alert.alert(
            'Sync Error',
            `Failed to delete todos: ${deleteError.message}`
          );
          return;
        }
      }

      // 3. Fetch the latest todos from Supabase
      const { data: supabaseTodos, error: fetchError } = await supabase
        .from('todos')
        .select('*')
        .eq('user_id', user.id);

      if (fetchError) {
        console.error('Failed to fetch todos from Supabase', fetchError);
        Alert.alert(
          'Sync Error',
          `Failed to fetch todos: ${fetchError.message}`
        );
        return;
      }

      // 4. Merge fetched todos with local todos to handle any remote changes
      const mergedTodosMap = new Map<string, Todo>();

      // Add fetched todos to the map
      supabaseTodos?.forEach(todo => {
        mergedTodosMap.set(todo.id, { ...todo, deleted: false });
      });

      // Add local todos that are not deleted and not present in Supabase
      todosWithUserId.forEach(localTodo => {
        if (!localTodo.deleted && !mergedTodosMap.has(localTodo.id)) {
          mergedTodosMap.set(localTodo.id, localTodo);
        }
      });

      // Convert the map back to an array
      const mergedTodos = Array.from(mergedTodosMap.values());

      // Update the local state
      setTodos(mergedTodos);

      Alert.alert(
        'Sync Successful',
        'Your todos have been synced with Supabase.'
      );
      setShowSyncButton(false);
    } catch (e: any) {
      console.error('Error syncing todos with Supabase', e);
      Alert.alert('Sync Error', `An error occurred: ${e.message}`);
    }
  };

  return {
    todos,
    addTodo, 
    deleteTodo,
    updateTodo,
    syncTodosWithSupabase,
    showSyncButton,
  };
};
