import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Button, TouchableOpacity } from 'react-native';
import { Task } from 'interfaces/task';
import { loadTasks } from '../../utils/storage';

const weekDays = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

const TaskByDayScreen = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedDay, setSelectedDay] = useState(new Date().getDay()); // Dia atual

  useEffect(() => {
    const fetchTasks = async () => {
      const savedTasks = await loadTasks();
      setTasks(savedTasks);
    }
    fetchTasks();
  }, []);

  // Filtrar tarefas que têm o dia selecionado na lista de dias da task
  const filteredTasks = tasks.filter((task) =>
    task.dias.includes(weekDays[selectedDay]),
  );

  // Mudar para o dia anterior
  const prevDay = () => {
    setSelectedDay((prev) => (prev === 0 ? 6 : prev - 1)); // Se for Domingo (0), volta para Sábado (6)
  };

  // Mudar para o próximo dia
  const nextDay = () => {
    setSelectedDay((prev) => (prev === 6 ? 0 : prev + 1)); // Se for Sábado (6), avança para Domingo (0)
  };

  return (
    <View style={{padding: 20 }}>
      {/* Cabeçalho */}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginBottom: 10,
        }}
      >
        <Button title="⬅ Anterior" onPress={prevDay} />
        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
          {weekDays[selectedDay]}
        </Text>
        <Button title="Próximo ➡" onPress={nextDay} />
      </View>

      {/* Lista de Tarefas */}
      <FlatList
        data={filteredTasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              padding: 10,
              marginVertical: 5,
              borderWidth: 1,
              borderColor: item.completed ? 'green' : 'gray',
              borderRadius: 5,
            }}
          >
            <Text>
              {item.icon} {item.titulo} - {item.horario}
            </Text>
            <TouchableOpacity
              onPress={() => alert(`Detalhes de ${item.titulo}`)}
            >
              <Text style={{ color: 'blue' }}>Ver</Text>
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={
          <Text style={{ textAlign: 'center', marginTop: 20 }}>
            Nenhuma tarefa para este dia.
          </Text>
        }
      />
    </View>
  );
};

export default TaskByDayScreen;
