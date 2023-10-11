import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import './TaskList.scss'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { deleteTask, toggleTaskStatus } from '../../redux/reducers/taskSlice'
import EditTaskModal from './EditTaskModal'
import { useEffect, useState } from 'react'
import { Task } from '../../types/taskTypes'

type Props = {
    filter: string | undefined | boolean
}

const TaskList = ({ filter }: Props) => {
    const [showEditModal, setShowEditModal] = useState<boolean>(false)
    const [selectedTask, setSelectedTask] = useState<Task | undefined>()
    const tasks = useAppSelector((state) => state.tasks)

    const dispatch = useAppDispatch()

    const handleToggleStatus = (taskId: string) => {
        dispatch(toggleTaskStatus({ id: taskId }))
    }

    const handleDeleteTask = (taskId: string) => {
        dispatch(deleteTask(taskId))
    }

    const handleEditClick = (task: Task) => {
        setSelectedTask(task)
        setShowEditModal(true)
    }

    const handleCloseEditModal = () => {
        setSelectedTask(undefined)
        setShowEditModal(false)
    }
    const [filteredTasks, setFilteredTasks] = useState<Task[]>([])

    const choseFilter = () => {
        let filtered = tasks

        if (filter === true || filter === false) {
            filtered = filtered.filter((task) => task.completed === filter)
        }

        if (
            filter === 'Important' ||
            filter === 'Medium Important' ||
            filter === 'Not Important'
        ) {
            filtered = filtered.filter((task) => task.priority === filter)
        }

        setFilteredTasks(filtered)
    }
    useEffect(() => {
        choseFilter()
    }, [tasks, filter])
    return (
        <div>
            <ul className="task_list">
                {filteredTasks.map((task) => (
                    <li key={task.id}>
                        <Card bg="dark" text="light" style={{ width: '25rem' }}>
                            <Card.Body>
                                <Card.Title className="d-flex justify-content-between align-items-center">
                                    <h4>{task.name}</h4>
                                    <Button
                                        variant={
                                            task.priority === 'Not Important'
                                                ? 'secondary'
                                                : task.priority === 'Important'
                                                ? 'danger'
                                                : 'warning'
                                        }
                                        className="priority_marker"
                                    ></Button>
                                </Card.Title>
                                <Card.Text>{task.description}</Card.Text>
                                <div className="control_panel">
                                    <Button
                                        variant="primary"
                                        onClick={() => handleEditClick(task)}
                                    >
                                        Редагувати
                                    </Button>
                                    <Form.Check
                                        type="checkbox"
                                        className="complete_task"
                                        defaultChecked={task.completed}
                                        onClick={() =>
                                            handleToggleStatus(task.id)
                                        }
                                    />
                                    <Button
                                        variant="danger"
                                        onClick={() =>
                                            handleDeleteTask(task.id)
                                        }
                                    >
                                        Видалити
                                    </Button>
                                </div>
                            </Card.Body>
                        </Card>
                    </li>
                ))}
            </ul>
            <EditTaskModal
                showEditModal={showEditModal}
                onHide={handleCloseEditModal}
                task={selectedTask}
            />
        </div>
    )
}

export default TaskList
