import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <main className="app">
      <h1>AI Wrapper</h1>
      <p>A basic React + TypeScript app scaffolded with Vite.</p>
      <button onClick={() => setCount((c) => c + 1)}>count is {count}</button>
      <p className="hint">
        Edit <code>src/App.tsx</code> and save to test HMR.
      </p>
    </main>
  )
}

export default App
