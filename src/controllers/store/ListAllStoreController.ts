import {Request, Response} from 'express'
import {ListAllStoreService} from '../../services/store/ListAllStoreService'

class ListAllStoreController {
    async handleListAllStoreController(req: Request, res: Response){
        const allStores = new ListAllStoreService()
        const stores = await allStores.execute()

        return res.json(stores)
    }
}

export {ListAllStoreController}