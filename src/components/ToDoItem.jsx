import React, { useRef, useState } from 'react';
import './ToDoItem.css';

export function ToDoItem({ toDo, toggleStatusTask, updateToDo }) {
    const { id, task, completed } = toDo;

    //State for show or hide the update panel task
    const [stateUPTask, setStateUPTask] = useState(true);

    //Setting hook 'useRef'
    const txtUpdateTaskRef = useRef();
    const updateTaskPanel = useRef();
    const taskP = useRef();

    const eToggleStatusTask = () => {
        toggleStatusTask(id);
    }

    const eUpdateToDo = (e) => {
        updateToDo(id, txtUpdateTaskRef.current.value);
        txtUpdateTaskRef.current.value = null;
        cancel(e);
    }

    const cancel = (e) => {
        eShowUpdateTaskPanel(e);
    }

    const eShowUpdateTaskPanel = () => {
        //Turn updateTaskPanel as hidden
        if (stateUPTask === false) {
            updateTaskPanel.current.className = "hide";
            taskP.current.className = "show";
            //updating status
            setStateUPTask (true);
        } else { //Turn updateTaskPanel as visible
            txtUpdateTaskRef.current.value = taskP.current.innerText;
            taskP.current.className = "hide";          
            updateTaskPanel.current.className = "show update_task_panel";
            //updating status
            setStateUPTask(false);
        }
    }

    return (
        <div className="flex task_container">          
            <p onClick={eShowUpdateTaskPanel} ref={taskP} className="">{task}</p>
            <div ref={updateTaskPanel} className="hide">
                <textarea ref={txtUpdateTaskRef} defaultValue={task} autoFocus/>
                <button onClick={cancel} className="btn_1 btnNegativo_2">Cancelar</button>
                <button onClick={eUpdateToDo} className="btn_1 btnPositivo_2">Actualizar</button>
            </div>
            <label className="chk_container">
                <input type="checkbox" onChange={eToggleStatusTask} checked={completed} className="chkTask" />
                <span className="checkmark"></span>
            </label>
        </div>
    );
}