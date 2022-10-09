import prismaClient from "../../prisma"

class DetailUserService{
    async execute(user_id: string){

        // findFirst = encontrar o primeiro que achar
        const user = await prismaClient.user.findFirst({
            // pegar apenas as informações desse usuário no DB
            where: {
                id: user_id
            },
            select: {
                id: true,
                name: true,
                email: true,
                create_at: true,
                updated_at: true,
                
                // pegar da loja
                store: {
                    select: {
                        id: true,
                        name: true,
                        subscriptions: {
                            select: {
                                id: true,
                                priceId: true,
                                status: true
                            }
                        }
                    }
                }
            }
        })

        return user
    }
}

export {DetailUserService}