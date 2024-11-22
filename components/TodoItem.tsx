import React, { useState } from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTodos } from '@/hooks/useTodos';  // Assuming this is your custom hook
import { View, Text } from '@/components/Themed';  // Assuming themed components
import Animated, { withSpring, useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';  // Reanimated 2 hooks
import { PanGestureHandler, GestureHandlerRootView } from 'react-native-gesture-handler';  // Gesture handler

interface Todo {
  id: string;
  title: string;
  user_id?: string;
  deleted?: boolean;
}

interface TodoItemProps {
  item: Todo;
}

const TodoItem: React.FC<TodoItemProps> = ({ item }) => {
  
  if (item.deleted) {
    return null;
  }

  const { deleteTodo } = useTodos();

  const translateX = useSharedValue(0);
  const [isPressed, setIsPressed] = useState(false);

  // Gesture event handling
  const onGestureEvent = (event: any) => {
    if (!isPressed) {
      translateX.value = event.translationX;
    }
  };

  const onHandlerStateChange = (event: any) => {
    const { state, translationX } = event.nativeEvent;
    console.log("Gesture state change:", state, translationX);

    if (state === 5) {  // Gesture ended
      if (translationX < -100) {
        deleteTodo(item.id);  // If swipe threshold is exceeded, delete the item
      }
      translateX.value = withSpring(0);  // Reset the position
    }
  };

  const onDeletePress = async () => {
    if (isPressed) return;  // Prevent multiple delete calls

    setIsPressed(true);
    
    try {
      console.log("Attempting to delete:", item.id);
      await deleteTodo(item.id);  // Ensure deleteTodo works asynchronously
      console.log("Deleted successfully");
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  // Animated styles
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  const deleteButtonStyle = useAnimatedStyle(() => ({
    opacity: withTiming(translateX.value < -60 ? 1 : 0, { duration: 200 }),
  }));

  return (
    <GestureHandlerRootView>
      <PanGestureHandler
        onGestureEvent={onGestureEvent}
        onHandlerStateChange={onHandlerStateChange}
      >
        <Animated.View style={[styles.todoItem, animatedStyle]}>
          <Text>{item.title}</Text>

          {/* Delete button */}
          <Animated.View style={[styles.deleteButton, deleteButtonStyle, { zIndex: 1 }]}>
            <TouchableOpacity onPress={onDeletePress}>
              <Ionicons name="trash-outline" size={24} color="#FFF" />
            </TouchableOpacity>
          </Animated.View>
        </Animated.View>
      </PanGestureHandler>
    </GestureHandlerRootView>
  );
};

export default TodoItem;

// styles (TodoItemStyles.ts)
const styles = StyleSheet.create({
  todoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#fff',
    marginBottom: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  deleteButton: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    backgroundColor: '#FF6347',
    justifyContent: 'center',
    alignItems: 'center',
    width: 60,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
  },
});
