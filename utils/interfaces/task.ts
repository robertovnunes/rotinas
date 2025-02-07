declare module 'task' {
    export interface Task {
        id: string;
        titulo: string;
        descricao: string;
        recorrente: boolean;
        dias: string[];
        horario: string;
        icon: string;
        completed: boolean;
    }
}