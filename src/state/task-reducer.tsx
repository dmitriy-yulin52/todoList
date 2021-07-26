import {v1} from "uuid";
import {TaskType} from "../Todolist";
import {AddTodoListAT, RemoveTodoListAT} from "./todoList-reducer";


const initialState : TasksStateType = {}

const REMOVE_TASK = 'REMOVE-TASK'
const ADD_TASK = 'ADD-TASK'
const CHANGE_TASK_STATUS = 'CHANGE-TASK-STATUS'
const ADD_TITLE_TASK = 'ADD-TITLE-TASK'


export type RemoveTaskActionACType = {
    type: 'REMOVE-TASK'
    taskId:string
    todoListId: string
}
export type AddTaskACType = {
    type: 'ADD-TASK'
    title: string
    todoListId: string
}
export type changeTaskStatusACType = {
    type: 'CHANGE-TASK-STATUS'
    taskId:string
    isDone: boolean
    todoListId: string
}
export type addTaskTitleACType = {
    type: 'ADD-TITLE-TASK'
    taskId:string
    title: string
    todoListId: string
}
export type RemoveTodolistACType = {
    type: 'REMOVE-TODOLIST'
    todoListId: string
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}


export type ActionsType =
    RemoveTaskActionACType
    | AddTaskACType
    | changeTaskStatusACType
    | addTaskTitleACType
    | AddTodoListAT
    | RemoveTodolistACType
    | RemoveTodoListAT


export const taskReducer = (state: TasksStateType = initialState, action: ActionsType) => {

    switch (action.type) {
        case REMOVE_TASK:{
            let copyState = {...state}
            copyState[action.todoListId] = copyState[action.todoListId].filter((task)=>{
               return  task.id !== action.taskId
            })
            return copyState
        }
        case ADD_TASK: {
            let copyState = {...state}
            const newTask: TaskType = {id: v1(), title: action.title, isDone: false}
            copyState[action.todoListId] = [newTask, ...state[action.todoListId]];
            return copyState
            // const newTask:TaskType = {id: v1(), title: action.title, isDone: false}
            // return {...state, [action.todoListId]: [newTask,...state[action.todoListId]]}
        }
        case CHANGE_TASK_STATUS: {
            const copyState = {...state}
            copyState[action.todoListId] = copyState[action.todoListId].map((task) => {
                if (task.id === action.taskId) {
                    return {...task, isDone: action.isDone}
                }
                return task
            })
            return copyState
        }
        case ADD_TITLE_TASK: {
            const copyState = {...state}
            copyState[action.todoListId] = copyState[action.todoListId].map((task) => {
                if (task.id === action.taskId) {
                    return {...task, title: action.title}
                }
                return task
            })
            return copyState
        }
        case 'ADD-TODOLIST':{
            return {...state,[action.todoListId]:[]}
        }
        case "REMOVE-TODOLIST":{
            let copyState = {...state}
            delete copyState[action.todoListId]
            return copyState
        }
        default:
            return state

    }
}

export const RemoveTaskAC = (taskId: string,todoListId:string): RemoveTaskActionACType => {
    return {
        type: REMOVE_TASK,
        taskId,
        todoListId
    }
}
export const AddTaskAC = (title: string, todoListId: string): AddTaskACType => {
    return {
        type: ADD_TASK,
        title,
        todoListId
    }
}
export const changeTaskStatusAC = (taskId:string,isDone: boolean, todoListId: string): changeTaskStatusACType => {
    return {
        type: CHANGE_TASK_STATUS,
        isDone,
        todoListId,
        taskId
    }
}
export const AddTaskTitleAC = (taskId:string,title: string, todoListId: string):addTaskTitleACType => {
    return {
        type: ADD_TITLE_TASK,
        title,
        todoListId,
        taskId
    }
}
export const AddTodolistAC = (title: string): AddTodoListAT => {
    return {
        type: 'ADD-TODOLIST',
        title: title,
        todoListId:v1()
    }
}
export const RemoveTodolistAC = (todoListId: string): RemoveTodolistACType => {
    return {
        type: 'REMOVE-TODOLIST',
        todoListId
    }
}
