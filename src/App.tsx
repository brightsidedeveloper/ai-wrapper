import { Routes, Route } from 'react-router-dom'
import NavBar from './components/NavBar'
import { routes } from './routes'
import './App.css'

export default function App() {
  return (
    <div className="layout">
      <NavBar />
      <main className="content">
        <Routes>
          {routes.map(({ path, element: Element }) => (
            <Route key={path} path={path} element={<Element />} />
          ))}
        </Routes>
      </main>
    </div>
  )
}
