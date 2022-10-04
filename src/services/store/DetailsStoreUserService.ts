import prismaClient from "../../prisma"

interface DetailStore{
    store_id: string;
}

class DetailsStoreUserService {
    async execute({store_id} : DetailStore){
        const store = await prismaClient.storeUser.findMany({
           where: { // id da loja igual ao id que estou enviando
            id: store_id
           },
           
           include: {
            author: {
                select: {
                    id: true,
                    name: true
                }
            },
            subscriptions: {
                select: {
                    id: true,
                    status: true
                }
            },
            category: {
                select: {
                    name: true
                }
            }
           }
        })

        return store
    }
}

export {DetailsStoreUserService}