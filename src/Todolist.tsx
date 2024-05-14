import React, {useState, KeyboardEvent, ChangeEvent} from 'react'
import {FilterValuesType, TaskType} from "./App";
import {Button} from "./Button";


type TodolistPropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string) => void // void обозначает отсутстиве return в TS
    addTask: (title: string) => void,
    changeTaskStatus: (taskId: string, newIsDoneValue: boolean) => void
}

export function Todolist(
    {
        tasks,
        title,
        addTask,
        removeTask,
        changeTaskStatus
    }: TodolistPropsType) {


    //UI logic

    const [filter, setFilter] = useState<FilterValuesType>("all")
    const [taskTitle, setTaskTitle] = useState("")
    const [error, setError] = useState<string | null>(null)

    const changeFilter = (filter: FilterValuesType) => {
        setFilter(filter)
    }

    const getFilteredTasks =
        (allTasks: Array<TaskType>, filterValue: FilterValuesType): Array<TaskType> => {
            if (filterValue === "active") {
                return allTasks.filter(t => t.isDone === false)
            } else if (filterValue === "completed") {
                return allTasks.filter(t => t.isDone === true)
            } else {
                return allTasks
            }
        }

    const filteredTasks: Array<TaskType> = getFilteredTasks(tasks, filter)


    const addTaskHandler = () => {
        const trimmedTaskTitle = taskTitle.trim()
        if(trimmedTaskTitle !== ''){
            addTask(taskTitle)
        }
        else{
            setError("Title is required")
        }
        setTaskTitle("")
    }  // addTaskHandler -ф-я, которая отвечает за добавление таски

    // const addTaskOnkeyUpHandler = taskTitle.length === 0
    // ? undefined
    //     : (e: KeyboardEvent<HTMLInputElement>) => {
    //         if(e.key === "Enter"){
    //             addTaskHandler()
    //         }
    //     }
    const addTaskOnKeyUpHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && taskTitle) {
            addTaskHandler()
        }
    }

    const changeTaskTitleHandler = (e: ChangeEvent<HTMLInputElement>) => setTaskTitle(e.currentTarget.value)

    const isAddBTNDisabled = taskTitle.length === 0 || taskTitle.trim().length >= 15

    const tasksList: JSX.Element = filteredTasks.length === 0
        ? <span>Your tasksList is empty</span>
        : <ul>
            {
                filteredTasks.map(task => {
                    const removeTaskHandler = () => removeTask(task.id)
                    const changeTaskStatusHandler =
                        (e: ChangeEvent<HTMLInputElement>) => changeTaskStatus(task.id, e.currentTarget.checked)

                    return (
                        <li>
                            <input
                                type="checkbox"
                                checked={task.isDone}
                                onChange={changeTaskStatusHandler}
                            />
                            <span className={task.isDone ? "task-done" : "task"}>{task.title}</span>
                            <Button title="x" onClickHandler={() => removeTaskHandler}/>
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
                <input
                    value={taskTitle}
                    onChange={changeTaskTitleHandler}
                    onKeyUp={addTaskOnKeyUpHandler}
                    className = {error ? "task-input-error": ""}
                />
                <Button
                    title={"+"}
                    onClickHandler={addTaskHandler}
                    disabled={isAddBTNDisabled}
                />
                {error && <div style={{color:"red"}}>{error}</div>}
                {taskTitle.trim().length > 10 && taskTitle.length < 15 && <div>Recommended task length 10 charters</div>}

                {taskTitle.trim().length >= 15 && <div style={{color:"red"}}>Title is too long</div>}
            </div>
            {tasksList}
            <div>
                <Button
                    title="All"
                    onClickHandler={() => changeFilter("all")}
                    classes={filter === "all" ? "btn-filter-active" : ""}
                />
                <Button
                    title="Activel"
                    onClickHandler={() => changeFilter("active")}
                    classes={filter === "active" ? "btn-filter-active" : ""}
                />
                <Button
                    title="Completed"
                    onClickHandler={() => changeFilter("completed")}
                    classes={filter === "completed" ? "btn-filter-active" : ""}
                />
            </div>
        </div>
    )
}