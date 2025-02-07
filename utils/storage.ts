import AsyncStorage from '@react-native-async-storage/async-storage';
import {Task} from "task";


const STORAGE_KEY = '@routine_tracker';
export const saveTasks = async (tasks: Task[]) => {
    try {
        const jsonValue = JSON.stringify(tasks);
        await AsyncStorage.setItem(STORAGE_KEY, jsonValue);
    } catch (error) {
        console.error('Erro ao salvar tarefas:', error);
    }
};

export const loadTasks = async (): Promise<Task[]> => {
    try {
        const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
        return jsonValue ? JSON.parse(jsonValue) : [];
    } catch (error) {
        console.error('Erro ao carregar tarefas:', error);
        return [];
    }
};
