import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Home } from './pages/Home'
import { CoursePage } from './pages/CoursePage'

function NotFound() {
  return (
    <div className="text-center py-20 text-muted">
      <div className="text-5xl mb-4">🤔</div>
      <h2 className="text-xl font-bold text-primary mb-2">Page not found</h2>
      <a href="/" className="text-accent no-underline font-semibold">&larr; Back to home</a>
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/course/:courseId" element={<CoursePage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}
