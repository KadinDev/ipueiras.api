import {Request, Response} from 'express'
import {CreateStoreUserService} from '../../services/store/CreateStoreUserService'

class CreateStoreUserController{
    async handleCreateStore(req: Request, res: Response){
        const { 
            name, 
            description, 
            latitude, 
            longitude,
            contact,
            address,
            time,
            attendance,
            instagram,
            category_id
        } = req.body
        
        const user_id = req.user_id // id do usuário logado

        const createStore = new CreateStoreUserService()

        if(!req.file){
            throw new Error("error upload banner")
        } else {
            const {originalname, filename: banner} = req.file

            const store = await createStore.execute({
                user_id,
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
            })

            return res.json(store)
        }
    }
}

export {CreateStoreUserController}