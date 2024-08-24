'use client'
import CollectionsForm from '@/components/collections/CollectionsForm'
import Loader from '@/components/custom-ui/Loader'
import React, { useEffect, useState } from 'react'

const CollectionDetails = ({params} : {params:{collectionId: string}}) => {
    const [loading,setLoading] = useState(true)
    const [collectionDetails,setCollectionDetails] = useState<collectionsType | null>(null)
    console.log(params.collectionId)
    const getCollectionDetail = async()=>{
        try {
           const res = await fetch(`/api/collections/${params.collectionId}`,{
            method:"GET"
           }) 
           const data = await res.json()
           setCollectionDetails(data)
           setLoading(false)
        } catch (error) {
            console.log('CollectionDetails error',error)
        }
    }

    useEffect(()=>{
        getCollectionDetail()
    },[])
  return  loading? <Loader/> :(
    <CollectionsForm initialData={collectionDetails}></CollectionsForm>
  )
}

export default CollectionDetails