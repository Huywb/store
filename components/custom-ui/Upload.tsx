import React from 'react'
import { CldUploadWidget } from 'next-cloudinary';
import { Button } from '../ui/button';
import { FaPlus } from "react-icons/fa6";
import Image from 'next/image';

interface UploadProps{
    value: string[],
    onChange: (value:string) =>void,
    onRemove: (value:string) =>void,

}
const Upload:React.FC<UploadProps> = ({onChange,onRemove,value}) => {
    const onUpload = (result: any) =>{
        console.log('Upload result:', result); // Debugging: Check the entire result object
        if (result.event === 'success') {
            const url = result.info.secure_url; // Accessing the secure_url
            console.log('Image URL:', url); // Debugging: Ensure the URL is correct
            onChange(url); // Call onChange with the new URL
        }
    }
    console.log('value',value)
  return (
    <div>
        <div className='mb-4 flex flex-wrap items-center gap-4'>
            {value.map((url)=>(
                <Image src={url} alt='collection' className='object-cover rounded-lg' width={50} height={50}></Image>
            ))}
        </div>
        <CldUploadWidget uploadPreset="cnyularx" onSuccess={onUpload}>
        {({ open }) => {
            return (
            <Button onClick={() => open()} className='bg-gray-400 text-white'>
                <FaPlus className='mr-2'></FaPlus> Upload an Image
            </Button>
            );
        }}
        </CldUploadWidget>
    </div>
    
    )
}

export default Upload