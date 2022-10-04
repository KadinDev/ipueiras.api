import {Request, Response} from 'express'
import {DetailsStoreUserService} from '../../services/store/DetailsStoreUserService'

class DetailStoreUserController{
    async handleDetailStoreUser(req: Request, res: Response){
        const store_id = req.query.store_id as string
        const detailStore = new DetailsStoreUserService()
        
        const store = await detailStore.execute({
            store_id
        })

        return res.json(store)
    }
}

export {DetailStoreUserController}