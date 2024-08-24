'use client'
import { columns } from '@/components/collections/CollectionsColumn'
import { DataTable } from '@/components/custom-ui/DataTable'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const Collection = () => {
    const router = useRouter()
    const [loading,setLoading] = useState(true)
    const [collections,setCollections] = useState([])
    const getCollection = async()=>{
        try {
            const res = await fetch('/api/collections',{
                method:"GET"
            })
            const data = await res.json()
            setCollections(data)
            setLoading(false)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(()=>{
        getCollection()
    },[])
    console.log(collections)
  return (
    <div className='p-18'>
        <div className='flex justify-between items-center'>
            <p className='font-bold text-2xl'>Collections</p>
            <Button className='bg-[#00e5ff] text-white' onClick={()=>router.push('/collections/new')}>Create New Collection</Button>
        </div>
        <Separator className='my-4'></Separator>
        <DataTable columns={columns} data={collections} searchKey='title'/>
    </div>
  )
}

export default Collection