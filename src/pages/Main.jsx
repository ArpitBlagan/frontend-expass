import {con} from "../Context"
import { useContext, useEffect,useState } from "react"
import { useNavigate } from "react-router-dom";
import { useGetExpsQuery } from "../services/exp";
import { useAddExpViewMutation } from "../services/exp";
import {Card, CardActions,CardContent,Button, CardHeader, CardMedia, Grid,Typography} from '@mui/material'

const Main = () => {
  const navigate=useNavigate();
  const {admin,loged}=useContext(con);
  const [addExpView,ff]=useAddExpViewMutation();
  const [val,setV]=useState([]);
  const {data:List,isFetching}=useGetExpsQuery();
  const [subject,setS]=useState("");
  const [difficulty,setD]=useState("");
  
    useEffect(()=>{
      const filterData=List?.filter((ele)=>ele.subject.toLowerCase().includes(subject.toLocaleLowerCase()));
      const Data=filterData?.filter((ele)=>ele.difficulty.toString().toLowerCase().includes(difficulty.toString().toLocaleLowerCase()));
      setV(Data);
    },[List,subject,difficulty]);
  console.log(admin,loged);
  if(isFetching){
    return "loading"
  }
  return (
    <div>
        <div className="flex flex-row mt-2 align-middle  p-2 bg-gray-500">
        <div className="mr-10"><Typography variant="h6">Search By:</Typography></div>
        <div className='mr-5 mb-5'>
            <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Subject</label>
            <select id="countries" className="bg-gray-50 border border-gray-300 text-gray-900  rounded-lg  h-10" onChange={(e)=>{setS(e.target.value)}}>
                <option value="" selected>Choose a subject</option>
                <option value="Physics">Physics</option>
                <option value="Chemistry">Chemistry</option>
                <option value="Biology">Biology</option>
                <option value="General Science">General Science</option>
            </select>
            </div>
        <div className=''>
            <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Difficulty</label>
            <select id="countries" className="bg-gray-50 border border-gray-300 text-gray-900  rounded-lg  h-10" onChange={(e)=>{setD(e.target.value)}}>
            <option value="" selected>Choose a difficulty</option>
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
                <option value={5}>5</option>
            </select>
            </div></div>
        <div>
          <Grid container spacing={3}>
            {val?.map((ele,index)=>{
              return <Grid key={index} xs={12} sm={12} md={4} item>
                  <Card>
                    <CardHeader title={ele.name}/>
                    <CardMedia
                    sx={{ height: 140 }}
                      component="img"
                      src={`https://backendd-6s0h.onrender.com/uploads/${ele.image}`}
                    />
                    <CardContent>
                    <Typography variant="body2" color="text.secondary">
                    {ele.description}
                    </Typography>
                    </CardContent>
                    <CardActions>
                    <Button size="small" onClick={async(e)=>{
                      e.preventDefault();try{
                        const ff=ele.views+1;
                      const val={
                        id:ele._id,
                        views:ff,
                        claps:ele.claps
                      }
                      const data=await addExpView(val).unwrap();
                      navigate("/details",{state:data});}
                      catch(err){
                        console.log(err);
                      }
                    }}>Learn More</Button>
                    
                    </CardActions>
                  </Card>
              </Grid>
            })}
          </Grid>
        </div>
    </div>
  )
}

export default Main