import { useState } from 'react'
import Header from '../Header/Header'
import Main from '../Main/Main'

function App() {
    const [filter, setFilter] = useState<string | undefined | boolean>(
        undefined
    )
    return (
        <div className="App">
            <Header setFilter={setFilter} />
            <Main filter={filter} />
        </div>
    )
}

export default App
