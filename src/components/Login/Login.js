import React, { useState } from 'react';
import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import { useContext } from 'react';
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router-dom';

firebase.initializeApp(firebaseConfig);


function Login() {
  const [newUser, setNewUser] = useState(false)

  const [user, setUser] = useState({
    isSignedIn: false,
    name:'',
    email:'',
    password:'',
    photo:'',
    
  })

  const [loggedInUser,setLoggedInUser] = useContext(UserContext);
  let history = useHistory();
  let location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };
  var provider = new firebase.auth.GoogleAuthProvider();
  const handleSignIn = () =>{
    firebase.auth().signInWithPopup(provider)
    .then(res =>{
      const {displayName, email, photoURL} = res.user;
      const signInUser = {
        isSignedIn:true,
        name:displayName,
        email:email,
        photo:photoURL
      }
      setUser(signInUser);
      console.log(displayName, email, photoURL);
    })
    .catch(error =>{
      console.log(error);
      console.log(error.message);
    })
  }

 const handleSignOut= ()=>{
  firebase.auth().signOut()
  .then(res =>{
    const signedOut ={
      isSignedIn: false,
    name:'',
    email:'',
    photo:'',
    error:'',
    success:false
    }
    setUser(signedOut);
  })
 }

 const handleEmail = (e) =>{
   let isValidForm = true;
    if(e.target.name ==='email'){
      isValidForm  = /\S+@\S+\.\S+/.test(e.target.value);
      
    }
    if(e.target.name === 'password'){
      isValidForm  = (e.target.value.length >6) && (/(?=.*?[0-9])/.test(e.target.value));
      
    }
    if(isValidForm){
      const newUser = {...user}; 
      newUser[e.target.name] = e.target.value;
      setUser(newUser);
    }
 }
  // .catch(function(error) {
  //   // An error happened.
  // });

  const handleSubmit= (e) =>{
    console.log('submit clicked')

    if(newUser&& user.email && user.password){
      firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
      .then(res =>{
        const newUserInfo = {...user}
        newUserInfo.error = ''
        newUserInfo.success = true;
        setUser(newUserInfo);
        console.log(res);
        updateName(user.name)
      })
      .catch(error=> {
      // Handle Errors here.
      const newErrorInfo = {...user}
      newErrorInfo.success = false;
      newErrorInfo.error = error.message;
        
      setUser(newErrorInfo)
      updateName(user.name)
        // var errorCode = error.code;
        // var errorMessage = error.message;
        // console.log(errorCode, errorMessage)
        // ...
      });
    }

   if(!newUser && user.email && user.password){
    firebase.auth().signInWithEmailAndPassword(user.email, user.password)
    .then(res =>{
      const newUserInfo = {...user}
        newUserInfo.error = ''
        newUserInfo.success = true;
        setUser(newUserInfo);
        setLoggedInUser(newUserInfo);
        history.replace(from);
        console.log('sign in user info',res.user);
    })
    .catch(function(error) {
      const newErrorInfo = {...user}
      newErrorInfo.success = false;
      newErrorInfo.error = error.message;
        
      setUser(newErrorInfo)
      // Handle Errors here.
      // var errorCode = error.code;
      // var errorMessage = error.message;
      // ...
    });
   }

    e.preventDefault();
  }
  const updateName = (name) =>{
    var user = firebase.auth().currentUser;

    user.updateProfile({
      displayName: name
    }).then(function() {
      console.log('user name updated successfully ')
    }).catch(function(error) {
      console.log(error)
    });
  }

  return (
    <div style={{textAlign:'center'}}>
      {user.isSignedIn ? <button onClick={handleSignOut}>Sign out</button> :
        <button onClick={handleSignIn}>Sign In</button>
      }
      {
        user.isSignedIn && <div>
          <p>Welcome {user.name}</p>
      <p>Email : {user.email}</p>
      <img src={user.photo} alt=""/>
        </div>
      }
      <br/>
      <br/>
      <h1>User input form : </h1>
    {/* <p>Name : {user.name}</p>
    <p>Email: {user.email}</p>
    <p>password :{user.password}</p> */}
      <form onSubmit={handleSubmit} action="">
        <input onChange={()=>setNewUser(!newUser)} type="checkbox" name="newUser" id=""/>
        <label htmlFor="newUser">Create new user</label>
        <br/>
        {newUser && <input type="text" onBlur={handleEmail} name="name" placeholder='enter your name' id=""/>}
        <br/>
        <br/>
        <input type="text" onBlur={handleEmail} name="email" placeholder = 'enter email' id="" required/>
        <br/>
        <br/>
        <input type="password" onBlur={handleEmail} name="password" placeholder='enter password' id="" required/>
        <br/>
        <br/>
        <input  type="submit" value={newUser?'sign up': 'sign in'}/>
      </form>
    <p style={{color:'red'}}>{user.error}</p>
    {
       user.success && <p style={{color:'green'}}>User {newUser ? 'created ' : 'logged in '}successfully</p>
    }
    </div>
  );
}

export default Login;
