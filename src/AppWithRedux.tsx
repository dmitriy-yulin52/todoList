import React from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import AddItemForm from "./AddItemForm";
import AppBar from '@material-ui/core/AppBar';
import {IconButton, Typography, Button, Toolbar, Container, Grid, Paper} from '@material-ui/core';
import {Menu} from '@material-ui/icons';
import {
    addTodoListAC,
    changeTodoListFilterAC,
    changeTodoListTitleAC,
    removeTodoListAC, ToDoListType,
} from "./state/todoList-reducer";
import {
    AddTaskAC,
    AddTaskTitleAC,
    changeTaskStatusAC,
    RemoveTaskAC,
    TasksStateType
} from "./state/task-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";

export type TitleType = "All" | "Active" | "Completed"


function AppWithRedux() {


    const todoLists = useSelector<AppRootStateType, Array<ToDoListType>>(state=>state.todoLists)
    const tasks = useSelector<AppRootStateType, TasksStateType>(state=>state.tasks)
    const dispatch = useDispatch()


    const removeTasks = (Mid: string, todoListId: string) => {
        let action = RemoveTaskAC(Mid,todoListId)
        dispatch(action)
    }
    const addTask = (title: string, todoListId: string) => {
        let action = AddTaskAC(title,todoListId)
        dispatch(action)
    }
    const isDoneChange = (Mid: string, newIsDone: boolean, todoListId: string) => {
        let action = changeTaskStatusAC(Mid,newIsDone,todoListId)
        dispatch(action)
    }
    const changeTaskTitle = (Mid: string, title: string, todoListId: string) => {
        let action = AddTaskTitleAC(Mid,title,todoListId)
        dispatch(action)
    }

    const changeTodoListFilter = (title: TitleType, todoListId: string) => {
        let action = changeTodoListFilterAC(title,todoListId)
        dispatch(action)
    }
    const removeTodoList = (todoListId: string) => {
        let action = removeTodoListAC(todoListId)
        dispatch(action)
        delete tasks[todoListId]
    }
    const addTodolist = (title: string) => {
        let action = addTodoListAC(title)
        dispatch(action)
    }
    const changeTodoListTitle = (title: string, todoListId: string) => {
        let action = changeTodoListTitleAC(title,todoListId)
        dispatch(action)
    }


    const todoListsElements = todoLists.map(tl => {

        let tasksForTodoList = tasks[tl.id];
        if (tl.filter === 'Active') {
            tasksForTodoList = tasks[tl.id].filter(el => !el.isDone)
        }
        if (tl.filter === 'Completed') {
            tasksForTodoList = tasks[tl.id].filter(el => el.isDone)
        }

        return (
            <Grid item key={tl.id}>
                <Paper style={{padding: '10px'}} elevation={5}>
                    <Todolist
                        todoListId={tl.id}
                        filter={tl.filter}
                        title={tl.title}
                        tasks={tasksForTodoList}
                        addTask={addTask}
                        removeTasks={removeTasks}
                        changeTodoListFilter={changeTodoListFilter}
                        isDoneChange={isDoneChange}
                        removeTodoList={removeTodoList}
                        changeTaskTitle={changeTaskTitle}
                        changeTodoListTitle={changeTodoListTitle}
                    />
                </Paper>
            </Grid>
        )
    })

    const gridStyle = {
        padding: '10px 0',
    }

    return (
        <div className={'App'}>
            <AppBar position="static">
                <Toolbar style={{justifyContent: 'space-between'}}>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        TodoList
                    </Typography>
                    <Button
                        color="inherit"
                        variant={'outlined'}
                    >Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={gridStyle}>
                    <AddItemForm addItem={addTodolist}/>
                </Grid>
                <Grid container spacing={5}>
                    {todoListsElements}
                </Grid>
            </Container>
        </div>
    );
}

export default AppWithRedux;
