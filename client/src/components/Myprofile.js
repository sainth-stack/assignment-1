import axios from 'axios'
import react,{useContext,useState,useEffect} from 'react'
import { Navigate } from "react-router";

import { store } from '../App'
const Myprofile=()=>{
    const [data,setData]=useState(null)

    useEffect(()=>{
        axios.get('http://localhost:5000/myprofile',{
            headers:{
                'x-token':token
            }
        }).then(res=>{
            console.log(res.data)
            setData(res.data)
        })
    },[])
    const token=localStorage.getItem("token");
    console.log(token)
    if(!token){
        return <Navigate to='/login'/>
    }
    return(

      <div>
          
        hello 

        <button>Logout</button><br/>
          
      </div>
    )
}
export default Myprofile