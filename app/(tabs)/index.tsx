import { StyleSheet } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import TodoListApp from '@/components/TodoList';
import { useHeaderHeight } from '@react-navigation/elements';

export default function HomeScreen() {
  const headerHeight = useHeaderHeight();
  return (
    <ThemedView style={{...styles.container, paddingBottom: headerHeight}}>
      <TodoListApp />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flex: 1,
    // borderWidth: 1,
    // borderColor: 'green'
  }
});
