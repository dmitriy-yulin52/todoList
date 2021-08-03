import React, {ChangeEvent, KeyboardEvent, useState} from 'react'
import {IconButton, TextField} from '@material-ui/core'
import {AddBox} from '@material-ui/icons';


type AddItemFormPropsType = {
    addItem: (title: string) => void
}


export const  AddItemForm = React.memo( (props: AddItemFormPropsType)=> {
    console.log('AddItemForm')
    const [title, setTitle] = useState('')
    const [error, setError] = useState<null | string>(null)
    const errorMessage = 'Title is required'

    const addItem = () => {
        const titleTrim = title.trim()
        if (titleTrim) {
            props.addItem(titleTrim)
        } else {
            setError(errorMessage)
        }
        setTitle('')
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {

        setTitle(e.currentTarget.value)
    }
    const onPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if(error !== null){
            setError(null)
        }
        if (e.key === 'Enter') {
            addItem()
        }
    }

    return (
        <div>
            <TextField
                value={title}
                onChange={onChangeHandler}
                onKeyPress={onPressHandler}
                label={'Title'}
                variant={'outlined'}
                size={'small'}
                style={{color: 'white'}}
            />
            {/*<input className={error ? 'error' : ''}*/}
            {/*       value={title}*/}
            {/*       onChange={onChangeHandler}*/}
            {/*       onKeyPress={onPressHandler}*/}
            {/*       style={error ? {*/}
            {/*           border: '2px solid red',*/}
            {/*           outline: 'none',*/}
            {/*           textAlign: 'center'*/}
            {/*       } : {} }*/}
            {/*/>*/}
            <IconButton
                onClick={addItem}
                size={'small'}
                color={'primary'}
            >
                <AddBox fontSize={'large'}/>
            </IconButton>
            {/*<button className={'btnState'} onClick={addItem}>Click</button>*/}
            <div style={error ? {color: 'red'} : {display: 'none'}}>{errorMessage}</div>
        </div>
    )
})

