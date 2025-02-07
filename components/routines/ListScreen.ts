import { Task } from "task";
import React, { useState, useEffect } from "react";
import {View, Text, FlatList, Button, StyleSheet, TextInput, ScrollView} from "react-native";
import {NavigationContainer, useNavigation} from "@react-navigation/native";
import {createStackNavigator, StackNavigationProp} from "@react-navigation/stack";
import { saveTasks, loadTasks } from "../../utils/storage";
import AsyncStorage from "@react-native-async-storage/async-storage";

type RootStackParamList = {
    ListScreen: undefined;
    ViewRoutine: { task: Task };
};

type NavigationProp = StackNavigationProp<RootStackParamList, "ListScreen">;

const ListScreen = (): any => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const navigation = useNavigation<NavigationProp>();

    useEffect(() => {
        (async () => {
            const savedTasks = await loadTasks();
            setTasks(savedTasks);
        })();
    }, []);

    useEffect(() => {
        saveTasks(tasks);
    }, [tasks]);

    const toggleTaskCompletion = (id: string) => {
        setTasks((prevTasks) =>
            prevTasks.map((task) =>
                task.id === id ? { ...task, completed: !task.completed } : task
            )
        );
    };

    return (
        <View style={{ padding: 20 }}>
        <Text style={{ fontSize: 24, fontWeight: "bold" }}>📅 Minhas Rotinas</Text>
        <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
            <TouchableOpacity
                onPress={() => navigation.navigate("ViewRoutine", { task: item })}
        style={{
            flexDirection: "row",
                justifyContent: "space-between",
                padding: 10,
                marginVertical: 5,
                borderWidth: 1,
                borderColor: item.completed ? "green" : "gray",
                borderRadius: 5,
        }}
    >
        <Text style={{ textDecorationLine: item.completed ? "line-through" : "none" }}>
        {item.icon} {item.titulo} - {item.horario}
        </Text>
        <Button title="✔" onPress={() => toggleTaskCompletion(item.id)} />
        </TouchableOpacity>
    )}
        />
    </View>
);
};

export default ListScreen;