'use client'
import CollectionsForm from '@/components/collections/CollectionsForm'
import Loader from '@/components/custom-ui/Loader'
import ProductsForm from '@/components/products/ProductsForm'
import React, { useEffect, useState } from 'react'

const setProductDetail = ({params} : {params:{productId: string}}) => {
    const [loading,setLoading] = useState(true)
    const [ProductDetail,setProductDetail] = useState<productsType | null>(null)
    console.log(params.productId)
    const getCollectionDetail = async()=>{
        try {
           const res = await fetch(`/api/products/${params.productId}`,{
            method:"GET"
           }) 
           const data = await res.json()
           setProductDetail(data)
           setLoading(false)
        } catch (error) {
            console.log('setProductDetail error',error)
        }
    }

    useEffect(()=>{
        getCollectionDetail()
    },[])
  return  loading? <Loader/> :(
    <ProductsForm initialData={ProductDetail}></ProductsForm>
  )
}

export default setProductDetail