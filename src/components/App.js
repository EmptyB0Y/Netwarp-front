import {Login} from './Login'
import {Home} from './Home'
import { Signup } from './Signup'
import { Banner } from './Banner'
import {BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";

function App() {

  let mainComponent = <Route path="/" element={<Navigate to="/login" />} />
  if(sessionStorage.getItem('token') !== null){
    mainComponent = <Route path="/" element={<Navigate to="/home" />} />
  }
  return(
  <div>
  <Router>
      <Banner />
      <Routes>
          {mainComponent}
          <Route path="/login" element={ <Login />}></Route>
          <Route path="/signup" element={ <Signup /> }></Route>
          <Route path="/home" element={ <Home />}></Route>
      </Routes>
  </Router> 
  </div> 
  )
}

export default App;
