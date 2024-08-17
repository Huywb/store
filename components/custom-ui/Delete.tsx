import React from 'react'
import { FaTrash } from "react-icons/fa";
import { Button } from '../ui/button';
const Delete = () => {
  return (
    <Button className='bg-red-600 text-white'><FaTrash></FaTrash></Button>
  )
}

export default Delete