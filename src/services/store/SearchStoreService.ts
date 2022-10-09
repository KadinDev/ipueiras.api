import prismaClient from "../../prisma"

interface SearchStore{
    store: string
}

class SearchStoreService {
    async execute({store} : SearchStore){
        
        const findStore = await prismaClient.storeUser.findMany({
            where: {
                description: {
                    contains: store,
                },
            },
            include: {
                category: {
                    select: {
                        name: true
                    }
                }
            }
        })

        return findStore
    }
}

export {SearchStoreService}