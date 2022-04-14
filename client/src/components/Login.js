import React,{useState,useContext} from "react";
import { Navigate } from "react-router";
import axios from 'axios'
import { store } from "../App";
import { Link } from "react-router-dom";
import "./login.css";
const Login=()=>{
    const [loading, setLoading] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [, forceUpdate] = useState(false);
    const [token,setToken]=useContext(store)
    const [data,setData]=useState({
        email:"",
        password:"",
    })
    const changeHandler=e=>{
        setData({...data,[e.target.name]:e.target.value})
    }
    const submitHandler=e=>{
        console.log(data)
        e.preventDefault();
axios.post('http://localhost:5000/login',data).then(
    res=>{
        setToken(res.data.token)
    }
)
    }

    if(token){
      localStorage.setItem('token', token);
        return <Navigate to='/planjourney'/>
    }
   

    return(
        <div className="d-flex justify-content-center">
     {/* <form onSubmit={submitHandler} autoComplete="on">
         <h1 className="text-center">Registration Form</h1>
         <input type="email" onChange={changeHandler} name="email" placeholder="email"/><br/><br/>
         <input type="password" onChange={changeHandler} name="password" placeholder="password"/><br/><br/>
         <input type="submit" value="Login"/>

         
     </form> */}

     <div className="container-fluid">
      <div className="row no-gutter">
        <div className="d-flex justify-content-center col-md-12 col-lg-12 bg-image">
          <div className="col-md-6 col-lg-6 col-sm-12 col-xs-12">
            <div className="login d-flex align-items-center py-3">
              <div className="contain container py-5">
                <div className="row">
                  <div className="col-md-9 col-lg-9 col-sm-12 col-xs-12 mx-auto">
                    <h1 className="mb-3">User Login</h1>
                    <form onSubmit={submitHandler}>
                      <div className="form-group">
                        {/* <label htmlFor="username">Email</label> */}
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
                          className="form-control border"
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
                        <span className="error-message">{message}</span>
                      </div>
                      {!loading && (
                        <button className="btn btn-primary font-weight-bold text-uppercase w-100" type="submit">
                          Login
                        </button>
                      )}
                    </form>
                    <Link to="/auth/forgotpassword" className="btn w-100 p-0">
                      <button className="btn btn-danger w-100">Forgot Password?</button>
                    </Link>
                    <p className="mb-1">Don't have account <a href='/register'>Create Account</a></p>
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
export default Login