import React, {ChangeEvent, useCallback} from 'react'
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {IconButton, Checkbox} from '@material-ui/core';
import {Delete} from '@material-ui/icons';
import {TitleType} from './AppWithRedux';
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {AddTaskAC, AddTaskTitleAC, changeTaskStatusAC, RemoveTaskAC} from "./state/task-reducer";

export type TaskType = {
    title: string
    isDone: boolean
    id: string

}
type PropsType = {
    filter: TitleType
    todoListId: string
}


export const Task = (props: PropsType) => {


    const tasks = useSelector<AppRootStateType, Array<TaskType>>(state => state.tasks[props.todoListId])
    const dispatch = useDispatch()

    let tasksForTodoList = tasks;
    if (props.filter === 'Active') {
        tasksForTodoList = tasks.filter(el => !el.isDone)
    }
    if (props.filter === 'Completed') {
        tasksForTodoList = tasks.filter(el => el.isDone)
    }
    let addTask = useCallback((title:string)=>{
        dispatch(AddTaskAC(title,props.todoListId))
    },[dispatch,props.todoListId])



    return (

        <React.Fragment>
            <div>
                <AddItemForm addItem={addTask}/>
            </div>
            <ul>
                {tasksForTodoList.map((t) => {

                        const removeTaskHandler = () => {
                            dispatch(RemoveTaskAC(t.id, props.todoListId))
                        }
                        const isDoneHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            dispatch(changeTaskStatusAC(t.id, e.currentTarget.checked, props.todoListId))
                        }
                        const changeTitle = (title: string) => {
                            dispatch(AddTaskTitleAC(t.id, title, props.todoListId))
                        }

                        return (<li key={t.id} className={'list'}>
                            <Checkbox
                                color={'primary'}
                                checked={t.isDone}
                                onChange={isDoneHandler}
                                size={'small'}
                            />
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
        </React.Fragment>
    )
}
