import React, {useRef, useState} from 'react'
import {FilterValuesType, TaskType} from "./App";
import {Button} from "./Button";


type TodolistPropsType = {
    title: string
    // subTitle: string
    // description: string
    tasks: Array<TaskType>
    removeTask: (taskId: string) => void // void обозначает отсутстиве return в TS
    addTask: (title: string) =>void
    // changeFilter: (filter: FilterValuesType) => void
}

export function Todolist(
    {
        tasks,
        title,
        addTask,
        removeTask,
        // changeFilter
    }: TodolistPropsType) {

    // const tasks =props.tasks
    // const title =props.title

    // const {tasks, title} = props

    //UI logic

    const [filter,setFilter] = useState<FilterValuesType >("all")

    const  changeFilter = (filter: FilterValuesType) => {
        setFilter(filter)
    }

    const getFilteredTasks =
        (allTasks: Array<TaskType>, filterValue: FilterValuesType ): Array<TaskType> => {
            if(filterValue === "active") {
                return allTasks.filter(t => t.isDone === false)
            } else if(filterValue === "completed"){
                return allTasks.filter(t => t.isDone === true)
            } else {
                return allTasks
            }
        }

    const filteredTasks: Array<TaskType> = getFilteredTasks(tasks, filter)

    const taskInputRef = useRef<HTMLInputElement>(null)
    const addTaskHandler = ()=>{
        if (taskInputRef.current){
            addTask(taskInputRef.current.value)
            taskInputRef.current.value = ""
        }
    }


    const taskslist: JSX.Element =filteredTasks.length === 0
        ? <span>Your taskslist is empty</span>
        : <ul>
            {
                filteredTasks.map(task => {
                    return (
                        <li>
                            <input type="checkbox" checked={task.isDone}/>
                            <span>{task.title}</span>
                            <Button title="x" onClickHandler={() => removeTask(task.id)}/>
                            {/*/() => необходима, как синтаксическая конструкция, чтобы предохранять вызов alert от преждевременного срабатывания*/}
                        </li>
                    )
                })
            }
        </ul>


    return (
        <div className="todolist">
            <h3>{title}</h3>
            <div>
                <input ref={taskInputRef}/>
                <Button title={"+"} onClickHandler={addTaskHandler }/>
            </div>
            {taskslist}
            <div>
                <Button title="All" onClickHandler={() => changeFilter("all")}/>
                <Button title="Activel" onClickHandler={() => changeFilter("active")}/>
                <Button title="Completed" onClickHandler={() => changeFilter("completed")}/>
            </div>
        </div>
    )
}