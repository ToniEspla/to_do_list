import './App.css';
import React, { useState, Fragment, useRef, useEffect } from 'react';
import { ToDoList } from './components/ToDoList';
import { Header } from './components/Header';
import toDo from './assets/img/toDo.png';

const KEY_LOCAL_STORAGE = "toDoListApp.toDosState";

function App() {
    //Initial State 
    const [toDosState, setStateToDos] = useState([]);
    //{ id: 1, task: "Task Description", completed: false }

    //Setting hook 'useRef'
    const toDoTaskRef = useRef();
    const btnAddTask = useRef();
    const heroTask = useRef();
    const heroImg = useRef();
    const heroBackground = useRef();

    //Applying useEffect to use local storage
    useEffect(() => {
        const storedToDosState = JSON.parse(localStorage.getItem(KEY_LOCAL_STORAGE));
        if (storedToDosState) {
            setStateToDos(storedToDosState);
            showHero(storedToDosState.length);
        }
    },[]);

    useEffect(() => {
        localStorage.setItem(KEY_LOCAL_STORAGE, JSON.stringify(toDosState));
    }, [toDosState]);

    //Setting the ID for the new element
    const setNewID = () => {
        let ids = []
        let newID;
        toDosState.map(function (x) { ids.push(x.id) });
        ids.length > 0 ? (newID = (Math.max(...ids)) + 1) : newID = 1;
        return newID;       
    }

    //Function to add a new element
    const addToDo = () => {
        let task = toDoTaskRef.current.value;
        if (task === '') return;

        //Setting new state
        setStateToDos((prevStateToDos) => {
            return [...prevStateToDos, { id: setNewID(), task, completed: false }];
        });

        //Clearing the input
        toDoTaskRef.current.value = null;
        toDoTaskRef.current.focus();

        //hide Hero
        showHero(1);
    }

    //Function to switch the Task Status
    const toggleStatusTask = (id) => {
        const arrToDos = [...toDosState];
        const checkedElement = arrToDos.find((checkedElement) => checkedElement.id === id);
        checkedElement.completed = !checkedElement.completed;
        //Updating state
        setStateToDos(arrToDos);
    }

    //Function to delete all the completed tasks
    const deleteCompletedTasks = () => {
        const arrToDos = toDosState.filter((toDo) => !toDo.completed);
        //saving state
        setStateToDos(arrToDos);
        //if isn't task -> call to showHero function
        let arr = []
        arrToDos.map(function (x) { arr.push(x.id) });
        arr = arr.length;
        showHero(arr);
    }

    const showHero = (elements) => {
        console.log(elements);
        if (elements === 0) {
            heroTask.current.className = "addTask_container container heroTask";
            heroImg.current.className = "heroImg";
            heroBackground.current.className = "heroBackground";
            toDoTaskRef.current.focus();
        } else {
            heroTask.current.className = "addTask_container container";
            heroImg.current.className = "hide";
            heroBackground.current.className = "hide";
        }
    }

    //Function to update task
    const updateToDo = (id, text) => {
        if (text === '') return;
        const arrToDos = [...toDosState];
        const element = arrToDos.find((element) => element.id === id);
        element.task = text
        //Updating state
        setStateToDos(arrToDos);
    }

    const showUpdateTaskPanel = (id) => {
        const arrToDos = [...toDosState];
        const element = arrToDos.find((element) => element.id === id);
        element.updateTaskPanelClass.value = "hidden";       
    }

    //This function listen the "enter" key and when it happens, call to AddToDo()
    const handleKeypress = (e) => {
        if (e.keyCode === 13) {
            btnAddTask.current.click();
        }
    }

    return (
        <Fragment>
            <Header/>
            <div ref={heroTask} className="addTask_container container">
                <input ref={toDoTaskRef} type="text" placeholder="&#191;Qu&eacute; vamos a hacer?" className="txtTask" autoFocus={true} onKeyDown={handleKeypress} />
                <button onClick={addToDo} ref={btnAddTask} className="btn_2 btnPositivo">Agregar Tarea</button>  
            </div>   
            <img ref={heroImg} className="hide" src={toDo} />
            <ToDoList toDos={toDosState} toggleStatusTask={toggleStatusTask} updateToDo={updateToDo} showUpdateTaskPanel={showUpdateTaskPanel} deleteCompletedTasks={deleteCompletedTasks} />
            <div ref={heroBackground} className="hide"></div>
        </Fragment>
    );
}

export default App;
