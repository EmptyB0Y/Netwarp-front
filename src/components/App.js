import {Login} from './Login'
import {Home} from './Home'
import { Signup } from './Signup'
import { Banner } from './Banner'
import { Profile } from './Profile'
import { TopicSelector } from './TopicSelector'
import { FocusPost } from './FocusPost'
import { Footer } from './Footer'
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
          <Route path="/signup/:admin" element={ <Signup /> }></Route>
          <Route path="/home/:topicDefault" element={ <Home />}></Route>
          <Route path="/profile/:id" element={ <Profile /> }></Route>
          <Route path="/focus-post/:id" element={ <FocusPost /> }></Route>
          <Route path="/topics" element={ <TopicSelector /> }></Route>
      </Routes>
      <Footer />
  </Router> 
  </div> 
  )
}

export default App;
