import { useState } from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignIn from './pages/login';
import SignUp from './pages/signUp';

function App() {

  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<SignIn/>}></Route>
        <Route path='/register' element={<SignUp/>}></Route>
      </Routes>
      </BrowserRouter>
  )
}

export default App
