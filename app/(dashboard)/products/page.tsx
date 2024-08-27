'use client'
import { DataTable } from '@/components/custom-ui/DataTable'
import Loader from '@/components/custom-ui/Loader'
import { ProductsColumn } from '@/components/products/ProductsColumn'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const Product = () => {
  const router= useRouter()
  const [loading,setLoading] = useState(true)
  const [products,setProducts] = useState<productsType[] >([])
  const getProducts = async()=>{
    try {
      const res = await fetch('/api/products',{
        method: "GET"
      })

      const data = await res.json()
      setProducts(data)
      setLoading(false)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(()=>{
    getProducts()
  },[])
  return  loading? <Loader/> :(
    <div className='p-18'>
        <div className='flex justify-between items-center'>
            <p className='font-bold text-2xl'>Collections</p>
            <Button className='bg-[#00e5ff] text-white' onClick={()=>router.push('/products/new')}>Create New Product</Button>
        </div>
        <Separator className='my-4'></Separator>
        <DataTable columns={ProductsColumn} data={products} searchKey='title'/>
    </div>
  )
}

export default Product