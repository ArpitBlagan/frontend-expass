import {useContext, useState} from 'react'
import { useAddExpMutation } from '../services/exp';
import { con } from '../Context';
import {useNavigate} from 'react-router-dom';
const ExpForm = () => {
    const navigate=useNavigate();
    const {id}=useContext(con);
    const [addExp,ff]=useAddExpMutation();
    const [name,setN]=useState("");
    const [steps,setS]=useState([]);
    const [description,setD]=useState("");
    const[subject,setSu]=useState("");
    const [difficulty,setDi]=useState(0);
    const [precautions,setP]=useState("");
    const [image,setIm]=useState(null);
    const [materials,setMa]=useState([]);
    const handleSubmit=async(e)=>{
        e.preventDefault();
        const formData = new FormData();
        formData.append("user_id",id);
        formData.append("name",name);
        formData.append("description",description);
        formData.append("precautions",precautions);
        formData.append("image",image);
        console.log(image);
        formData.append("subject",subject);
        formData.append("difficulty",difficulty);
        materials.forEach((entry, index) => {
            formData.append(`materials[${index}][name]`, entry.name);
            formData.append(`materials[${index}][quantity]`, entry.quantity);
          });
        steps.forEach((entry, index) => {
            formData.append('images', entry.image);
            formData.append('descriptions', entry.description);
          });
          try{
            console.log(formData);
            const data= await addExp(formData).unwrap();
            navigate("/");window.location.reload();
          }
          catch(err){
            console.log("err",err);
            alert("something  went wrong please try again");
            window.location.reload();
          }
    }
    const removeM=(index)=>{
        const arr=[...materials];
        arr.splice(index,1);
        setMa(arr);
    }
    const handleC=(e,index)=>{
        const arr=[...materials];
        const {name,value}=e.target;
        arr[index][name]=value;
        setMa(arr);
        console.log(materials);
    }
    const handleS=(e,index)=>{
        const arr=[...steps];
        const {name}=e.target;
        if(name==="image"){
            arr[index][name]=e.target.files[0];
        }
        else{
            arr[index][name]=e.target.value;
        }
        setS(arr);console.log(steps);
    }
    const removeS=(index)=>{
        const arr=[...steps];
        arr.splice(index,1);
        setS(arr);
    }
  return (
    <div className='h-full  bg-gray-400'>
        <div className='flex flex-col'>
        <form  className='pt-5 pr-10 pl-10 pb-5' onSubmit={handleSubmit}>
            <div>
                <lable className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Experiment Name</lable>
                <input className='w-full h-10 text-gray-900 pl-2 rounded-lg' required placeholder='Enter Experiment name...'
                    onChange={(e)=>{setN(e.target.value)}} value={name}
                />
            </div>
            <div className="mt-5">
                <lable className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">One line description*</lable>
                <input className='w-full h-10 text-gray-900 pl-2 rounded-lg' required placeholder='One line description...'
                    onChange={(e)=>{setD(e.target.value)}} value={description}
                />
            </div>
            <div className='mt-5'>
            <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Subject</label>
            <select id="countries" className="bg-gray-50 border border-gray-300 text-gray-900  rounded-lg w-full h-10" onChange={(e)=>{setSu(e.target.value)}}>
                <option value="" selected>Choose a subject</option>
                <option value="Physics">Physics</option>
                <option value="Chemistry">Chemistry</option>
                <option value="Biology">Biology</option>
                <option value="General Science">General Science</option>
            </select>
            </div>
            <div className='mt-5'>
            <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Difficulty</label>
            <select id="countries" className="bg-gray-50 border border-gray-300 text-gray-900  rounded-lg w-full h-10" onChange={(e)=>{setDi(e.target.value)}}>
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
                <option value={5}>5</option>
            </select>
            </div>
            <div className='mt-5'>
            <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Precautions</label>
            <textarea className='p-4 text-gray-900  rounded-lg w-full h-15' placeholder='Enter precautions...' rows={4}
                value={precautions}
                onChange={(e)=>{setP(e.target.value)}}
            />
            </div>
            <div className='mt-5'>
            <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Main image</label>
            <input name="image" className='p-4 text-gray-900  rounded-lg w-full h-15' 
                type="file"
                onChange={(e)=>{setIm(e.target.files[0])}}
            />
            </div>
            <div className='mt-5 bg-gray-200 p-4'>
                <div className="flex"><label  className=" flex-1 block mb-2 text-sm font-medium text-gray-900 dark:text-white">Materials</label>
                <button className=' rounded bg-blue-500 hover:bg-blue-800 p-3'
                    onClick={(e)=>{e.preventDefault();setMa([...materials,{name:"",quantity:0}])}}
                >Add+</button></div>
                {materials.map((ele,index)=>{
                    return <div className='mt-5 flex' key={index}>
                    <div className='mr-5'>
                    <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                    <input name="name" className='p-4 text-gray-900  rounded-lg ' placeholder='enter name'
                    onChange={(e)=>{handleC(e,index)}} value={ele.name}
                    /></div><div className='flex-1'><label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Quantity</label>
                    <input name="quantity" type="number" className='p-4 text-gray-900  rounded-lg ' placeholder='enter quantity'
                    onChange={(e)=>{handleC(e,index)}} value={ele.quantity}
                    /></div>
                    <button className='rounded bg-blue-500 hover:bg-blue-800 p-3'
                        onClick={(e)=>{e.preventDefault();removeM(index)}}
                    >Remove</button>
                    </div>
                })}</div>
            <div className='mt-5 bg-gray-200 p-4'>
                <div className="flex"><label  className=" flex-1 block mb-2 text-sm font-medium text-gray-900 dark:text-white">Steps</label>
                <button className=' rounded bg-blue-500 hover:bg-blue-800 p-3'
                    onClick={(e)=>{e.preventDefault();setS([...steps,{image:null,description:''}])}}
                >Add+</button></div>
                {steps.map((ele,index)=>{
                    return <div className='mt-5 flex' key={index}>
                    <div>
                    <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                    <input name="description" className='p-4 text-gray-900  rounded-lg ' placeholder='enter description'
                    onChange={(e)=>{handleS(e,index)}} value={ele.description}
                    /></div>
                    <div>
                    <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Image</label>
                        <input name="image" className='p-4 text-gray-900  rounded-lg w-full h-15' 
                            type="file"
                            onChange={(e)=>{handleS(e,index)}}
                        />
                    </div>
                    <button className='rounded bg-blue-500 hover:bg-blue-800 p-3'
                        onClick={(e)=>{e.preventDefault();removeS(index)}}
                    >Remove</button>
                    </div>
                })}
            </div>
            <div className='flex justify-center mt-5 mb-5'>
               <button className='bg-blue-500 hover:bg-blue-900 rounded pt-1 pb-1 pl-8 pr-8'>Submit</button>
            </div>
        </form>
        </div>
    </div>
  )
}

export default ExpForm