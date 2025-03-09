// App.tsx
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Button, Appearance } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ThemeProvider, useTheme } from './utils/contexts/themeContext';

import Rotinas from './UI/screens/Rotinas';

type RootStackParamList = {
  Eixos: undefined;
  Rotinas: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const App: React.FC = () => {
  const { theme, toggleDarkMode } = useTheme();

  return (
      <NavigationContainer theme={theme}>
      <Stack.Navigator>
        <Stack.Screen name="Eixos" component={EixosScreen} />
        <Stack.Screen name="Rotinas" component={Rotinas} />
      </Stack.Navigator>
      <View>
        <Button title="Toggle Dark Mode" onPress={toggleDarkMode} />
      </View>
    </NavigationContainer>
  );
};

const EixosScreen: React.FC = () => {
  const navigation = useNavigation<any>();

  return (
    <View style={styles.container}>
      <Button title="Rotinas" onPress={() => navigation.navigate('Rotinas')} />
    </View>
  );
};

export default () => {
  return (
    <ThemeProvider>
      <App />
    </ThemeProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
