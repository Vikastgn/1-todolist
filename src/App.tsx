import React, {useState} from 'react'
import './App.css'
import { Todolist } from './Todolist'

export type TaskType ={
    id: number
    title: string
    isDone: boolean
}

export type FilterValuesType = "all" | "active" | "completed"
function App() {
    // Data
    const todolistTitle_1: string = "What to learn"
    // const todolistTitle_2: string = "Songs"
    // const todolistTitle_3: string = "Books"

    const [tasks, setTasks] = React.useState([
                 {id: 1, title: "HTML", isDone: true},
                 {id: 2, title: "JS/TS", isDone: true},
                 {id: 3, title: "React", isDone: false}
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



    const removeTask = (taskId: number) => {
        const nextState: any =  []
        for (let i = 0; i < tasks.length; i++) {
             if(tasks[i].id !== taskId) {
                 nextState.push(tasks[i])
             }
        }
        setTasks((nextState))
    }



    //UI
    return (
        <div className="App">
            <Todolist
                title={todolistTitle_1}
                tasks={tasks}
                removeTask ={removeTask}/>



            {/*// changeFilter={changeFilter}/>*/}
            {/*<Todolist title={todolistTitle_2} />*/}
            {/*<Todolist title={todolistTitle_3} />*/}
        </div>
    )
}

export default App