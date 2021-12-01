import React from 'react';
import{Route, Switch, BrowserRouter} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import{appSelector, authSuccess} from "./store/appReducer/appReducer"
import { useEffect } from 'react';
import {Loader} from "./components/Loader"
import Navigation from "./components/Navigation";
import Home from './components/Home';
import Footer from './components/Footer';
import Login from './components/Login';
import Registration from './components/Registration';
import UserData from './components/UserData';
import UserPage from './components/userPage/UserPage';
import FindingFriends from './components/FindingFriends';
import Entertainment from './components/Entertainment';
import Pediatricians from './components/Pediatricians';
import Exchange from './components/Exchange';
import Chat from './components/Chat';
import { getUserAction, userSelector } from './store/userReducer/userReducer';
import './App.css';

function App() {

  const isLoading = useSelector(appSelector).isLoading;
  const dispatch = useDispatch()

  const auth = useSelector(appSelector).auth;
  useEffect(()=>{
    dispatch(authSuccess())
  }, [dispatch])

  const user = useSelector(userSelector);
  const user_id = localStorage.getItem("USER_ID");

  useEffect(()=>{
    dispatch(getUserAction(user_id))
  }, [dispatch, user_id])

  return (
    <>
      <BrowserRouter>
        <Navigation auth={auth} user={user}/>
          <Switch>
            <Route path="/" exact>
              <Home auth={auth}/>
            </Route>   
            <Route path="/login"> 
              <Login auth={auth}/>
            </Route>
            <Route path="/registration" exact>
              <Registration auth={auth}/>
            </Route>
            <Route path="/registration/us_data" component={UserData}/>
            <Route path="/us_page/:id">
              <UserPage user={user}/>
            </Route>   
            <Route path="/finding_friends" component={FindingFriends}/>
            <Route path="/entertainment" component={Entertainment}/>
            <Route path ="/pediatricians" component={Pediatricians}/>
            <Route path="/exchange" component={Exchange}/>
            <Route path="/chat" component={Chat}/>
            {isLoading && <Loader/>}
          </Switch>
        <Footer/>
      </BrowserRouter>  
    </>
  );
}

export default App;
