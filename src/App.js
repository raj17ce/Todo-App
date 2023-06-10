import { useEffect, useState } from 'react';
import './App.css';
import Task from './Task';
import TaskForm from './TaskForm';

function App() {

  const [tasks, setTasks] = useState([]);
  const [id, setId] = useState(1);

  useEffect(() => {
    const tempTasks = JSON.parse(localStorage.getItem('tasks'));
    if (tempTasks != null) {
      setTasks(tempTasks);
    }
  }, []);

  useEffect(() => {
    if(tasks.length === 0) {
      localStorage.clear();
      return;
    }
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  function addTask(name) {
    setTasks([...tasks, { id: id, task: name, done: false }]);
    setId(id + 1);
  }

  function handleDone(newDone, taskIndex) {
    let tempTask = [...tasks];
    tempTask[taskIndex].done = !newDone;
    setTasks(tempTask);
  }

  function handleDelete(deleteIndex) {
    let tempTask = [...tasks];
    tempTask = tempTask.filter((item, index) => {
      return index !== deleteIndex;
    });

    setTasks(tempTask);
  }

  const completedTasks = tasks.filter(t => t.done).length;
  const totalTasks = tasks.length;
  const remainingTasks = totalTasks - completedTasks;

  return (
    <div className="card">
      {remainingTasks ? <div className='title'><h1 className='title-text'>{completedTasks}/{totalTasks} Tasks Completed <span className='tick'>✔</span></h1><h1 className='title-text'>Keep it up 🔥💪🏻</h1></div> : <div className='title'><h1 className='title-text'>Good Job! 🥳✨</h1><h1 className='title-text'>Done for the day 🥂🎉</h1></div>}
      <TaskForm onAdd={addTask} />
      {tasks.map((item, index) =>
        <Task id={item.id} task={item.task} done={item.done} onToggle={() => handleDone(item.done, index)} onDelete={() => handleDelete(index)} />
      )}
    </div>
  );
}

export default App;
