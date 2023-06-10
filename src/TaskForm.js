import React, { useState } from 'react'
import './TaskForm.css'

function TaskForm({ onAdd }) {

    const [task, setTask] = useState("");

    function handleSubmit(e) {
        e.preventDefault();
        onAdd(task);
        setTask("");
    }

    return (
        <div>
            <form onSubmit={(e) => handleSubmit(e)}>
                <input type="text" value={task} onChange={(e) => setTask(e.target.value)} placeholder="Your next task..." />
                <button onClick={(e) => handleSubmit(e)}>+</button>
            </form>
        </div>
    )
}

export default TaskForm