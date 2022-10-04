import {Request, Response} from 'express'

import {SearchCategoryStoreService} from '../../services/store/SearchCategoryStoreService'

class SearchCategoryStoreController{
    async handleSearchCategory(req: Request, res: Response){
        const {category_id} = req.body

        const searchStore = new SearchCategoryStoreService()

        const result = await searchStore.execute({
            category_id
        })

        return res.json(result)
    }
}

export {SearchCategoryStoreController}