import prismaClient from "../../prisma"

interface CheckVip{
    user_id: string
}

class CheckVipService{
    async execute({user_id} : CheckVip){

        const status = prismaClient.user.findFirst({
            where: {
                id: user_id
            },
            select: {
                store: {
                    select: {
                        subscriptions: {
                            select: {
                                id: true,
                                status: true
                            }
                        }
                    }
                }
            }
        })

        return status
    }
}

export {CheckVipService}