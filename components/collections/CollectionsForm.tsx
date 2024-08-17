'use client'
import React, { useState } from 'react'
import { Separator } from "@/components/ui/separator"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from '../ui/textarea'
import Upload from '../custom-ui/Upload'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

const formSchema = z.object({
  title: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }).max(70),
  description: z.string().min(10).max(500).trim(),
  image: z.string()
})
const CollectionsForm = () => {

  const [isloading,setIsloading] = useState(false)
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: '',
      image: ''
    },
  })
  const router = useRouter()
 
  const onSubmit = async (values: z.infer<typeof formSchema>) =>{
    try {
      setIsloading(true)
      const res = await fetch("/api/collections",{
        method: 'POST',
        body: JSON.stringify(values)
      })
      if(res.ok){
        setIsloading(false)
        toast.success("Collection created")
        router.push("/collections")
      }
    } catch (error) {
      console.log("Collection POST",error)
      toast.error("Something wrong!!")
    }
  }
  return (
    <div className='p-18'>
        <p className='font-bold text-2xl'>Create Collection</p>
        <Separator className='my-4'/>
      <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel className='font-bold text-lg'>Title</FormLabel>
              <FormControl>
                <Input placeholder="title..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
            )}
          />
           <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel className='font-bold text-lg'>Description</FormLabel>
                <FormControl>
                  <Textarea placeholder="description..." {...field} rows={5}/>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel className='font-bold text-lg'>Image: </FormLabel>
                <FormControl>
                  <Upload value={field.value ? [field.value] : []} 
                          onChange={(url)=>field.onChange(url)}
                          onRemove={()=>field.onChange('')}
                  ></Upload>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className='flex gap-10'>
           <Button type="submit" className='bg-[#00e5ff]'>Submit</Button>
           <Button type="button" onClick={()=>router.push('/collections')} className='bg-[#00e5ff]'>DisCard</Button>
          </div>
      </form>
      </Form>
      
    </div>
  )
}

export default CollectionsForm