import {Login} from './Login'
import {Home} from './Home'

function App() {
  if(sessionStorage.getItem('token') === null){
    return (
      <div className="App">
        <Login />
      </div>
    );
  }
  else{
    return (
      <div className="App">
        <Home />
      </div>
    );
  }

}

export default App;
