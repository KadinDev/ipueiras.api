import prismaClient from "../../prisma"

interface StoreRequest{
    user_id: string; // id do dono da loja
    name: string;
    description: string;
    banner: string;
    category_id: string;
    address: string
}

class CreateStoreUserService{
    async execute({
        user_id,
        name,
        description,
        banner,
        category_id,
        address
    } : StoreRequest){
        
        if(!name || !description || !banner || !category_id){
            throw new Error("campos vazios não são permitidos")
        }

        const createStore = await prismaClient.storeUser.create({
            data: {
                name,
                description,
                banner,
                authorId: user_id,
                searchStore: description.toLocaleLowerCase(),
                categoryId: category_id,
                address
            }
        })

        return createStore
    }
}

export {CreateStoreUserService}