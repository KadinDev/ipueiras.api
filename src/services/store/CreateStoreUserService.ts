import prismaClient from "../../prisma"

interface StoreRequest{
    user_id: string; // id do dono da loja
    name: string;
    description: string;
    banner: string;

    latitude?: string,
    longitude?: string,
    contact?: string,
    address: string;
    time?: string,
    attendance?: string,
    instagram?: string,
    category_id: string;
}

class CreateStoreUserService{
    async execute({
        user_id, // id do dono da loja
        name,
        description,
        banner,
    
        latitude,
        longitude,
        contact,
        address,
        time,
        attendance,
        instagram,
        category_id,
    } : StoreRequest){
        
        if(!name || !description || !banner || !category_id ){
            throw new Error("campos vazios não são permitidos")
        }

        const createStore = await prismaClient.storeUser.create({
            data: {
                name,
                description,
                banner,
                latitude,
                longitude,
                contact,
                address,
                time,
                attendance,
                instagram,
                authorId: user_id,
                categoryId: category_id,
            }
        })

        return createStore
    }
}

export {CreateStoreUserService}