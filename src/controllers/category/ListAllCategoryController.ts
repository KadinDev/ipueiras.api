import {Request, Response} from 'express'
import {ListAllCategoryService} from '../../services/category/ListAllCategoryService'

class ListAllCategoryController{
    async handleListAllCategory(req: Request, res: Response){
        const selectAllCategory = new ListAllCategoryService()
        const category = await selectAllCategory.execute()

        return res.json(category)
    } 
}

export {ListAllCategoryController}