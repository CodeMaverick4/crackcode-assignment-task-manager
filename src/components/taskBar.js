import React from 'react'
import {Trash2} from "lucide-react"

export default function TaskBar({task,handleDelete}) {
  return (
    <>
    {!task.completed ? (
    <div className="flex justify-between px-4 py-2 border-2 border-[#33332d] rounded-md shadow-[-3px_3px_0px_#33332d]">
        <div className='flex flex-col gap-2'>
            <span className='text-lg '>{task.task}</span>
            <span className='font-semibold text-sm'>Status {task.completed ? "Done":"Pending"}</span>                    
        </div>        
        <div className='flex items-center justify-center' >
            <Trash2 size={33} color='#33332d' className='cursor-pointer' onClick={() => {handleDelete(task.id)} }/>            
        </div>        
    </div>
    ) : (
    <div className="flex justify-between px-4 py-2 border-2 border-[#33332d] rounded-md opacity-45">
        <div className='flex flex-col gap-2'>
            <span className='text-lg '>{task.task}</span>
            <span className='font-semibold text-sm'>{task.completed ? "Done":"Pending"}</span>                    
        </div>        
        <div className='flex items-center justify-center'>
            <Trash2 size={33} color='#33332d' className='cursor-pointer'/>            
        </div>        
    </div>
        )  
    }
    </>
)}
