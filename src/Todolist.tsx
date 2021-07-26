import React, {ChangeEvent, KeyboardEvent, useState} from 'react'
import AddItemForm from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, IconButton, Checkbox} from '@material-ui/core';
import {Delete} from '@material-ui/icons';
import { TitleType } from './AppWithRedux';

export type TaskType = {
    title: string
    isDone: boolean
    id: string

}
type PropsType = {
    title: string
    tasks: Array<TaskType>
    filter: TitleType
    todoListId: string
    removeTasks: (id: string, todoListId: string) => void
    changeTodoListFilter: (title: TitleType, todoListId: string) => void
    addTask: (title: string, todoListId: string) => void
    isDoneChange: (id: string, NewIsDone: boolean, todoListId: string) => void
    removeTodoList: (todoListId: string) => void
    changeTaskTitle: (Mid: string, title: string, todoListId: string) => void
    changeTodoListTitle: (title: string, todoListId: string) => void
}



export const Todolist = (props: PropsType) => {


    const addTask = (title: string) => {
        props.addTask(title, props.todoListId)
    }
    const onAllClickHandler = () => {
        props.changeTodoListFilter('All', props.todoListId)
    }
    const onActiveClickHandler = () => {
        props.changeTodoListFilter('Active', props.todoListId)

    }
    const onCompletedClickHandler = () => {
        props.changeTodoListFilter('Completed', props.todoListId)
    }
    const onClickRemoveTodoList = () => {
        props.removeTodoList(props.todoListId)
    }
    const changeTodoListTitle = (title: string) => {
        props.changeTodoListTitle(title, props.todoListId)
    }

    return (
        <div className="App">
            <div className={'toDoList'}>

                {/*{editTitle*/}
                {/*    ? <input onChange={onChangeHandler}*/}
                {/*             value={title}*/}
                {/*             autoFocus*/}
                {/*             onBlur={offEditTitle}*/}
                {/*             onKeyPress={onKeyPressHandler}*/}
                {/*    />*/}
                <h3 className={'listTitle'}>
                    <EditableSpan
                        title={props.title}
                        changeTitle={changeTodoListTitle}
                    />
                    <IconButton
                        onClick={onClickRemoveTodoList}
                        size={'small'}
                        color={'primary'}

                    >
                        <Delete fontSize={'small'}/>
                    </IconButton>
                    {/*<button onClick={onClickRemoveTodoList}>X</button>*/}
                </h3>

                <div>
                    <AddItemForm addItem={addTask}/>
                </div>

                <ul>
                    {props.tasks.map((t) => {

                            const removeTaskHandler = () => {
                                props.removeTasks(t.id, props.todoListId)
                            }
                            const isDoneHandler = (e: ChangeEvent<HTMLInputElement>) => {
                                props.isDoneChange(t.id, e.currentTarget.checked, props.todoListId)
                            }
                            const changeTitle = (title: string) => {
                                props.changeTaskTitle(t.id, title, props.todoListId)
                            }


                            return (<li key={t.id} className={'list'}>
                                <Checkbox
                                    color={'primary'}
                                    checked={t.isDone}
                                    onChange={isDoneHandler}
                                    size={'small'}
                                />
                                {/*<input type="checkbox"*/}
                                {/*       checked={t.isDone}*/}
                                {/*       onChange={isDoneHandler}*/}
                                {/*/>*/}
                                <EditableSpan checked={t.isDone}
                                              title={t.title}
                                              changeTitle={changeTitle}
                                />
                                <IconButton
                                    onClick={removeTaskHandler}
                                    size={'small'}
                                    color={'primary'}
                                >
                                    <Delete/>
                                </IconButton>
                            </li>)
                        }
                    )
                    }
                </ul>

                <div className={'btnFilter'}>
                    <Button
                        size={'small'}
                        variant={'contained'}
                        onClick={onAllClickHandler}
                        color={props.filter === 'All' ? 'secondary' : 'primary'}
                    >
                        All
                    </Button>
                    <Button
                        style={{margin: '0 3px'}}
                        size={'small'}
                        variant={'contained'}
                        onClick={onActiveClickHandler}
                        color={props.filter === 'Active' ? 'secondary' : 'primary'}
                    >
                        Active
                    </Button>
                    <Button
                        size={'small'}
                        variant={'contained'}
                        onClick={onCompletedClickHandler}
                        color={props.filter === 'Completed' ? 'secondary' : 'primary'}
                    >
                        Completed
                    </Button>
                </div>
            </div>
        </div>
    )
}
