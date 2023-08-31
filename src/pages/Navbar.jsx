import { Link, useBeforeUnload } from "react-router-dom"
import axios from "axios";
import { useContext } from "react";
import { con } from "../Context";
import { useNavigate } from "react-router-dom";
const Navbar = () => {
  const {admin,id}=useContext(con);
  const han=async()=>{
    try{
    const {data}=await axios.get('https://backendd-6s0h.onrender.com/exp/logout',{
      withCredentials:true
    });
    console.log(data);
    navigate("/");
    window.location.reload();
  }catch(err){
    console.log(err);
  }}
  const navigate=useNavigate();
  return (  
        <div className="sm:flex sm:flex-row md:flex text-lg" style={{backgroundColor:"#4a5568",height:'100px' }}>
            <div className="flex flex-col justify-center align-middle mr-10 ml-10"><Link to="/"><h5>Home</h5></Link></div>
            {(admin&&id)?<div className="flex flex-col flex-1 justify-center align-middle"><Link to="/add"><h5>Add Experiment</h5></Link></div>:<div className="flex-1"></div>}
            {id?
            <div className="flex flex-col justify-center align-middle mr-5 cursor-pointer" onClick={han}><h5>LogOut</h5></div>
            :<div className="flex">
            <div className="flex flex-col  justify-center align-middle mr-10"><Link to="/login"><h5 className="flex-1">Login</h5></Link></div>
            <div className="flex flex-col justify-center align-middle mr-5"><Link to="/register"><h5>Register</h5></Link></div></div>}
        </div>
  )
}
export default Navbar