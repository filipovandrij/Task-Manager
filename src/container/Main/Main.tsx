import TaskList from '../../components/MainComponent/TaskList'

type Props = {
    filter: string | undefined | boolean
}

const Main = ({ filter }: Props) => {
    return (
        <main>
            <TaskList filter={filter} />
        </main>
    )
}

export default Main
