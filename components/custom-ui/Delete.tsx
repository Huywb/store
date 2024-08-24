'use client'
import React, { useState } from "react";
import { FaTrash } from "react-icons/fa";
import { Button } from "../ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import toast from "react-hot-toast";

interface DeleteProps{
  id: string
}

const Delete:React.FC<DeleteProps> = ({id}) => {
  const [loading,setLoading] = useState(false)
  const onDelete = async()=>{
    try {
      setLoading(true)
      const res = await fetch(`/api/collections/${id}`,{
        method: "DELETE"
      })
      if(res.ok){
        setLoading(false)
        toast.success("Collection deleted")
        window.location.href = ("/collections")
      }
    } catch (error) {
      console.log(error)
      toast.error("Something wrong!!! Please try again")
    }
  }
  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Button className="bg-red-600 text-white">
          <FaTrash></FaTrash>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-white">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-[#d50000]">Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription >
            This action cannot be undone. This will permanently delete your
            collections.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction className="bg-[#d50000] text-white" onClick={onDelete}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default Delete;
