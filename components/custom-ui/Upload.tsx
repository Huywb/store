import React from 'react'
import { CldUploadWidget } from 'next-cloudinary';
import { Button } from '../ui/button';
import { FaPlus } from "react-icons/fa6";
import Image from 'next/image';
import { IoCloseSharp } from "react-icons/io5";
interface UploadProps{
    value: string[],
    onChange: (value:string) =>void,
    onRemove: (value:string) =>void,

}
const Upload:React.FC<UploadProps> = ({onChange,onRemove,value}) => {
    const onUpload = (result: any) =>{
            const url = result.info.secure_url; // Accessing the secure_url
            onChange(url); // Call onChange with the new URL
    }
  return (
    <div>
        <div className='mb-4 flex flex-wrap items-center gap-4'>
            {value.map((url,index)=>(
                <div key={index} className='relative w-[200px] h-[150px]'>
                    <div className='absolute top-0 right-0 z-10 bg-red-600 text-white text-xl'>
                    <Button onClick={()=>onRemove(url)} ><IoCloseSharp /></Button>
                    </div>
                    <Image src={url} alt='collection' fill className='object-cover rounded-lg' ></Image>
                </div>
            ))}
        </div>
        <CldUploadWidget uploadPreset="cnyularx" onSuccess={onUpload}>
        {({ open }) => {
            return (
            <Button type="button" onClick={() => open()} className='bg-gray-400 text-white'>
                <FaPlus className='mr-2'></FaPlus> Upload an Image
            </Button>
            );
        }}
        </CldUploadWidget>
    </div>
    
    )
}

export default Upload