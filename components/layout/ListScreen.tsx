import React, { useEffect, useState, useContext, useCallback} from "react";
import { View, Text, FlatList } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { loadTasks, saveTasks } from "../../utils/storage";
import { Task } from "interfaces/task";
import TaskItem from "./TaskItem";
import { ReloadContext } from "../../utils/contexts/reloadContext";

    
const ListScreen: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const { reload } = useContext(ReloadContext);


  // Atualizar tarefas sempre que a tela for focada
  useFocusEffect(
    useCallback(() => {
        let isActive = true;
        const fetchTasks = async () => {
            if (isActive) {
                const savedTasks = await loadTasks();
                setTasks(savedTasks);
            }
        };
        fetchTasks();
        return () => {
            isActive = false;
        };
    }, [tasks])
  );

  useEffect(() => {
    saveTasks(tasks);
  }, [tasks]);

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
    <View style={{ flex: 1, marginTop: 10 }}>
      <Text style={{ fontSize: 20, textAlign: 'center', margin: 10 }}>
        Lista de Tarefas
      </Text>
      <FlatList
        data={tasks}
        keyExtractor={(task) => task.id}
        renderItem={({ item }) => (
          <TaskItem
            task={item}
            onToggle={toggleTaskCompletion}
            onDelete={deleteTask}
          />
        )}
        ListEmptyComponent={
          <Text style={{ textAlign: 'center', marginTop: 20 }}>
            Nenhuma tarefa registrada.
          </Text>
        }
      />
    </View>
  );
};

export default ListScreen;