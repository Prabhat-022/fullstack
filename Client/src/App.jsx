import { BrowserRouter, Routes, Route } from "react-router-dom";
import Singup from './view/Singup';


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Singup/>}>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
