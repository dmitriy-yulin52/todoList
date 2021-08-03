import React, {ChangeEvent, KeyboardEvent, useState} from 'react'
import { TextField } from '@material-ui/core'


type EditableSpanPropsType = {
    title: string
    checked?: boolean
    changeTitle: (title: string) => void
}

export const EditableSpan = (props: EditableSpanPropsType) =>{
    console.log('editableSpan')

    const [editMode, setEditMode] = useState<boolean>(false)
    const [title, setTitle] = useState<string>('')

    const onEditMode = () => setEditMode(true)
    const offEditMode = () => {
        if (title) {
            props.changeTitle(title)
        } else {
            setTitle(props.title)
        }
            setEditMode(false)
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            offEditMode()
        }

    }

    return (

            editMode
                ? <TextField
                        autoFocus
                        onBlur={offEditMode}
                        onChange={onChangeHandler}
                        onKeyPress={onKeyPressHandler}
                        size={'small'}
                        style={{color: 'white'}}
                />


            // ? <input
            // autoFocus
            // value={title}
            // onBlur={offEditMode}
            // onChange={onChangeHandler}
            // onKeyPress={onKeyPressHandler}
            // className={'editModeInput'}

            : <span
            onDoubleClick={onEditMode}
            className={props.checked ? 'isDone' : '' || 'spanStyle'}
        >
                    {props.title}
            </span>

            // {error && <span>{error}</span>}

    )
}
