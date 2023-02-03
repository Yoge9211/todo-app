import React, { useEffect } from 'react'
import { AiFillEdit, AiFillDelete } from 'react-icons/ai'
import { IconContext } from 'react-icons'
const Tasks = (props) => {
  const { list, handleDelete, updateTask, update, HandleTaskCompleted } = props

  // This function is to do delete Tasks
  const Delete = (id) => {
    fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
      method: 'DELETE',
    })
      .then((res) => {
        return res.json()
      })
      .then((data) => {
        const afterFilter = list.filter((item, ind) => {
          return ind + 1 !== id
        })
        handleDelete(afterFilter)
      })
  }

  // Edit the task function
  const editT = (id) => {
    list.map((item, ind) => {
      if (ind + 1 === id) {
        updateTask(item.title, ind + 1)
      }
    })
  }

  //  Change status of checkbox
  const markAsCompleted = (id) => {
    list.map((item, ind) => {
      if (ind + 1 === id) {
        HandleTaskCompleted(item, ind + 1)
      }
      return item
    })
  }

  return (
    <div className="todoListcontainer">
      {list.map((item, ind) => {
        return (
          <div className="todo-list" key={ind}>
            <div className="title">
              {item.completed ? (
                <h3 style={{ color: 'white', textDecoration: 'line-through' }}>
                  {item.title}
                </h3>
              ) : (
                <h3 style={{ color: '#121e52' }}>{item.title}</h3>
              )}
            </div>
            <div className="icons">
              {update ? (
                ''
              ) : (
                <>
                  <IconContext.Provider value={{ color: 'white' }}>
                    <AiFillEdit
                      className="edit-btn"
                      onClick={() => editT(ind + 1)}
                    />
                  </IconContext.Provider>
                </>
              )}
              <input
                type="checkbox"
                checked={item.completed}
                onChange={() => markAsCompleted(ind + 1)}
              />
              <IconContext.Provider value={{ color: 'red' }}>
                <AiFillDelete onClick={() => Delete(ind + 1)} />
              </IconContext.Provider>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default Tasks
