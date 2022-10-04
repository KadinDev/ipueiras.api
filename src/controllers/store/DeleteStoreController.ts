import { Request, Response } from "express"
import {DeleteStoreService} from '../../services/store/DeleteStoreService'

class DeleteStoreController{
    async handleDeleteStore(req: Request, res: Response){
        const user_id = req.user_id

        const store_id = req.query.store_id as string
        
        const removeStore = new DeleteStoreService()
        
        const store = await removeStore.execute({
            user_id,
            store_id,
        })

        return res.json(store)
    }
}

export {DeleteStoreController}