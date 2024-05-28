import { useState } from 'react';
import './App.css';
import Login from './components/Login';

// import Todos from './components/Todos';
function App() {

  // const [loggedIn,setLoggedIn] = useState(false);
  const [,]= useState();
  return (
      <div className="">
        {/* {loggedIn ? <Todos/>: <Login setLoggedIn={setLoggedIn}/>} */}
        <Login/>
      </div>
  );
}

export default App;
