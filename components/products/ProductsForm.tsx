"use client";
import React, { useEffect, useState } from "react";
import { Separator } from "@/components/ui/separator";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "../ui/textarea";
import Upload from "../custom-ui/Upload";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Multitask from "../custom-ui/Multitask";
import MultiSelect from "../custom-ui/MultiSelect";

const formSchema = z.object({
  title: z
    .string()
    .min(2, {
      message: "Username must be at least 2 characters.",
    })
    .max(70),
  description: z.string().min(10).max(500).trim(),
  media: z.array(z.string()),
  category: z.string(),
  collections: z.array(z.string()),
  tags: z.array(z.string()),
  sizes: z.array(z.string()),
  colors: z.array(z.string()),
  price: z.coerce.number().min(0.1),
  expense: z.coerce.number().min(0.1),
});

interface ProductsFormProps {
  initialData?: productsType | null;
}

const ProductsForm: React.FC<ProductsFormProps> = ({ initialData }) => {
  const [isloading, setIsloading] = useState(false);
  const [collections,setCollections]= useState<collectionsType[]>([])

  const getCollections = async()=>{
    try {
      setIsloading(true)
      const res = await fetch(`/api/collections`,{
        method:'GET'
      })
      const data = await res.json()
      setCollections(data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(()=>{
    getCollections()
  },[])
  console.log(collections)
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData
      ? initialData
      : {
          title: "",
          description: "",
          media: [],
          category: "",
          collections: [],
          tags: [],
          sizes: [],
          colors: [],
          price: 0.1,
          expense: 0.1,
        },
  });
  const router = useRouter();


  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsloading(true);
      const url = initialData
        ? `/api/products/${initialData._id}`
        : "/api/products";
      const res = await fetch(url, {
        method: "POST",
        body: JSON.stringify(values),
      });
      if (res.ok) {
        setIsloading(false);
        toast.success(`Products ${initialData ? "updated" : "created"}`);
        window.location.href = "/products";
        router.push("/products");
      }
    } catch (error) {
      console.log("Product POST", error);
      toast.error("Something wrong!!");
    }
  };
  return (
    <div className="p-18">
      <p className="font-bold text-2xl">
        {initialData ? "Update" : "Create"} Collection
      </p>
      <Separator className="my-4" />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-bold text-lg">Title</FormLabel>
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
                <FormLabel className="font-bold text-lg">Description</FormLabel>
                <FormControl>
                  <Textarea placeholder="description..." {...field} rows={5} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="media"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Image</FormLabel>
                <FormControl>
                  <Upload
                    value={field.value}
                    onChange={(url) => field.onChange([...field.value, url])}
                    onRemove={(url) =>
                      field.onChange([
                        ...field.value.filter((image) => image !== url),
                      ])
                    }
                  />
                </FormControl>
                <FormMessage className="text-red-1" />
              </FormItem>
            )}
          />

          <div className="md:grid md:grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bold text-lg">Price $</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="price..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="expense"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bold text-lg">Expense $</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="expense..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bold text-lg">Category</FormLabel>
                  <FormControl>
                    <Input placeholder="Category..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="md:grid md:grid-cols-3 gap-8">
          <FormField
            control={form.control}
            name="tags"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-bold text-lg">Tags</FormLabel>
                <FormControl>
                  <Multitask
                    placeholder="Tags"
                    value={field.value}
                    onChange={(tag) => field.onChange([...field.value, tag])}
                    onRemove={(tagToRemove)=>{
                      field.onChange([
                        ...field.value.filter((tag)=> tag!== tagToRemove)
                      ])
                    }}
                  ></Multitask>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="collections"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-bold text-lg">Collections</FormLabel>
                <FormControl>
                  <MultiSelect
                    placeholder="Collections"
                    value={field.value}
                    collections={collections}
                    onChange={(_id) => field.onChange([...field.value, _id])}
                    onRemove={(idToRemove)=>{
                      field.onChange([
                        ...field.value.filter((_id)=> _id!== idToRemove)
                      ])
                    }}
                  ></MultiSelect>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="colors"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-bold text-lg">Colors</FormLabel>
                <FormControl>
                  <Multitask
                    placeholder="Colors"
                    value={field.value}
                    onChange={(color) => field.onChange([...field.value, color])}
                    onRemove={(colorToRemove)=>{
                      field.onChange([
                        ...field.value.filter((color)=> color!== colorToRemove)
                      ])
                    }}
                  ></Multitask>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="sizes"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-bold text-lg">Sizes</FormLabel>
                <FormControl>
                  <Multitask
                    placeholder="Sizes"
                    value={field.value}
                    onChange={(size) => field.onChange([...field.value, size])}
                    onRemove={(sizeToRemove)=>{
                      field.onChange([
                        ...field.value.filter((size)=> size!== sizeToRemove)
                      ])
                    }}
                  ></Multitask>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          </div>
          <div className="flex gap-10">
            <Button type="submit" className="bg-[#00e5ff]">
              {" "}
              Submit
            </Button>
            <Button
              type="button"
              onClick={() => router.push("/collections")}
              className="bg-[#00e5ff]"
            >
              DisCard
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ProductsForm;
