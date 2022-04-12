import axios from 'axios'
import react,{useContext,useState,useEffect} from 'react'
import { Navigate } from "react-router";

import { store } from '../App'
const Myprofile=()=>{
    const [token,setToken]=useContext(store)
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
    if(!token){
        return <Navigate to='/login'/>
    }
    return(

      <div>
          
        hello {data.username}

        <button>Logout</button><br/>
          
      </div>
    )
}
export default Myprofile