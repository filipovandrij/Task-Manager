import { createSlice } from '@reduxjs/toolkit'
import { Task } from '../../types/taskTypes'

const initialState: Task[] = []

const taskSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        addTask: (state, action) => {
            state.push(action.payload)
        },
        editTask: (state, action) => {
            const taskToEdit = state.find(
                (task) => task.id === action.payload.id
            )
            if (taskToEdit) {
                taskToEdit.name = action.payload.name
                taskToEdit.description = action.payload.description
                taskToEdit.priority = action.payload.priority
            }
        },
        deleteTask: (state, action) => {
            return state.filter((task) => task.id !== action.payload)
        },
        toggleTaskStatus: (state, action) => {
            const taskToToggle = state.find(
                (task) => task.id === action.payload.id
            )
            if (taskToToggle) {
                taskToToggle.completed = !taskToToggle.completed
            }
        },
    },
})

export const { addTask, editTask, deleteTask, toggleTaskStatus } =
    taskSlice.actions
export default taskSlice.reducer
