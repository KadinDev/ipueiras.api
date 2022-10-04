import { Request, Response } from 'express'
import { SearchStoreService } from '../../services/store/SearchStoreService'

class SearchStoreController{
    async handleFindByStore(req: Request, res: Response){
        const {store} = req.body

        const searchStore = new SearchStoreService()

        const result = await searchStore.execute({
            store
        })

        return res.json(result)
    }
}

export {SearchStoreController}