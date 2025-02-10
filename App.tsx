import React, { useState, useEffect, useContext, useCallback } from 'react';
import { View, Text, Modal,  Alert } from 'react-native';
import { NavigationContainer, useFocusEffect } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons } from '@expo/vector-icons';
import { FAB, Provider } from 'react-native-paper';
import { ReloadContext } from './utils/contexts/reloadContext';
import { saveTasks, loadTasks } from './utils/storage';
import { Task } from 'interfaces/task';
import NewRoutine from './components/routines/NewRotine';
import ListScreen from './components/layout/ListScreen';
import TaskByDayScreen from './components/layout/TaskByDayScreen';

const Tab = createBottomTabNavigator();

const App = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [showModal, setShowModal] = useState(false);
  const { triggerReload } = useContext(ReloadContext);

  const FloatingButton = () => {
    return (
      <Provider>
        <View style={{alignSelf: 'flex-end' }}
        >
          <FAB
            style={{
              backgroundColor: "#6200EE",
            }}
            icon="plus"
            onPress={() => setShowModal(true)}
          />
        </View>
      </Provider>
    );
  };

  useEffect(() => {
    (async () => {
      const savedTasks = await loadTasks();
      setTasks(savedTasks);
    })();
  }, []);

  useEffect(() => {
    saveTasks(tasks);
    triggerReload();
  }, [tasks]);

  const addTask = (newTask: Task) => {
    if (!newTask.titulo || !newTask.horario || newTask.dias.length === 0) {
      Alert.alert(
        'Erro',
        'Preencha todos os campos e selecione pelo menos um dia!',
      );
      return;
    }
    setTasks([...tasks, newTask]);
    setShowModal(false);
  };

  return (
    <NavigationContainer>
      <View style={{ marginTop: 20, padding: 10, flex: 1 }}>
        <View>
          <Text style={{ fontSize: 24, fontWeight: 'bold' }}>
            📅 Rotina Diária
          </Text>
          <Modal
            visible={showModal}
            animationType="slide"
            transparent={false}
            onRequestClose={() => setShowModal(false)}
          >
            <NewRoutine onAdd={addTask} onAbort={() => setShowModal(false)} />
          </Modal>
        </View>

        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ color, size }) => {
              let iconName;
              if (route.name === 'Todas Tarefas') iconName = 'list';
              else if (route.name === 'Por Dia') iconName = 'calendar-today';
              return (
                <MaterialIcons
                  name={iconName as any}
                  size={size}
                  color={color}
                />
              );
            },
          })}
        >
          <Tab.Screen name="Todas Tarefas" component={ListScreen} />
          <Tab.Screen name="Por Dia" component={TaskByDayScreen} />
        </Tab.Navigator>
        <View
          style={{
            position: 'absolute',
            flexDirection: 'row',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            padding: 10,
            bottom: 50,
            marginStart: 10,
            width: '100%',
            marginBottom: 10,
          }}
        >
          <Text style={{marginStart: 0, flex: 0.5}}>
            ✅ Concluídas: {tasks.filter((task) => task.completed).length} /{' '}
            {tasks.length}
          </Text>
          <FloatingButton />
        </View>
      </View>
    </NavigationContainer>
  );
};

export default App;
