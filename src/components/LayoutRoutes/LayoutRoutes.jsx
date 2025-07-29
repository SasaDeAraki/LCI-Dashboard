import "./LayoutRoutes.css"

import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import App from "../../App.jsx"
import CharacterPage from "../CharacterPage/CharacterPage.jsx"

export default function LayoutRoutes() {
  const location = useLocation()

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<App />} />
        <Route path="/:characterId" element={<CharacterPage />} />
      </Routes>
    </AnimatePresence>
  )
}
