import { Task } from 'interfaces/task';
import React, { useState } from 'react';
import { View, Text, Button, TextInput, Alert } from 'react-native';
import { FAB, Provider } from "react-native-paper";
interface NewRoutineProps {
  onAdd: (task: Task) => void;
  onAbort: () => void;
};



const NewRoutine: React.FC<NewRoutineProps> = ({ onAdd, onAbort }) => {
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [horario, setHorario] = useState('');
  const [dias, setDias] = useState<string[]>([]);
  const [recorrente, setRecorrente] = useState(false);

  const addTask = () => {
    if (!titulo || !horario || dias.length === 0) {
      Alert.alert(
        'Erro',
        'Preencha todos os campos e selecione pelo menos um dia!',
      );
      return;
    }

    const newTask: Task = {
      id: Date.now().toString(),
      titulo,
      descricao,
      recorrente,
      dias,
      horario,
      icon: '📝',
      completed: false,
    };

    onAdd(newTask);

    setTitulo('');
    setDescricao('');
    setHorario('');
    setDias([]);
    setRecorrente(false);
  };

  return (
    <View>
      <Text>Nova Rotina</Text>
      <TextInput
        placeholder="Título da Tarefa"
        value={titulo}
        onChangeText={setTitulo}
        style={{ borderBottomWidth: 1, marginBottom: 10, padding: 5 }}
      />
      <TextInput
        placeholder="Descrição"
        value={descricao}
        onChangeText={setDescricao}
        style={{ borderBottomWidth: 1, marginBottom: 10, padding: 5 }}
      />
      <TextInput
        placeholder="Horário (ex: 08:00)"
        value={horario}
        onChangeText={setHorario}
        style={{ borderBottomWidth: 1, marginBottom: 10, padding: 5 }}
      />
      <View style={{ marginBottom: 10 }}>
        <Text>Selecione os dias da semana:</Text>
        <View style={{ flexDirection: 'row',
          marginStart: '5%'
         }}>
          {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map((dia) => (
            <Button
              key={dia}
              title={dia}
              onPress={() => {
                setDias((prevDias) =>
                  prevDias.includes(dia)
                    ? prevDias.filter((d) => d !== dia)
                    : [...prevDias, dia],
                );
                if (dias.length > 0) {
                  setRecorrente(true);
                } else {
                  setRecorrente(false);
                }
              }}
              color={dias.includes(dia) ? 'green' : 'gray'}
            />
          ))}
        </View>
      </View>
      <View style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        }}>
            <Button title="Cancelar" onPress={onAbort} />
            <Button title="Adicionar Tarefa" onPress={addTask} />
        </View>
    </View>
  );
};

export default NewRoutine;
