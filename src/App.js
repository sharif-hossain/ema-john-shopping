import React from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './components/Header/Header';
import Shop from './components/Shop/Shop';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Review from './components/Review/Review';
import Manage from './components/Manage/Manage';
import NotFound from './components/NotFound/NotFound';
import Details from './components/Details/Details';
import Shipment from './components/Shipment/Shipment';
import Login from './components/Login/Login';
import { createContext } from 'react'; 
import { useState } from 'react';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';

export const UserContext = createContext();

function App() {
  const [loggedInUser,setLoggedInUser] = useState({});
  return (
    <UserContext.Provider value={[loggedInUser,setLoggedInUser]}>
      {/* <h2>Email : {loggedInUser.email}</h2> */}
      
      <Router>
      <Header></Header>
        <Switch>
          <Route path='/shop'>
           <Shop> </Shop>
          </Route>
          <Route path='/review'>
           <Review></Review>
          </Route>
          <Route path='/manage'>
            <Manage></Manage>
          </Route>
          <PrivateRoute path='/shipment'>
            <Shipment></Shipment>
          </PrivateRoute>
          <Route path='/login'>
            <Login></Login>
          </Route>
          <Route exact path='/'> 
            <Shop></Shop>
          </Route>
          <Route path='/product/:productKey'>
            <Details></Details>
          </Route>
          <Route path='*'>
            <NotFound></NotFound>
          </Route>
        </Switch>
      </Router>
      
      
    </UserContext.Provider>
  );
}

export default App;
