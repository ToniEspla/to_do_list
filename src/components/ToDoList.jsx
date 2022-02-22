import React, { useRef, useState, useEffect } from 'react';
import { ToDoItem } from './ToDoItem';
import './ToDoList.css';

const KEY_title = "toDoListApp.titulo";
const KEY_description = "toDoListApp.descripcion";

export function ToDoList({ toDos, toggleStatusTask, updateToDo, showUpdateTaskPanel, deleteCompletedTasks }) {
    //Starting ref elements
    const txtTitle = useRef();
    const txtDescription = useRef();
    const pTitle = useRef();
    const pDescription = useRef();

    //State for Title and description
    const [stateTitle, setStateTitle] = useState("T\u00EDtulo");
    const [stateDescription, setStateDescription] = useState("Descripci\u00F3n de la lista :)");

    //Applying useEffect to use local storage
    useEffect(() => {
        const storedTitle = JSON.parse(localStorage.getItem(KEY_title));
        if (storedTitle) {
            setStateTitle(storedTitle);
        }
        const storedDescription = JSON.parse(localStorage.getItem(KEY_description));
        if (storedDescription) {
            setStateDescription(storedDescription);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem(KEY_title, JSON.stringify(stateTitle));
    }, [stateTitle]);

    useEffect(() => {
        localStorage.setItem(KEY_description, JSON.stringify(stateDescription));
    }, [stateDescription]);

    //functions for edit text of Title and Description
    const editTitle = () => {
        pTitle.current.className = "hide";
        txtTitle.current.className = "show txt_title";
        txtTitle.current.focus();
        txtTitle.current.value = stateTitle;
    }

    const editDescription = () => {
        pDescription.current.className = "hide";
        txtDescription.current.className = "show txt_description";
        txtDescription.current.focus();
        txtDescription.current.value = stateDescription;
    }

    const blurTitle = () => {
        if (txtTitle.current.value === "") txtTitle.current.value = "T\u00EDtulo";
        setStateTitle(txtTitle.current.value);
        pTitle.current.className = "show title_list_header";
        txtTitle.current.className = "hide";
    }

    const blurDescription = () => {
        if (txtDescription.current.value === "") txtDescription.current.value = "Descripci\u00F3n de la lista :)";
        setStateDescription(txtDescription.current.value);
        pDescription.current.className = "show description_list_header";
        txtDescription.current.className = "hide";
    }


    return (      
        <div className="container list_container">
            <div className="list_header">
                <p className="title_list_header" ref={pTitle} onClick={editTitle}>{stateTitle}</p>
                <input type="text" ref={txtTitle} onBlur={blurTitle} className="hide"/>
                <p className="description_list_header" ref={pDescription} onClick={editDescription}>{stateDescription}</p>
                <textarea ref={txtDescription} onBlur={blurDescription} className="hide" />
            </div>
            {toDos.map((toDo) => (
                <ToDoItem key={toDo.id} toDo={toDo} toggleStatusTask={toggleStatusTask} updateToDo={updateToDo} showUpdateTaskPanel={showUpdateTaskPanel} />
            ))}
            <div className="vaciar_tareas_container"><button onClick={deleteCompletedTasks} className="btn_2 btnNegativo">Eliminar Tareas</button></div>
        </div>
    );
}