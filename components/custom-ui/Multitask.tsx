'use client'
import React, { useState } from 'react'
import { Input } from '../ui/input'
import { Badge } from '../ui/badge'
import { Button } from '../ui/button'
import { IoMdClose } from "react-icons/io";
interface MultitaskProps{
    placeholder: string,
    value: string[],
    onChange: (value:string)=>void,
    onRemove: (value:string)=>void,
}
const Multitask:React.FC<MultitaskProps> = ({placeholder,value,onChange,onRemove}) => {
    const [inputValue,setInputvalue] = useState('')

    const addTag = (item:string)=>{
        onChange(item)
        setInputvalue('')
    }
  return (
    <>
    <Input placeholder='' value={inputValue} onChange={(e)=>setInputvalue(e.target.value)} onKeyDown={(e)=>{if(e.key==="Enter"){e.preventDefault(); addTag(inputValue)}}}></Input>
    <div>
        {value.map((tag,index)=>(
            <Badge key={index} className='bg-gray-600 text-white'>{tag}
                <button className=' ml-1 rounded-full outline-none hover:bg-red-600' onClick={()=>onRemove(tag)}>
                   <IoMdClose></IoMdClose>
                </button>
            </Badge>

        ))}
    </div>
    </>
  )
}   

export default Multitask