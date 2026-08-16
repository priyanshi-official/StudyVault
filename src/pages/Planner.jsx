import React, { useEffect } from 'react'
import './Planner.css'
import { FaPlus , FaEdit , FaTrash , FaCheckCircle} from "react-icons/fa";
import { useState } from 'react';


const Planner = () => {

  const [showCard, setShowCard] = useState(false)
  const [title, setTitle] = useState("")
  const [date, setDate] = useState("")
  const [time, setTime] = useState("")

  const [tasks, setTasks] = useState([])
  const [editId, setEditId] = useState(null)

  function displayModal(){
    if(showCard === false){
      return null
    }
    return(
      <div className="modal-layout">
        <div className="modal">
          <h2>Add new task</h2>
          <label>Title</label>
          <input type="text" value={title}
          onChange={(e)=>{setTitle(e.target.value)}} />
          <label>Date</label>
          <input type="date" value={date}
          onChange={(e)=>{setDate(e.target.value)}} />
          <label>Time</label>
          <input type="time" value={time}
          onChange={(e)=>{setTime(e.target.value)}} />

          <div className="modal-buttons">
            <button className='cancel-btn' onClick={()=>{setShowCard(false)}}> Cancel</button>
            <button className='save-btn' onClick={saveTask}> {editId !== null ? "Update Task" : "Save Task"} </button>
          </div>
        </div>
      </div>
    );
  }


  function saveTask(){
    if(title ==="" || date === "" || time === ""){
      alert("Please fill all the details")
      return
    }

    if(editId !== null){
      const updated = tasks.map(task =>
        task.id === editId ? {...task,
                title,
                date,
                time
            }: task );

      setTasks(updated);
      setEditId(null);
    }

    else{
      const newTask ={
        id: Date.now(),
        title,
        date,
        time,
        completed:false
      }
      setTasks([...tasks,newTask])
      window.dispatchEvent(new Event("tasksUpdated"));
    }

    setTitle("")
    setDate("")
    setTime("")
    setShowCard(false);
  }


  function editTask(id){
    const task = tasks.find(task=> task.id === id)
    if(!task)
      return

    setTitle(task.title)
    setDate(task.date)
    setTime(task.time)
    setEditId(id)
    setShowCard(true)
  }

  function deleteTask(id){
    if(!window.confirm("Delete this task..?"))
      return
    const updatedTasks = tasks.filter(task => task.id !== id)
    setTasks(updatedTasks)
  }


  function toggleCompleted(id){
    const updatedTasks = tasks.map(task => task.id === id ? {...task, completed: !task.completed } : task );
    setTasks(updatedTasks);
  }


  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks"));

    if(savedTasks){
        setTasks(savedTasks);
    }
  }, []);


  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);
  

  return (
    <div className="planner-container">

      <div className="planner-header">
        <div className="planner-left">
          <h1>Study Planner</h1>
          <p>Plan your study schedule and stay on track every day.</p>
        </div>

        <div className="planner-right">
          <button className="add-task-btn" onClick={()=>{setShowCard(true)}}>
            <FaPlus /> Add Task
          </button>
        </div>
      </div>

      <div className="planner-mid">
        <h2>My Tasks:</h2>
      </div>

      <div className="planner-bottom">
            {tasks.length === 0 ? (
              <div className="empty-state">
                <h2>No Tasks Yet 📚</h2>
                <p>Click on <b>Add Task</b> to create your first study task.</p>
              </div>

            ) : (
              tasks.map((task) => {
                return (
                  <div className="task-card" key={task.id}>
                    <h2>{task.title}</h2>
                    <p><span className="details">Date:</span> {task.date}</p>
                    <p><span className="details">Time:</span> {task.time}</p>
                    <p><span className="details">Status:</span>{" "}{task.completed ? "✔️ Completed" : "⏳ Pending"} </p>

                    <div className="card-icons">
                      <FaCheckCircle className={task.completed ? "complete-icon completed" : "complete-icon"}
                        onClick={() => toggleCompleted(task.id)}/>
                      <FaEdit className="edit-icon"
                        onClick={() => editTask(task.id)} />
                      <FaTrash  className="delete-icon"
                        onClick={() => deleteTask(task.id)}  />
                    </div>
                  </div>
                );
              })
            )}
          </div>
          
    {displayModal()}
    </div>

  )
}

export default Planner