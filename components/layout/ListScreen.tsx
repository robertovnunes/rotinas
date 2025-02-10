import React, { useEffect, useState} from "react";
import { View, Text, FlatList, Button, TouchableOpacity } from "react-native";
import { loadTasks } from "../../utils/storage";
import { Task } from "interfaces/task";
import TaskItem from "./TaskItem";

interface ListScreenProps {
    onToggle: (id: string) => void;
    onDelete: (id: string) => void;
};

    
const ListScreen: React.FC<ListScreenProps> = ({ onToggle, onDelete }) => {

    const [tasks, setTasks] = useState<Task[]>([]);

    useEffect(() => {
        const fetchTasks = async () => {
            const savedTasks = await loadTasks();
            setTasks(savedTasks);
        }
        fetchTasks();
    }, []);

    return (
        <FlatList
            data={tasks}
            keyExtractor={(task) => task.id}
            renderItem={({ item }) => (
                <TaskItem
                    task={item}
                    onToggle={onToggle}
                    onDelete={onDelete}
                />
            )}
        />
    );
};

export default ListScreen;