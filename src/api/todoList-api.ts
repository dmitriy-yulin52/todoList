import axios from "axios";


const instance = axios.create({
    baseURL: `https://social-network.samuraijs.com/api/1.1/`,
    withCredentials: true,
    headers: {
        'API-KEY': '61621252-ff2c-43d3-a118-9f7f7ab13dae'
    }
})





type CommonResponseType<T = {}> = {
    fieldsErrors:Array<string>
    messages: Array<string>
    resultCode:number
    data: T
}


type TodoListType = {
    id: string
    addedDate: string
    order: number
    title: string
}


export const TodoListApi = {
    getTodoList(){
        return instance.get<Array<TodoListType>>(`todo-lists`)
    },
    createTodoList(){
        return instance.post<CommonResponseType<{ item: TodoListType }>>(`todo-lists`,{title:'newTodoList'})
    },
    deleteTodoList(){
        const todoListID = `54896ba7-93cf-40e1-b79f-0b8e2a58222d`
        return instance.delete<CommonResponseType>(`todo-lists/${todoListID}`)
    },
    updateTodoList(){
        const todoListID = `54896ba7-93cf-40e1-b79f-0b8e2a58222d`
        return instance.put<CommonResponseType>(`todo-lists/${todoListID}`,{title: 'update-title'})
    }
}