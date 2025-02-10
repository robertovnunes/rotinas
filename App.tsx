import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, Button, Modal, FlatList, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons } from '@expo/vector-icons';
import { FAB, Provider } from 'react-native-paper';
import TaskItem from './components/layout/TaskItem';
import { saveTasks, loadTasks } from './utils/storage';
import { Task } from 'interfaces/task';
import NewRoutine from './components/routines/NewRotine';
import ListScreen from './components/layout/ListScreen';
import TaskByDayScreen from './components/layout/TaskByDayScreen';

const Tab = createBottomTabNavigator();

const App = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [showModal, setShowModal] = useState(false);


  const FloatingButton = () => {
    return (
      <Provider>
        <View style={{ flex: 1 }}>
          <FAB
            style={{
              position: "absolute",
              bottom: 40,
              right: 0,
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
  };

  const toggleTaskCompletion = (id: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task,
      ),
    );
  };

  const deleteTask = (id: string) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  return (
    <View style={{ padding: 10, marginTop: 20, width: '100%', height: '100%' }}>
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
        <Text style={{ marginTop: 20 }}>Minhas Rotinas</Text>
      </View>
      <View>
        <NavigationContainer>
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
            <Tab.Screen
              name="Todas Tarefas"
              children={() => (
                <ListScreen
                  onToggle={toggleTaskCompletion}
                  onDelete={deleteTask}
                />
              )}
            />
            <Tab.Screen name="Por Dia" component={TaskByDayScreen} />
          </Tab.Navigator>
        </NavigationContainer>
      </View>
      <View style={{ position: 'absolute', bottom: 0, width: '100%', marginStart: 10 }}>
        <Text style={{ marginBottom: 30, marginStart: 10 }}>
          ✅ Concluídas: {tasks.filter((task) => task.completed).length} /{' '}
          {tasks.length}
        </Text>
        <FloatingButton />
      </View>
    </View>
  );
};

export default App;
