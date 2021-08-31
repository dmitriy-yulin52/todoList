import {ToDoListType} from "../state/todoList-reducer";
import {taskReducer, TasksStateType} from "./task-reducer";
import {addTodoListAC, todoListReducer} from "./todoList-reducer";

test('ids should be equals', () => {
    const startTasksState: TasksStateType = {};
    const startTodolistsState: Array<ToDoListType> = [];

    const action = addTodoListAC("new todolist");

    const endTasksState = taskReducer(startTasksState, action)
    const endTodolistsState = todoListReducer(startTodolistsState, action)

    const keys = Object.keys(endTasksState);
    const idFromTasks = keys[0];
    const idFromTodolists = endTodolistsState[0].id;

    expect(idFromTasks === idFromTodolists).toBe(true);
});
