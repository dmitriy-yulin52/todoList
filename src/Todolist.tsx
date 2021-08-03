import React, {ChangeEvent, useCallback} from 'react'
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, IconButton, Checkbox} from '@material-ui/core';
import {Delete} from '@material-ui/icons';
import {TitleType} from './AppWithRedux';
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {AddTaskAC, AddTaskTitleAC, changeTaskStatusAC, RemoveTaskAC} from "./state/task-reducer";
import {Task} from "./Task";

export type TaskType = {
    title: string
    isDone: boolean
    id: string

}
type PropsType = {
    title: string
    filter: TitleType
    todoListId: string
    changeTodoListFilter: (title: TitleType, todoListId: string) => void
    removeTodoList: (todoListId: string) => void
    changeTodoListTitle: (title: string, todoListId: string) => void
}


export const Todolist = (props: PropsType) => {


    const onAllClickHandler = useCallback(() => {
        props.changeTodoListFilter('All', props.todoListId)
    }, [props.changeTodoListFilter, props.todoListId])
    const onActiveClickHandler = useCallback(() => {
        props.changeTodoListFilter('Active', props.todoListId)
    }, [props.changeTodoListFilter, props.todoListId])
    const onCompletedClickHandler = useCallback(() => {
        props.changeTodoListFilter('Completed', props.todoListId)
    }, [props.changeTodoListFilter, props.todoListId])


    const onClickRemoveTodoList = () => {
        props.removeTodoList(props.todoListId)
    }
    const changeTodoListTitle = (title: string) => {
        props.changeTodoListTitle(title, props.todoListId)
    }


    return (
        <div className="App">
            <div className={'toDoList'}>
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
                </h3>

                <React.Fragment>
                    <Task
                        todoListId={props.todoListId}
                        filter={props.filter}
                    />
                </React.Fragment>

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
