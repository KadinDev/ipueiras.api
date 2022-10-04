import prismaClient from '../../prisma'
import {hash} from 'bcryptjs'

interface UserRequest {
    name: string,
    email: string,
    password: string
}

class CreateUserService {
    async execute({name, email, password} : UserRequest){
        if(!email){
            throw new Error("Email incorreto!")
        }
        // se o e-mail já existe
        // findFirst = buscar o primeiro que encontrar
        const emailAlreadyExists = await prismaClient.user.findFirst({
            where: {
                email: email
            }
        })

        if(emailAlreadyExists){
            throw new Error("Já existe um usuário com o e-mail informado!")
        }

        const passwordHash = await hash(password, 8)
        
        // criando user no banco
        const user = await prismaClient.user.create({
            data: {
                name,
                email,
                password: passwordHash
            },
            select: {
                id: true,
                name: true,
                email: true,
            }
        })

        return user
    }
}

export {CreateUserService}