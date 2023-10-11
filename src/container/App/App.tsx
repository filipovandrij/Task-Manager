import { useState } from 'react'
import Header from '../Header/Header'
import Main from '../Main/Main'

function App() {
    const [filter, setFilter] = useState<string | undefined>(undefined)
    return (
        <div className="App">
            <Header setFilter={setFilter} />
            <Main />
        </div>
    )
}

export default App
