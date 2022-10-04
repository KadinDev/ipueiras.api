import prismaClient from "../../prisma"

interface CategoryRequest {
    category_id: string;
}

class SearchCategoryStoreService {
    async execute({category_id} : CategoryRequest){
        const findByCategory = await prismaClient.storeUser.findMany({
            where: {
                categoryId: category_id
            },
            include: {
                author: {
                    select: {
                        id: true,
                        name: true
                    }
                },
                category: {
                    select: {
                        name: true,
                    }
                },
                subscriptions: {
                    select: {
                        id: true,
                        status: true
                    }
                }
            }
        })

        return findByCategory
    }
}

export {SearchCategoryStoreService}