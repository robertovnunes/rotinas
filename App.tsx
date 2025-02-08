import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, Button, Modal, FlatList, Alert } from 'react-native';
import TaskItem from './components/layout/TaskItem';
import { saveTasks, loadTasks } from './utils/storage';
import { Task } from 'interfaces/task';
import NewRoutine from './components/routines/NewRotine';

const App = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [showModal, setShowModal] = useState(false);


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
    <ScrollView style={{ padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold' }}>📅 Rotina Diária</Text>
      <Modal visible={showModal} animationType="slide"
       transparent={false} 
       onRequestClose={() => setShowModal(false)}
       >
        <NewRoutine onAdd={addTask} onAbort={() => setShowModal(false)}/>
      </Modal>
      <Text style={{ marginTop: 20 }}>Minhas Rotinas</Text>
      <FlatList style={{
          marginTop: 10,
          marginBottom: 10,
          height: '90%'
        }}
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TaskItem
            task={item}
            onToggle={toggleTaskCompletion}
            onDelete={deleteTask}
          />
        )}
      />
      <Text style={{ marginTop: 20 }}>
        ✅ Concluídas: {tasks.filter((task) => task.completed).length} /{' '}
        {tasks.length}
      </Text>
      <Button title="Adicionar Tarefa" onPress={() => setShowModal(true)} />
    </ScrollView>
  );
};

export default App;
