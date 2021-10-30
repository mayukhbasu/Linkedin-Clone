import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from './features/userSlice';
import { auth } from './firebase';
import "./Login.css";


const Login = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [profilePic, setProfilePic] = useState('');
    const dispatch = useDispatch();

    const register = () => {
        if(!name){
            return alert("Please enter a full name");
        }
        auth
      .createUserWithEmailAndPassword(email, password)
      .then((userAuth) => {
        userAuth.user
          .updateProfile({
            displayName: name,
            photoURL: profilePic,
          })
          .then(() => {
            dispatch(
              login({
                email: userAuth.user.email,
                uid: userAuth.user.uid,
                displayName: name,
                photoUrl: profilePic,
              })
            );
          });
      })
      .catch((error) => alert(error));
    }

    const loginToApp = (e) => {
        e.preventDefault();
    }
    return (
        <div className="login">
            <img
                src="https://news.hitb.org/sites/default/files/styles/large/public/field/image/500px-LinkedIn_Logo.svg__1.png?itok=q_lR0Vks"
                alt=""
            />
        <form>
            <input value={name} onChange={e => setName(e.target.value)} type="text" placeholder="Full Name"/>
            <input value={profilePic} onChange={e => setProfilePic(e.target.value)} type="text" placeholder="Profile Picture URL"/>
            <input value={email} onChange={e => setEmail(e.target.value)} type="text" placeholder="Email"/>
            <input value={password} onChange={e => setPassword(e.target.value)} type="password" placeholder="Password"/>
            <button type="submit" onClick={loginToApp}>Sign In</button>
        </form>
        <p>Not a member? <span className="login__register" onClick={register}>Register Now</span></p>
        </div>
    );
};

export default Login;