import {v1} from 'uuid';
import {TitleType, ToDoListType} from '../App';
import {
    ActionsType, addTodoListAC, changeTodoListFilterAC,
    ChangeTodoListFilterAT, changeTodoListTitleAC,
    ChangeTodoListTitleAT,
    removeTodoListAC,
    todoListReducer
} from "./todoList-reducer";

test('correct todolist should be removed', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    const startState: Array<ToDoListType> = [
        {id: todolistId1, title: "What to learn", filter: "All"},
        {id: todolistId2, title: "What to buy", filter: "All"}
    ]

    const endState = todoListReducer(startState, removeTodoListAC(todolistId1))

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2);
    expect(endState[0].title).toBe('What to buy');
});

test('correct todolist should be added', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    let newTodolistTitle = "New Todolist";

    const startState: Array<ToDoListType> = [
        {id: todolistId1, title: "What to learn", filter: "All"},
        {id: todolistId2, title: "What to buy", filter: "All"}
    ]

    const endState = todoListReducer(startState, addTodoListAC(newTodolistTitle))

    expect(endState.length).toBe(3);
    expect(endState[2].title).toBe(newTodolistTitle);
});

test('correct todolist should change its name', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    let newTodolistTitle = "New Todolist";

    const startState: Array<ToDoListType> = [
        {id: todolistId1, title: "What to learn", filter: "All"},
        {id: todolistId2, title: "What to buy", filter: "All"}
    ]

    const action: ChangeTodoListTitleAT = {
        type: 'CHANGE-TODOLIST-TITLE',
        todoListId: todolistId2,
        title: newTodolistTitle
    };

    const endState = todoListReducer(startState, changeTodoListTitleAC(action.title,action.todoListId));

    expect(endState[0].title).toBe("What to learn");
    expect(endState[1].title).toBe(newTodolistTitle);
});

test('correct filter of todolist should be changed', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    let newFilter:TitleType = "Completed";

    const startState: Array<ToDoListType> = [
        {id: todolistId1, title: "What to learn", filter: "All"},
        {id: todolistId2, title: "What to buy", filter: "All"}
    ]

    const action: ChangeTodoListFilterAT = {
        type: 'CHANGE-TODOLIST-FILTER',
        todoListId: todolistId2,
        title: newFilter
    };

    const endState = todoListReducer(startState, changeTodoListFilterAC(action.title,action.todoListId));

    expect(endState[0].filter).toBe("All");
    expect(endState[1].filter).toBe(newFilter);
});



