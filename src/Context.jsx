import { createContext, useEffect, useState } from "react";
export const con=createContext();
import { useUserLoggedInQuery } from "./services/user";
import axios from "axios";
const Context = (props) => {
    const [admin,setAdmin]=useState(false);
    const [loged,setL]=useState(false);
    const[id,setI]=useState("");
    // const {data,isFetching,error}=useUserLoggedInQuery();
    // if(!isFetching){
    //   console.log(data);
    // }else{console.log(error);}
    const check=async()=>{
      try{
        const data=await axios.get('https://backendd-6s0h.onrender.com/exp/loggedIn',{withCredentials:true});
        console.log(data.data);
        if(data.data==false){
          setL(false);setAdmin(false);setI("");
        }
        else{
          setI(data.data._id);
          if(data.data.Admin){setAdmin(true);}
        }
        console.log(id,admin,loged);
      }catch(err){setL(false);setAdmin(false);setI("");console.log(err);}
    }
    useEffect(()=>{
      check();
    },[])
  return (
    <con.Provider value={{admin,loged,id}}>
        {props.children}
    </con.Provider>
  )
}

export default Context