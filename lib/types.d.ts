type collectionsType = {
    _id:string,
    title:string,
    description:string,
    image:string,
    products: productsType[]
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
    price:number,
    expense:number,
    createAt: Date,
    updateAt: Date
}