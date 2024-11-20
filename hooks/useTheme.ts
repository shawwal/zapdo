import { useColorScheme } from 'react-native';

const useTheme = () => {
  const colorScheme = useColorScheme();
  return colorScheme || 'light';
};

export default useTheme;