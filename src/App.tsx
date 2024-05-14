import React, {useState} from 'react'
import './App.css'
import {Todolist} from './Todolist'
import {v1} from "uuid";
import {isSymbolObject} from "util/types";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
//C
// R
// U - change task title, status
// D
export type FilterValuesType = "all" | "active" | "completed"

function App() {

    //BLL
    // Data
    const todolistTitle_1: string = "What to learn"
    // const todolistTitle_2: string = "Songs"
    // const todolistTitle_3: string = "Books"

    const [tasks, setTasks] = React.useState([
        {id: v1(), title: "HTML", isDone: true},
        {id: v1(), title: "JS/TS", isDone: true},
        {id: v1(), title: "React", isDone: false}
    ])
    // // change logic
    // const removeTask = (taskId: number) => {
    //     const nextState =  tasks.filter(t=> t.id !== taskId)
    //     setTasks((nextState))
    // }

    //
    // const removeTask = (taskId: number) => {
    //     tasks.pop() не получится через метод pop, так как через метод pop не создается нового массива, а мутирует старый, то есть ссылка на объект остается той же
    //     setTasks(tasks)
    // }


    //
    // const removeTask = (taskId: number) => {
    //     const copyTasks = [...tasks]
    //     copyTasks.pop()
    //     setTasks(copyTasks)
    // }
    //


    const removeTask = (taskId: string) => {
        const nextState: any = []
        for (let i = 0; i < tasks.length; i++) {
            if (tasks[i].id !== taskId) {
                nextState.push(tasks[i])
            }
        }
        setTasks((nextState))
    }


    const addTask = (title: string) => {
        const newTask: TaskType = {
            id: v1(),
            title: title,
            isDone: false
        }
        const nextTasksState = [newTask, ...tasks]
        setTasks(nextTasksState)
    }

    //update

    const changeTaskStatus = (taskId: string, newIsDoneValue: boolean) => {
        // const taskForUpDate: TaskType | undefined = tasks.find(t => t.id === taskId)
        // if(taskForUpDate !== undefined) {
        //     taskForUpDate.isDone = !taskForUpDate.isDone
        // }
        //
        // setTasks([...tasks])

        const nextState: Array<TaskType> = tasks.map(t => t.id === taskId ? {...t, isDone: newIsDoneValue} : t)
            setTasks(nextState)
    }

    //UI
    return (
        <div className="App">
            <Todolist
                title={todolistTitle_1}
                tasks={tasks}
                addTask={addTask}
                removeTask={removeTask}
                changeTaskStatus={changeTaskStatus}
                />


            {/*// changeFilter={changeFilter}/>*/}
            {/*<Todolist title={todolistTitle_2} />*/}
            {/*<Todolist title={todolistTitle_3} />*/}
        </div>
    )
}

export default App