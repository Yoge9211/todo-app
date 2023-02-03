import React, { useState, useEffect } from 'react'
import TodoList from './TodoList'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const Todo = () => {
  const [update, setUpdate] = useState(false)
  const [toUpdateTaskbyId, setToUpdateTaskbyId] = useState(0)
  const [task, setTask] = useState('')
  const [list, setList] = useState([])

  useEffect(() => {
    // used useEffect to call Api function before Rendering
    callApi()
  }, [])

  // Calling to Api for todo list
  const callApi = async () => {
    await fetch('https://jsonplaceholder.typicode.com/todos/?userId=1')
      .then((res) => {
        return res.json()
      })
      .then((data) => {
        // console.log(data);
        setList(data)
      })
      .catch((err) => {
        console.log('error:- ', err)
      })
  }

  const addTask = async () => {
    if (task === '') {
      toast('Write Something...')
      return
    }
    await fetch('https://jsonplaceholder.typicode.com/todos/?userId=1', {
      method: 'POST',
      body: JSON.stringify({
        title: task,
        userId: 1,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((res) => {
        return res.json()
      })
      .then((data) => {
        setList([{ userId: 1, title: task, completed: false }, ...list])
        toast('Task added succefully')
      })
    setTask('')
  }
  const handleDelete = (data) => {
    toast('Task deleted succefully')
    setList(data)
  }

  //  here you can update Tasks
  const updateTask = (data, id) => {
    setUpdate(true)
    setTask(data)
    setToUpdateTaskbyId(id - 1)
  }

  const updatingTask = async () => {
    if (task === '') {
      toast('Write Something...')
      return
    }
    await fetch('https://jsonplaceholder.typicode.com/todos/?userId=1', {
      method: 'PUT',
      body: JSON.stringify({
        title: task,
        userId: 1,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((res) => {
        return res.json()
      })
      .then((data) => {
        setUpdate(false)
        toast('Task Updated succefully')
        list.map((item, ind) => {
          if (ind === toUpdateTaskbyId) {
            item.title = task
          }
          setList([...list])
        })
      })
    setTask('')
  }

  //  THis function is for handle tasks
  const HandleTaskCompleted = (data, id) => {
    list.map((item, ind) => {
      if (ind + 1 === id) {
        if (item.completed) {
          item.completed = false
        } else {
          item.completed = true
        }
      }
      setList([...list])
    })
  }

  return (
    <div className="container">
      <ToastContainer />
      <div className="todoApp">
        <h1>To Do App</h1>
      </div>
      <div className="todoContainer">
        <div className="todoInputContainer">
          <input
            type="text"
            className="addtoTask"
            placeholder="Write Something....."
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />

          {update ? (
            <button className="addToTaskBtn" onClick={() => updatingTask()}>
              Update Task
            </button>
          ) : (
            <button className="addToTaskBtn" onClick={() => addTask()}>
              Add Task
            </button>
          )}
        </div>

        {/* This is Task Components */}
        <div className="todoList">
          <TodoList
            list={list}
            handleDelete={handleDelete}
            updateTask={updateTask}
            HandleTaskCompleted={HandleTaskCompleted}
            update={update}
          />
        </div>
      </div>
    </div>
  )
}

export default Todo
