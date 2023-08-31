import { Typography } from "@mui/material";
import { useLocation } from "react-router-dom"
const Details = () => {
    const location=useLocation();
    const data=location.state;
  return (
    <div className="flex flex-col align-middle justify-center bg-gray-400 h-screen">
        <div className="text-center"><Typography variant="h4">Detail of the Experiment</Typography></div>
        <div className="text-center"><Typography variant="h5"><span className="font-bold">Name of the Experiment:</span>{data.name}  <span className="font-bold">views:</span>{data.views}
        <span className="font-bold">Claps:{data.claps}</span>
        </Typography></div>
        <div className="text-center"><Typography variant="h6"><span className="mr-3">Subject:{data.subject}</span> <span>difficulty:{data.difficulty}</span></Typography></div>
        <div className="flex  justify-center align-middle m-10">
        <img style={{height:"140px",width:'400px'}} src={`https://backendd-6s0h.onrender.com/uploads/${data.image}`}/></div>
        <div className="text-center"><p>Description:{data.description}</p></div>
        <div className="text-center"><p>Precautions:{data.precautions}</p></div>
        <div className="text-center">
        <Typography variant="h5">Materials used</Typography>
            {data.materials.map((ele,index)=>{
                return <div key={index} >
                    <span className="mr-3">Name:{ele.name}</span>
                    <span>Quantity:{ele.quantity}</span>
                </div>
            })}
        </div>
        <div className="text-center">
        <Typography variant="h5">Steps</Typography>
            {data.steps.map((ele,index)=>{
                return <div key={index} className="flex flex-col justify-center align-middle text-center">
                    <div>Step:{index+1}</div>
                    <div className="mr-3">Description:{ele.description}</div>
                    <div className="flex align-middle justify-center"><img style={{height:"140px",width:'400px'}} src={`http://localhost:5005/uploads/${ele.image}`}/></div>
                </div>
            })}
        </div>
        <div>

        </div>
    </div>
  )
}

export default Details