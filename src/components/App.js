import {Login} from './Login'
import {Home} from './Home'
import { Signup } from './Signup'
import { Navbar } from './Navbar'
import { Profile } from './Profile'
import { TopicSelector } from './TopicSelector'
import { FocusPost } from './FocusPost'
import { FocusComment } from './FocusComment'
import { Footer } from './Footer'
import { Settings } from './Settings'
import {BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";
import DocumentMeta from 'react-document-meta';

function App() {

  let mainComponent = <Route path="/" element={<Navigate to="/login" />} />
  if(sessionStorage.getItem('token') !== null){
    mainComponent = <Route path="/" element={<Navigate to="/home/general" />} />
  }
  const meta = {
    meta: {
        httpEquiv:"Content-Security-Policy",
        content:"upgrade-insecure-requests"
    }
  }

  return(
  <div>
    <DocumentMeta {...meta} />

  <Router>
      <Navbar />
      <div id="wrapper">
      <Routes>
          {mainComponent}
          <Route path="/login" element={ <Login />}></Route>
          <Route path="/signup/:admin" element={ <Signup /> }></Route>
          <Route path="/home/:topicDefault" element={ <Home />}></Route>
          <Route path="/profile/:id" element={ <Profile /> }></Route>
          <Route path="/focus-post/:id" element={ <FocusPost /> }></Route>
          <Route path="/focus-comment/:id" element={ <FocusComment /> }></Route>
          <Route path="/topics" element={ <TopicSelector /> }></Route>
          <Route path="/settings" element={ <Settings />}></Route>
      </Routes>
      <Footer />
      </div>
  </Router> 
  </div> 
  )
}

export default App;
