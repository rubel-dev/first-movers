import React, { createContext, useState } from 'react';
import Home from './components/Home/Home';
import Destination from './components/Destination/Destination';
import NotFound from './components/NotFound/NotFound';
import {  
  BrowserRouter as Router,
  Switch,
  Route,
   
} from "react-router-dom";
import Login from './components/Login/Login'; 
import PrivateRoute from './components/PrivateRoute/PrivateRoute';

export const UserContext = createContext()
const App = () => {
   const [user, setUser] = useState({
      name:"",
      email:"",
      password:''
   }) 
  return (
     <UserContext.Provider value ={[user, setUser]}>
      <Router>  
         <Switch>
            <Route path ='/home'>
               <Home></Home>
            </Route>
            <Route exact path ='/'>
               <Home></Home>
            </Route>
            
            <PrivateRoute path='/transportType/:type'>
               <Destination></Destination>
            </PrivateRoute>
            <Route path='/login'>
               <Login></Login>
            </Route>
            <Route path ='*'>
               <NotFound></NotFound>
            </Route>
         </Switch>
      </Router>
    </UserContext.Provider>
  );
};

export default App;