import {List, ListItem, ListItemText, Button, Modal} from '@material-ui/core';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import './Todo.css';
import React, {useState} from 'react';
import db from './firebase'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    paper: {
      position: 'absolute',
      width: '50wh',
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }));
  

function Todo(props) {

    const classes = useStyles();

    const [open, setOpen] = useState(false);
    const [input, setInput] = useState('');

    const updateTodo = (event) =>{
        //  update a new input set
        event.preventDefault();
        db.collection('todos').doc(props.todo.id).set({
            todo: input
        },{merge: true})
        setOpen(false);
    }

    return (
        <>
        <Modal 
        open={open} 
        onClose={e => setOpen(false)}>
            <div className = {classes.paper}>
                <h1>
                    Edit Yout ToDo...
                </h1>
                <form style={{display: "grid"}}>
                    <input style={{width:'100%'}} placeholder = {props.todo.todo} onChange={event => setInput(event.target.value)} />
                    <Button style={{width:'100%'}} variant="contained" color="secondary" onClick = {updateTodo} type='submit'>update ToDo</Button>
                </form>
            </div>
        </Modal>
        <List className='todo-list'>
            <ListItem>
                <ListItemText primary={props.todo.todo} secondary='Dummy Dead Line' />
            </ListItem>
            <div style={{display: "block"}}>
                <Button onClick= { e => setOpen(true)}>Edit</Button>
                <DeleteForeverIcon onClick={event => db.collection('todos').doc(props.todo.id).delete() }/>
            </div>

        </List>
        </>
    )
}

export default Todo
