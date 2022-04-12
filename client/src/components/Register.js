import React, { useState } from "react";
import axios from 'axios'
import { Navigate } from "react-router";
import { store } from "../App";
import { Link } from "react-router-dom";
const Register = () => {
    const [data, setData] = useState({
        username: "",
        email: "",
        password: "",
        conformPassword: ""
    })
    const [loading, setLoading] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const changeHandler = e => {
        setData({ ...data, [e.target.name]: e.target.value })
    }
    const submitHandler = e => {
        e.preventDefault();
        axios.post('http://localhost:5000/register', data)
        .then(function(res){
alert(res.data) 
 

})

let a=2 
if(a===2){
    return <Navigate to='/login'/>
} 



    }

    return (
        <div className="d-flex justify-content-center">
            {/* <form onSubmit={submitHandler}>
                <h1 className="text-center">Registration Form</h1>
                <input type="text" onChange={changeHandler} name="username" placeholder="User Name" /><br /><br />
                <input type="email" onChange={changeHandler} name="email" placeholder="email" /><br /><br />
                <input type="password" onChange={changeHandler} name="password" placeholder="password" /><br /><br />
                <input type="password" onChange={changeHandler} name="conformpassword" placeholder="conform password" /><br /><br />
                <input className="" type="submit" value="Register" />
            </form> */}

            <div className="container-fluid">
      <div className="row no-gutter">
        <div className="d-flex justify-content-center col-md-12 col-lg-12 bg-image">
          <div className="col-md-6 col-lg-6 col-sm-12 col-xs-12">
            <div className="login d-flex align-items-center py-3">
              <div className="contain container py-5">
                <div className="row">
                  <div className="col-md-9 col-lg-9 col-sm-12 col-xs-12 mx-auto">
                    <h1 className="mb-3">Registration</h1>
                    <form onSubmit={submitHandler}>
                      <div className="form-group">
                        {/* <label htmlFor="username">Email</label> */}
                        <input
                          type="text"
                          className="form-control border mb-1"
                          id="username"
                          name="username"
                          placeholder="Username"
                          autoComplete="off"
                          value={data.username}
                          // required
                          onChange={changeHandler}
                          onFocus={() => setMessage("")}
                        />
                          <input
                          type="text"
                          className="form-control border"
                          id="email"
                          name="email"
                          placeholder="Email"
                          autoComplete="off"
                          value={data.email}
                          // required
                          onChange={changeHandler}
                          onFocus={() => setMessage("")}
                        />
                      </div>
                      <div className="form-group mb-2 mt-1">
                        {/* <label htmlFor="password">Password</label> */}
                        <input
                          type="password"
                          className="form-control border mb-1"
                          id="password"
                          name="password"
                          placeholder="Password"
                          value={data.password}
                          maxLength={16}
                          minLength={8}
                          // required
                          onChange={changeHandler}
                          onFocus={() => setMessage("")}
                        />
                              <input
                          type="password"
                          className="form-control border"
                          id="conformPassword"
                          name="conformPassword"
                          placeholder="conformPassword"
                          value={data.conformPassword}
                          maxLength={16}
                          minLength={8}
                          // required
                          onChange={changeHandler}
                          onFocus={() => setMessage("")}
                        />
                        <span className="error-message">{message}</span>
                      </div>
                      {!loading && (
                        <button className="btn btn-primary font-weight-bold text-uppercase w-100" type="submit">
                          Register
                        </button>
                      )}
                    </form>
                   
                    <p className="mb-1">Already have account <a href='/login'>Login Account</a></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

        </div>
    )
}
export default Register