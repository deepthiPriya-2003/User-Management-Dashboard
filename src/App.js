import {Routes, Route} from "react-router-dom"

import './App.css';
import UserList from "./Components/UserList" 
import UserForm from "./Components/UserForm"


function App() {
  return (
    <>
    <Routes>
       <Route path="/" element={<UserList/>}></Route>
       <Route path="/addUser" element={<UserForm/>} ></Route>
        
        </Routes>
     </>
  )
}


export default App;

