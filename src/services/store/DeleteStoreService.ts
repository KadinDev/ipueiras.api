import prismaClient from '../../prisma'

interface StoreRequest {
    store_id: string,
    user_id: string
}

class DeleteStoreService {
    async execute({store_id, user_id} : StoreRequest){

        // vendo se o user logado é dono da loja
        const store = await prismaClient.storeUser.findFirst({
            // onde o ID que estou querendo buscar é igual ao ID da loja cadastrada
            where: {
                id: store_id,
                authorId: user_id, //onde o ID do dono é igual ao ID do user que está logado
            }
        })

        if(!store){
            throw new Error('Not authorized')
        }

        //ver se a loja é vip
        const authorStore = await prismaClient.subscription.findFirst({
            where: {
                storeId: store_id
            }
        })

        if(authorStore?.status === 'active'){
            await prismaClient.subscription.delete({
                where: {
                    storeId: store_id
                }
            })
        }
        
        await prismaClient.storeUser.delete({
            where: {
                id: store_id,
            }
        })

        return {message: "Loja deletada com sucesso!"}
    }
}

export {DeleteStoreService}