import { StyleSheet } from 'react-native';
import { View } from '@/components/Themed';
import TodoList from '@/components/TodoList';
import { useHeaderHeight } from '@react-navigation/elements';

export default function HomeScreen() {
  const headerHeight = useHeaderHeight();
  return (
    <View style={{...styles.container, paddingBottom: headerHeight}}>
      <TodoList />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    maxWidth: 800,
    width: '100%'
  }
});
