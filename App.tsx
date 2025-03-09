// App.tsx
import React from 'react';
import { View, StyleSheet, Button } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer'; // Importe createDrawerNavigator
import { ThemeProvider, useTheme } from './utils/contexts/themeContext';
import Rotinas from './UI/screens/Rotinas';
import CustomDrawerContent from './UI/components/CustomDrawer';
import ListScreen from './UI/screens/Tasks/TasksList';

// Definição dos tipos de parâmetros para o StackNavigator
type RootStackParamList = {
  Eixos: undefined;
  Rotinas: undefined;
};

// Criação dos navegadores
const Stack = createStackNavigator<RootStackParamList>();
const Drawer = createDrawerNavigator();

// Componente principal App
const App: React.FC = () => {
  const { theme, toggleDarkMode } = useTheme(); // Obtém o tema e a função de alternar tema do contexto

  return (
    <NavigationContainer theme={theme}>
      <Drawer.Navigator
        drawerContent={(props) => <CustomDrawerContent {...props} />}
      >
        {/* Definição das telas do Drawer */}
        <Drawer.Screen name="Inicio" component={EixosScreen} />
        <Drawer.Screen name="Rotinas" component={Rotinas} />
        <Drawer.Screen name="Tarefas" component={ListScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

// Componente da tela Eixos
const EixosScreen: React.FC = () => {
  const navigation = useNavigation<any>(); // Obtém o objeto de navegação

  return (
    <View style={styles.container}>
      {/* Botão para navegar para a tela Rotinas */}

    </View>
  );
};

// Componente de nível superior que envolve o App com o ThemeProvider
export default () => {
  return (
    <ThemeProvider>
      <App />
    </ThemeProvider>
  );
};

// Estilos do componente
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
  },
  toggleButtonContainer: {
    position: 'absolute', // Posiciona o botão no canto inferior direito
    bottom: 20,
    right: 20,
  },
});
