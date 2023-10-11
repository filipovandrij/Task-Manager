import { useEffect, useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { Task } from '../../types/taskTypes'

type Props = {
    showModal: boolean
    onHide: () => void
    addTask: (task: Task) => void
}

const AddTaskModal = ({ showModal, onHide, addTask }: Props) => {
    const [taskName, setTaskName] = useState<string>('')
    const [taskDescription, setTaskDescription] = useState<string>('')
    const [taskPriority, setTaskPriority] = useState<string>('1')
    const [isFormValid, setIsFormValid] = useState(false)

    const validateForm = () => {
        const isValid =
            taskName.trim() !== '' &&
            taskDescription.trim() !== '' &&
            taskPriority !== '1'
        setIsFormValid(isValid)
    }

    useEffect(() => {
        validateForm()
    }, [taskName, taskDescription, taskPriority])
    const handleSubmit = () => {
        if (isFormValid) {
            addTask({
                id: new Date().toISOString(),
                name: taskName,
                description: taskDescription,
                priority: taskPriority,
                completed: false,
            })

            setTaskName('')
            setTaskDescription('')
            setTaskPriority('1')
            onHide()
        }
    }

    const handleClose = () => {
        setTaskName('')
        setTaskDescription('')
        setTaskPriority('1')
        onHide()
    }

    return (
        <Modal show={showModal} onHide={onHide}>
            <Modal.Header>
                <Modal.Title>Додати завдання</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="taskName">
                        <Form.Label>Назва завдання</Form.Label>
                        <Form.Control
                            type="text"
                            value={taskName}
                            onChange={(e) => {
                                setTaskName(e.target.value)
                            }}
                        />
                    </Form.Group>

                    <Form.Group controlId="taskDescription">
                        <Form.Label>Опис завдання</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            value={taskDescription}
                            onChange={(e) => {
                                setTaskDescription(e.target.value)
                            }}
                        />
                    </Form.Group>

                    <Form.Group controlId="taskPriority">
                        <Form.Label>Пріоритет завдання</Form.Label>
                        <Form.Select
                            value={taskPriority}
                            onChange={(e) => {
                                setTaskPriority(e.target.value)
                            }}
                        >
                            <option value="1" disabled>
                                Тисни та оберай
                            </option>
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
                <Button variant="secondary" onClick={handleClose}>
                    Закрити
                </Button>
                {isFormValid ? (
                    <Button
                        variant="success"
                        onClick={handleSubmit}
                        disabled={!isFormValid}
                    >
                        Готово
                    </Button>
                ) : null}
            </Modal.Footer>
        </Modal>
    )
}

export default AddTaskModal
