import React, {useState, useEffect} from 'react';
import { Button, FormControl, Input, InputLabel } from '@material-ui/core';
import './App.css';
import Todo from './Todo';
import db from './firebase';
import firebase from 'firebase'

function App() {
  const[todos, setTodos] = useState(['']);
  const[input, setInput] = useState('');

  // when the app loads we need to listen to the database and fetch new todos as they get added/ ramove

  useEffect(() => {
    //this code here... fires when the app.js loads
    db.collection('todos').orderBy('timestamp','desc').onSnapshot(snapshot => {
      // console.log(snapshot.docs.map(doc => doc.data().todo))
      setTodos(snapshot.docs.map(doc => ({id:doc.id,todo:doc.data().todo})));
    })
  },[]);

  const addTodo = (event) =>{
    // this will fire off when clickk button
    event.preventDefault();// this will stop refresh
    // console.log('mujhe dabaya gya hai');
    db.collection('todos').add({
      todo : input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    })
    setTodos([...todos, input]);
    setInput('');// clear upp the input after clicking add todo button
  }
  return (
    <div className="App">
      <h1>Hello Tanmay!</h1>
      <form>
        <FormControl>
          <InputLabel>✍️Write a ToDo</InputLabel>
          <Input value={input} onChange={event => setInput(event.target.value)}/>
        </FormControl>
        <Button disabled={!input} variant="contained" color="primary" onClick={addTodo} type='submit'>
        🔫️Add ToDo
        </Button>
      </form>

      <ul>
        {todos.map(todo => (
          <Todo todo={todo}/>
        ))}
      </ul>
    </div>
  );
}

export default App;
