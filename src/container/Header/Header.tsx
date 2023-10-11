import Navbar from 'react-bootstrap/Navbar'
import Button from 'react-bootstrap/Button'
import './Header.scss'
import { useState } from 'react'
import { addTask } from '../../redux/reducers/taskSlice'
import { useAppDispatch } from '../../redux/hooks'
import AddTaskModal from '../../components/HeadeComponent/AddTaskModal'

type Props = {
    setFilter: React.Dispatch<React.SetStateAction<string | undefined>>
}

const Header = ({ setFilter }: Props) => {
    const [showModal, setShowModal] = useState<boolean>(false)
    const dispatch = useAppDispatch()

    const handleAddTask = (task: any) => {
        dispatch(addTask(task))
    }

    return (
        <>
            <Navbar bg="dark" variant="dark">
                <Navbar.Collapse
                    style={{ margin: '0 12px' }}
                    className="justify-content-between"
                >
                    <div className="description_priority_box">
                        <Button
                            variant="danger"
                            className="priority_marker"
                            onClick={() => setFilter('Important')}
                        >
                            <span className="marker_text">Важливі</span>
                        </Button>
                        <Button
                            variant="warning"
                            className="priority_marker"
                            onClick={() => setFilter('Medium Important')}
                        >
                            <span className="marker_text">Трохи важливі</span>
                        </Button>
                        <Button
                            variant="secondary"
                            className="priority_marker"
                            onClick={() => setFilter('Not Important')}
                        >
                            <span className="marker_text">Не важливі</span>
                        </Button>
                        <Button
                            className="priority_marker"
                            variant="success"
                            onClick={() => setFilter(undefined)}
                        >
                            <span className="marker_text">УСІ</span>
                        </Button>
                    </div>
                    <Button
                        variant="success"
                        onClick={() => setShowModal(true)}
                    >
                        Додати завдання
                    </Button>
                </Navbar.Collapse>
            </Navbar>
            <AddTaskModal
                showModal={showModal}
                onHide={() => setShowModal(false)}
                addTask={handleAddTask}
            />
        </>
    )
}

export default Header
