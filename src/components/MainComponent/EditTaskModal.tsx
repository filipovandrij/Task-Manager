import { useEffect, useState } from 'react'
import { Modal, Button, Form } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { editTask } from '../../redux/reducers/taskSlice'
import { Task } from '../../types/taskTypes'

type Props = {
    showEditModal: boolean
    onHide: () => void
    task: Task | undefined
}

function EditTaskModal({ showEditModal, onHide, task }: Props) {
    const [taskName, setTaskName] = useState<string | undefined>()
    const [taskDescription, setTaskDescription] = useState<string | undefined>()
    const [taskPriority, setTaskPriority] = useState<string | undefined>()

    useEffect(() => {
        setTaskName(task?.name)
        setTaskDescription(task?.description)
        setTaskPriority(task?.priority)
    }, [task])

    const dispatch = useDispatch()

    const handleEditTask = () => {
        dispatch(
            editTask({
                id: task?.id,
                name: taskName,
                description: taskDescription,
                priority: taskPriority,
            })
        )

        onHide()
    }

    return (
        <Modal show={showEditModal} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Редагувати завдання</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="taskName">
                        <Form.Label>Назва завдання</Form.Label>
                        <Form.Control
                            type="text"
                            value={taskName}
                            onChange={(e) => setTaskName(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group controlId="taskDescription">
                        <Form.Label>Опис завдання</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            value={taskDescription}
                            onChange={(e) => setTaskDescription(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group controlId="taskPriority">
                        <Form.Label>Пріоритет завдання</Form.Label>
                        <Form.Select
                            value={taskPriority}
                            onChange={(e) => setTaskPriority(e.target.value)}
                        >
                            <option value="Important">Important</option>
                            <option value="Medium Important">
                                Medium Important
                            </option>
                            <option value="Not Important">Not Important</option>
                        </Form.Select>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Закрити
                </Button>
                <Button variant="success" onClick={handleEditTask}>
                    Зберегти
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default EditTaskModal
