interface TodoItem {
    id: string,
    name: string,
    completed: boolean
}

const todos: TodoItem[] = [
    { id: "1", name: "Build a Todo App", completed: false },
    { id: "2", name: "Learn TDD while doing this project", completed: false },
    { id: "3", name: "Remember to have a break", completed: true },
];

export default todos