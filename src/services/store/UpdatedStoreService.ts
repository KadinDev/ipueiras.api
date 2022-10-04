import prismaClient from "../../prisma"

interface StoreRequest {
    user_id: string,
    store_id: string,
    name: string,
    description: string,
    banner: string,
    category_id: string,

    images?: string[],
    latitude?: string,
    longitude?: string,
    contact?: string,
    address?: string,
}


class UpdatedStoreService {
    async execute({
        user_id, store_id, name, banner, description, images, latitude,
        longitude, address, contact, category_id
    } : StoreRequest){
        
        if(!name || !description || !banner){
            throw new Error("campos vazios não são permitidos")
        }

        // ver se a loja é VIP
        const authorStore = await prismaClient.user.findFirst({
            where: {
                id: user_id
            },
            include: {
                store: {
                    include: {
                        subscriptions: true
                    }
                }
            }
        })

        // ver se o user logado é o dono da loja
        const ownerStore = await prismaClient.storeUser.findFirst({
            where: {
                id: store_id,
                authorId: user_id
            }
        })
       
        if(!ownerStore){
            throw new Error('Not authorized')
        }

        if(authorStore?.store?.subscriptions?.status !== 'active'){
            //throw new Error("Necessário tornar-se VIP para acessar as novas informações")
            const store = await prismaClient.storeUser.update({
                // onde o ID do dono da loja(authorId)
                // for igual ao ID do usuário logado(user_id)
                where: {
                    id: store_id
                },
                data: {
                    updated_at: new Date(),
                    name,
                    description,
                    banner,
                    categoryId: category_id,
                    address,
                    searchStore: description.toLocaleLowerCase()
                }
            })

            return store

        } else {
            const storeUpdated = await prismaClient.storeUser.update({
                where: {
                    id: store_id
                },
                
                data: {
                    updated_at: new Date(),
                    name,
                    description,
                    banner,
                    images,
                    latitude,
                    longitude,
                    contact,
                    address,
                    categoryId: category_id,
                    searchStore: description.toLocaleLowerCase()
                }
            })
            
            return storeUpdated
        }
 
    }
}

export {UpdatedStoreService}
