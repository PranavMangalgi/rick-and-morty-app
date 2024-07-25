import Navbar from './components/Navbar/Navbar'
import CharacterList from './components/CharacterList/CharacterList'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import CharacterProfile from './components/CharacterProfile/CharacterProfile'
import Error from './components/Error/Error'

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<CharacterList />} />
        <Route path="character">
          <Route path=":id" element={<CharacterProfile />} />
          <Route path="*" element={<Error />} />
        </Route>
        <Route path="*" element={<Error />} />
      </Routes>
    </>
  )
}

export default App
