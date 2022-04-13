import axios from 'axios'
import react,{useContext,useState,useEffect} from 'react'
import { Navigate } from "react-router";
import "./styles.css"
import "../index.css"
import { store } from '../App'
const Myprofile=()=>{
    const [data,setData]=useState(null)
    const [destination,setDestination] = useState("");
    const [trainData,setTrainData] = useState([]);
    const [loading,setLoading] = useState(false)
    const [reserveTrain,setReserveTrain] = useState([])
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
    const search = (e) => {
        e.preventDefault()
        console.log(destination);
        setLoading(true)
        const axios = require("axios");

    const options = {
    method: 'POST',
    url: 'https://trains.p.rapidapi.com/',
    headers: {
        'content-type': 'application/json',
        'X-RapidAPI-Host': 'trains.p.rapidapi.com',
        'X-RapidAPI-Key': '15d8150095msha01d1a59180d0d1p1f0469jsn5c97956e9d26'
    },
    data: '{"search":"'+destination+'"}'
    };

    axios.request(options).then(function (response) {
        if(response && response.data.length>0){
            console.log(response.data);
            setTrainData(response.data)
            setLoading(false)
        }
        else{
            console.log("No data found");
        }
    }).catch(function (error) {
        console.error(error);
    });
    }
    // console.log(reserveTrain)
    // if(reserveTrain.length>0)
    // {
    //     axios.post("http://localhost:5000/reserveTrain",reserveTrain).then((res) => {
    //     console.log(res)
    // })
    // }
    // const reserveTrain = (train) => {
    //     // console.log(train);
    //     console.log("first")
    // }
    return(
      <div>
          <div className='row d-flex justify-content-between'>
            <div className='parent col-sm-10 col-md-5'>
                <form className=''>
                    <div className='planJourney'>
                        {/* <div className='d-flex justify-content-between'>
                            <p className='text-secondary m-2'>From</p>
                            <p className='text-secondary m-2'>To</p>
                        </div> */}
                        <div className='row d-flex justify-content-between'>
                            <div className='ml-2 col-sm-10 col-md-5'>
                                <label htmlFor='from' className='text-secondary'>From</label>
                                <input type="text" id='from' className='form-control' 
                                    placeholder='Source'
                                    required
                                />
                            </div>
                            <i class="fa fa-exchange d-flex align-items-center mt-4" aria-hidden="true"></i>
                            <div className='mr-2 col-sm-10 col-md-5'>
                                <label htmlFor='to' className='text-secondary'>To</label>
                                <input type="text" id='to' className='form-control'
                                    placeholder='Destination'
                                    required
                                    onChange={(e) => setDestination(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className='m-4 d-flex'>
                            <label htmlFor='date' className="mt-1">Date</label>
                            <input type="date" id="date" className='form-control ml-3' />
                        </div>
                        <div className='form-group text-center'>
                            <button className='btn btn-primary form-control col-4' onClick={search}>Search</button>
                        </div>
                    </div>
                </form>
            </div>
            <div className='col-sm-10 col-md-5 details'>
                {loading ? <div className='loading'>Loading...</div> : 
                    <>
                    <h2 className=''>Available Train Details</h2>
                    <div className='text-center'>   
                        {trainData && 
                            trainData.map((train,index) => {
                                return (
                                    <div className='trainDetails m-1' key={index}>
                                        {/* <div className='reserve-screen'>
                                            <div className='reserve-button'>
                                                <input type="button" onClick={reserveTrain(train)} value="Reserve" />
                                            </div>
                                        </div> */}
                                        <div className='row train'>
                                            <div className='col-4'>
                                                <p className='train-name'>{train.name}</p>
                                                <p className='train-no'>{'#'+train.train_num} | Departs on:<span className='text-success'>S M</span></p>
                                            </div>
                                            <div className='col-3'>
                                                <p className='train-name'>{train.data.departTime}</p>
                                                <p className='train-no'>{train.train_to}</p>
                                            </div>
                                            <div className='col-3'>
                                                <p className='train-name'>{train.data.arriveTime}</p>
                                                <p className='train-no'>{train.train_from}</p>
                                            </div>
                                        </div>
                                        <div className='row train-p-class ml-3 mb-3'>
                                            {train.data.classes && 
                                                typeof(train.data.classes)==="string" ? <p>Unreserved</p> :
                                                train.data.classes.map((classe,index) => {
                                                    return(
                                                        <div className='col-4 m-2 train-class' key={index}>
                                                            <div className='row'>
                                                                <div className='col-8'>
                                                                    <p className='train-name'>{classe}</p>
                                                                    <span className='seat-available text-success'>AVAILABLE 12</span>
                                                                </div>
                                                                <div>
                                                                    <p className='train-name'>Rs.1414</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>
                                        <button className='btn btn-primary form-control' onClick={() => {
                                              axios.post("http://localhost:5000/reserveTrain",train).then((res) => {
                                                console.log(res)
                                                if(res){
                                                    alert("Reserved Successfully")
                                                }
                                            })
                                            }}>Reserve</button>
                                    </div>
                                )
                            })
                        }
                    </div>
                    </>
                }
            </div>
          </div>
          <button>Logout</button>  
      </div>
    )
}
export default Myprofile