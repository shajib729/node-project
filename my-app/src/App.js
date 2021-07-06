import './App.css';
import React,{createContext, useReducer} from 'react';
import { Route, Switch } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar'
import Home from './components/Home/Home'
import About from './components/About/About'
import Contact from './components/Contact/Contact'
import Signup from './components/Signup/Signup'
import Login from './components/Login/Login'
import Error from './components/Error/Error'
import Logout from './components/Logout/Logout'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import {initialState,reducer} from './reducer/Reducecer'

export const UserContext = createContext()

const Routing=()=> {
  return (
    <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/about" component={About} />
        <Route path="/contact" component={Contact} />
        <Route path="/signup" component={Signup} />
        <Route path="/login" component={Login} />
        <Route path="/logout" component={Logout} />
        <Route component={Error} />
      </Switch>
  )
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState)
  
  return (
      
    <div className="App">
      <UserContext.Provider value={{state,dispatch}}>
        
      <Navbar/>
      <Routing/>
      
    </UserContext.Provider>
      
    </div>
  );
}

export default App;
