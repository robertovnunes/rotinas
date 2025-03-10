import AsyncStorage from '@react-native-async-storage/async-storage';
import {Task} from "interfaces/task";


const STORAGE_KEY = '@routine_tracker';

export const saveTasks = async (tasks: Task[]) => {
    try {
        const jsonValue = JSON.stringify(tasks);
        await AsyncStorage.setItem(STORAGE_KEY, jsonValue);
    } catch (error) {
        console.error('Erro ao salvar tarefas:', error);
    }
};

export const saveTask = async (task: Task) => {
    try {
        const tasks = await loadTasks();
        tasks.push(task);
        await saveTasks(tasks);
    } catch (error) {
        console.error('Erro ao salvar tarefa:', error);
    }
};

export const deleteTask = async (id: string) => {
    try {
        const tasks = await loadTasks();
        const newTasks = tasks.filter((task) => task.id !== id);
        await saveTasks(newTasks);
    } catch (error) {
        console.error('Erro ao deletar tarefa:', error);
    }
};

export const updateTask = async (task: Task) => {
    try {
        const tasks = await loadTasks();
        const index = tasks.findIndex((t) => t.id === task.id);
        if (index !== -1) {
            tasks[index] = task;
            await saveTasks(tasks);
        }
    } catch (error) {
        console.error('Erro ao atualizar tarefa:', error);
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


declare module 'utils/storage' {
    
}