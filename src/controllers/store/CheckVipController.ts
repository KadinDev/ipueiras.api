import { Request, Response } from 'express'
import {CheckVipService} from '../../services/store/CheckVipService'

class CheckVipController{
    async handleCheckVip(req: Request, res: Response){

        const user_id = req.user_id // lembra do @types

        const checkVip = new CheckVipService()

        const status = await checkVip.execute({
            user_id
        })

        return res.json(status)
    }
}

export {CheckVipController}