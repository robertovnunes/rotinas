import React, { useState, useEffect } from 'react';
import { View, Text, Modal, Alert, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { FAB, Provider } from 'react-native-paper';
import { ReloadContext } from '../../utils/contexts/reloadContext';
import { saveTasks, loadTasks } from '../../utils/storage';
import { Task } from 'interfaces/task';
import NewRoutine from '../components/routines/NewRotine';
import ListScreen from '../components/layout/ListScreen';
import TaskByDayScreen from '../components/layout/TaskByDayScreen';
import { useTheme } from '../../utils/contexts/themeContext';

const Tab = createBottomTabNavigator();

const Rotinas = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [reload, setReload] = useState(false);
  const [completedTasks, setCompletedTasks] = useState(0);
  const [totalTasks, setTotalTasks] = useState(0);

  const { isDarkMode } = useTheme();



  const triggerReload = () => {
    setReload(true); // Define reload como true para disparar o recarregamento
  };

  // Garante que o reload volte a ser false após o recarregamento
  const resetReload = () => {
    setReload(false);
  };

  const getTasksLength = () => {
    setTotalTasks(tasks.length);
  };

  const getCompletedTasksLength = () => {
    setCompletedTasks(tasks.filter((task) => task.completed).length);
  };

  const updateTasksLength = () => {
    getTasksLength();
    getCompletedTasksLength();
  };

  const FloatingButton = () => {
    return (
      <Provider>
        <View style={{ alignSelf: 'flex-end' }}>
          <FAB
            style={{
              marginEnd: 10,
              backgroundColor: '#6200EE',
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

  //atualiza se triggerReload for acionado
  useEffect(() => {
    if (reload) {
      (async () => {
        const savedTasks = await loadTasks();
        setTasks(savedTasks);
        resetReload();
      })();
    }
  }, [reload]);

  useEffect(() => {
    saveTasks(tasks);
    updateTasksLength();
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
    triggerReload();
    setShowModal(false);
  };

  const color = isDarkMode ? 'white' : 'black';

  return (
    <ReloadContext.Provider value={{ reload, triggerReload, resetReload }}>
      <SafeAreaProvider>
        <SafeAreaView style={{ flex: 1         }}>
          {/* ... (resto do seu código) */}
          <View style={{ flex: 1 }}>
            <View>
              <Modal
                visible={showModal}
                animationType="slide"
                transparent={false}
                onRequestClose={() => {
                  setShowModal(false);
                }}
              >
                <NewRoutine
                  onAdd={addTask}
                  onAbort={() => setShowModal(false)}
                />
              </Modal>
            </View>

            <Tab.Navigator
              screenOptions={({ route }) => ({
                tabBarIcon: ({ color, size }) => {
                  let iconName;
                  if (route.name === 'Todas as tarefas') iconName = 'list';
                  else if (route.name === 'Por Dia')
                    iconName = 'calendar-today';
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
              <Tab.Screen name="Todas as tarefas" component={ListScreen} />
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
                marginEnd: 10,
                width: '100%',
              }}
            >
              <Text style={{ color, fontSize: 16 }}>
                ✅ Concluídas: {completedTasks} / {totalTasks}
              </Text>
              <FloatingButton />
            </View>
          </View>
        </SafeAreaView>
      </SafeAreaProvider>
    </ReloadContext.Provider>
  );
};

export default Rotinas;


