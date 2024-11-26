import React from 'react'
import { useEffect, useState } from 'react';
import TaskBar from './taskBar';
import { addDoc, collection, deleteDoc, doc, getDocs, query, where } from 'firebase/firestore';
import {auth, db} from '../services/firebase.config'
import { LogOut } from 'lucide-react';
import { signOut } from 'firebase/auth';
import { Navigate } from 'react-router-dom';

export default function TaskManager({user}) {
    const [allTask,setTasks] = useState([])
  const [addTask,setAddTask] = useState(false)
  

  useEffect(() => {
    const fetchData = async () => {
      if (auth.currentUser) {
        const tasksCollection = collection(db, "user tasks");
  
        const q = query(tasksCollection, where("userId", "==", auth.currentUser.uid));
        try {    
          const querySnapshot = await getDocs(q);          
          const tasksData = querySnapshot.docs.map(doc => {
            const data = doc.data();
            const task = {
              id: doc.id,
              task: data.task,
              completed: data.completed,
            };
            return task;
          });
          setTasks(tasksData); // Set the filtered tasks in state
        } catch (error) {
          console.error("Error fetching tasks: ", error);
        }
      } else {
        console.log("No user is logged in.");
      }
    };

    fetchData();
  }, [allTask]); 

  const handleAddTask = async (e) => {
    if (e.key === "Enter" && e.target.value !=="") {
      const inputTask = e.target.value;           

      const taskData = {
        task: inputTask,
        completed: false,  
        userId: auth.currentUser.uid,
      };      
      try {      
        const tasksCollection = collection(db, "user tasks");        
        await addDoc(tasksCollection, taskData);        
        setTasks((prevTasks) => [...prevTasks, taskData]);
        e.target.value = '';  
      } catch (error) {
        console.error("Error adding task: ", error);
      }
    }
  };

  const handleDeleteTask = async (id) => {
    try {      
      console.log(id)
      const taskDocRef = doc(db, "user tasks", id);       
      await deleteDoc(taskDocRef);
      setTasks(allTask.filter(task=>task.id !== id))
      
      //  const tasksCollection = collection(db, "user tasks");
      //  const querySnapshot = await getDocs(tasksCollection);
      //  const tasksData = querySnapshot.docs.map(doc => {
      //    const data = doc.data();
      //    return {
      //      id: doc.id,
      //      task: data.task,
      //      completed: data.completed,
      //    };
      //  });
      //  setTasks(tasksData); 

    } catch (error) {
      console.error("Error deleting task: ", error);
    }
  };

  //handle search
  const handleSearch = () => {
    const query = document.getElementById("taskSearchbar").value.toLowerCase();
    
    if(query !== "") {
      const filtered = allTask.filter(task => 
        task.task.toLowerCase().includes(query) // Case-insensitive search
      );
      setTasks(filtered); // Update filtered tasks
    }
  };

  const handleSearchReset = async ()=>{
    const tasksCollection = collection(db, "user tasks");
    const q = query(tasksCollection, where("userId", "==", auth.currentUser.uid));
    try {    
      const querySnapshot = await getDocs(q);          
      const tasksData = querySnapshot.docs.map(doc => {
        const data = doc.data();
        const task = {
          id: doc.id,
          task: data.task,
          completed: data.completed,
        };
        return task;
      });
      setTasks(tasksData); // Set the filtered tasks in state
    } catch (error) {
      console.error("Error fetching tasks: ", error);
    }

  }

  const handleLogout = async () => {
    try {
      await signOut(auth);  // Sign out the user from Firebase
      console.log("User signed out successfully");
      Navigate("/signin");  // Redirect to the login page after successful logout
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  return (
    <div className='relative flex justify-center items-center h-screen bg-[#fcf5eb] font-mono'>

      <div className="flex flex-col gap-4 border-2 border-black bg-white rounded-xl w-[50%]  p-4 py-8">
        <h1 className="text-5xl font-semibold text-center">All tasks </h1>
        <div className='flex gap-2'>
          <button className='border border-black px-3 py-1 hover:rounded-xl transition-all duration-300 bg-red-300 text-nowrap' onClick={()=>handleSearchReset()}>Reset</button>
          <input type="text"  className="w-full p-2 rounded-md border border-black outline-yellow-500" placeholder='seach here...' id='taskSearchbar' />          
          <button className='border border-black px-3 py-1 hover:rounded-xl transition-all duration-300 bg-green-300 text-nowrap' onClick={()=>handleSearch()}>Search</button>          
          <button onClick={()=>setAddTask(!addTask)} className='border border-black px-3 py-1 hover:rounded-xl transition-all duration-300 bg-blue-300 text-nowrap'>Add Task</button>
        </div>

        <div className={`${addTask ? 'h-full ':'h-0 opacity-0'}  transition-all duration-300 flex  gap-2`}>
          <input onKeyDown={(e)=>handleAddTask(e)} type="text"  className="w-full p-2 rounded-md border border-black outline-none" placeholder='enter task and hit enter..'/>       
          {/* <input id="taskTime" type="datetime-local"  className='border border-black px-2 rounded-md'/> */}
        </div>

         {/* display tasks */}
         <div className="flex flex-col gap-2 overflow-y-scroll max-h-[300px]">
          {/* task  */}
          {allTask.map(task => (
            <TaskBar task={task} key={task.id} handleDelete={handleDeleteTask}/>
          ))}           

         </div>        
      </div>

      <div className='absolute top-5 right-6 flex  items-center gap-2' >
        <span className='text-lg font-bold '>Welcome {user.email}</span>
        <button onClick={handleLogout} className='border border-black px-3 py-1 hover:rounded-xl transition-all duration-300 bg-blue-300 text-nowrap flex items-center gap-2'>Logout<LogOut size={20}/> </button>

      </div>
    </div>
  )
}
