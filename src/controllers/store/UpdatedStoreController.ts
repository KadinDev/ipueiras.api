import { Request, Response } from "express"
import {UpdatedStoreService} from '../../services/store/UpdatedStoreService'

class UpdatedStoreController{
    async handleUpdatedStore(req: Request, res: Response){
        const {
            name, 
            description, 
            latitude,
            longitude, 
            contact, 
            address, 
            images, 
            category_id,
            time,
            attendance,
            instagram
        } = req.body

        const user_id = req.user_id
        const store_id = req.query.store_id as string

        const store = new UpdatedStoreService()

        if(!name || !description){
            throw new Error("campos vazios não são permitidos")
        } else if (!req.file){
            throw new Error("error upload banner")
        } else {
            const {originalname, filename: banner} = req.file
            
            const storeUpdated = await store.execute({
                user_id,
                store_id,
                name,
                description,
                banner,
                images,
                address,
                contact,
                latitude,
                longitude,
                category_id,
                time,
                attendance,
                instagram
            })

            return res.json(storeUpdated)
        }
    }
}

export {UpdatedStoreController}