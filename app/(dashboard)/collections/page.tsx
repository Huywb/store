'use client'
import { columns } from '@/components/collections/CollectionsColumn'
import { DataTable } from '@/components/custom-ui/DataTable'
import React, { useEffect, useState } from 'react'

const Collection = () => {
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
    <div>
        <DataTable columns={columns} data={collections} />
    </div>
  )
}

export default Collection