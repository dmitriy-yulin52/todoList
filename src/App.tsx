import React, {useEffect, useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";
import {v1} from "uuid";
import AddItemForm from "./AddItemForm";
import AppBar from '@material-ui/core/AppBar';
import {IconButton, Typography, Button, Toolbar, Container, Grid, Paper} from '@material-ui/core';
import {Menu} from '@material-ui/icons';

export type TitleType = "All" | "Active" | "Completed"


export type ToDoListType = {
    id: string
    title: string
    filter: TitleType
}

type TaskStateType = {
    [key: string]: Array<TaskType>
}

function App() {

    const todoListId_1 = v1()
    const todoListId_2 = v1()

    const [todoLists, setTodoLists] = useState<Array<ToDoListType>>([
        {id: todoListId_1, title: 'What to learn', filter: 'All'},
        {id: todoListId_2, title: 'What to buy', filter: 'All'}
    ])
    const [tasks, setTasks] = useState<TaskStateType>({
        [todoListId_1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'React', isDone: false},
            {id: v1(), title: 'Redux', isDone: true},
            {id: v1(), title: 'MobX', isDone: true},
            {id: v1(), title: 'JS', isDone: false},
            {id: v1(), title: 'WebPack', isDone: true},
        ],
        [todoListId_2]: [
            {id: v1(), title: 'Book', isDone: false},
            {id: v1(), title: 'NoteBook', isDone: true},
            {id: v1(), title: 'Redux', isDone: true},
            {id: v1(), title: 'Car', isDone: false},
            {id: v1(), title: 'Btc', isDone: false},
            {id: v1(), title: 'Phone', isDone: false},
        ]
    })


    const removeTasks = (Mid: string, todoListId: string) => {
        tasks[todoListId] = tasks[todoListId].filter(f => f.id !== Mid)
        setTasks({...tasks})
    }
    const addTask = (title: string, todoListId: string) => {
        const newTask = {id: v1(), title: title, isDone: false}
        tasks[todoListId] = [newTask, ...tasks[todoListId]];
        setTasks({...tasks})
    }
    const isDoneChange = (Mid: string, newIsDone: boolean, todoListId: string) => {
        tasks[todoListId] = tasks[todoListId].map((f) => {
            if (f.id === Mid) {
                return {...f, isDone: newIsDone}
            }
            return f
        })
        setTasks({...tasks})
    }
    const changeTaskTitle = (Mid: string, title: string, todoListId: string) => {
        tasks[todoListId] = tasks[todoListId].map((f) => {
            if (f.id === Mid) {
                return {...f, title: title}
            }
            return f
        })
        setTasks({...tasks})
    }

    const changeTodoListFilter = (title: TitleType, todoListId: string) => {
        setTodoLists(todoLists.map(tl => tl.id === todoListId ? {...tl, filter: title} : tl))
    }
    const removeTodoList = (todoListId: string) => {
        setTodoLists(todoLists.filter(tl => tl.id !== todoListId))
        delete tasks[todoListId]
    }
    const addTodolist = (title: string) => {
        const newTodolistID = v1()
        const newTodolist: ToDoListType = {
            id: newTodolistID,
            title: title,
            filter: 'All'
        }
        setTodoLists([...todoLists, newTodolist])
        setTasks({...tasks, [newTodolistID]: []})
    }
    const changeTodoListTitle = (title: string, todoListId: string) => {
        setTodoLists(todoLists.map((el) => {
            if (el.id === todoListId) {
                return {...el, title: title}
            }
            return el
        }))
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

export default App;
