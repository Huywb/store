type collectionsType = {
    _id:string,
    title:string,
    description:string,
    image:string,
    products: ProductType[]
}

type productsType = {
    _id: string,
    title: string,
    description: string,  
    media: [string],
    category:string ,
    collections:[collectionsType] ,
    tags:[string],
    sizes:[string],
    colors:[string],
    price:Number,
    expense:Number,
    createAt: Date,
    updateAt: Date
}