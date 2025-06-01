import '../public/scss/style.scss'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        {/* Add more routes here as needed */}
        {/* Something BrowserRouter can import here */}
        {/* Example: <Route path="/about" element={<AboutPage />} /> */}
      </Routes>
    </BrowserRouter>
  )
}

export default App
