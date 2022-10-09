import prismaClient from "../../prisma"

class ListAllStoreService {
    async execute(){
        const stores = await prismaClient.storeUser.findMany({
            orderBy: {
                created_at: 'desc'
            },
            include: {
                author: {
                    select: {
                        id: true,
                        name: true,
                        email: true
                    }
                },
                subscriptions: {
                    select: {
                        id: true,
                        status: true,
                    }
                },
                category: {
                    select: {
                        id: true,
                        name: true
                    }
                }
            }
        })

        return stores
    }
}

export {ListAllStoreService}