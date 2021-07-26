import {v1} from "uuid";
import {TitleType} from "../AppWithRedux";

const initialState: Array<ToDoListType> = []

export type RemoveTodoListAT = {
    type: 'REMOVE-TODOLIST'
    todoListId: string
}
export type AddTodoListAT = {
    type: 'ADD-TODOLIST'
    title: string
    todoListId: string
}
export type ChangeTodoListTitleAT = {
    type: 'CHANGE-TODOLIST-TITLE'
    title: string
    todoListId: string
}
export type ChangeTodoListFilterAT = {
    type: 'CHANGE-TODOLIST-FILTER'
    title: TitleType
    todoListId: string
}
export type ToDoListType = {
    id: string
    title: string
    filter: TitleType
}

export type ActionsType =
    RemoveTodoListAT
    | AddTodoListAT
    | ChangeTodoListTitleAT
    | ChangeTodoListFilterAT


export const todoListReducer = (todoLists: Array<ToDoListType> = initialState, action: ActionsType) => {

    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return todoLists.filter(tl => tl.id !== action.todoListId)
        case 'ADD-TODOLIST':
            const newTodolist: ToDoListType = {
                id: action.todoListId,
                title: action.title,
                filter: 'All'
            }
            return [...todoLists, newTodolist]
        case 'CHANGE-TODOLIST-TITLE':
            return todoLists.map((el) => {
                if (el.id === action.todoListId) {
                    return {...el, title: action.title}
                }
                return el
            })
        case 'CHANGE-TODOLIST-FILTER':
            return todoLists.map(tl => tl.id === action.todoListId ? {...tl, filter: action.title} : tl)
        default:
            return todoLists
    }

}

export const removeTodoListAC = (todoListId: string): RemoveTodoListAT => {
    return {type: 'REMOVE-TODOLIST', todoListId: todoListId}
}
export const addTodoListAC = (title: string): AddTodoListAT => {
    return {type: 'ADD-TODOLIST', title: title, todoListId: v1()}
}
export const changeTodoListTitleAC = (title: string, todoListId: string): ChangeTodoListTitleAT => {
    return {
        type: 'CHANGE-TODOLIST-TITLE',
        title: title,
        todoListId: todoListId
    }
}
export const changeTodoListFilterAC = (title: TitleType, todoListId: string): ChangeTodoListFilterAT => {
    return {
        type: 'CHANGE-TODOLIST-FILTER',
        title: title,
        todoListId: todoListId
    }
}