import crypto from 'crypto'
import {extname, resolve} from 'path'

import multer from 'multer'

export default {
    upload( folder: string ){
        return {
            storage: multer.diskStorage({
                destination: resolve(__dirname, '..', '..', folder),
                filename: (request, file, callback) => {
                    const fileMash = crypto.randomBytes(16).toString("hex")
                    const fileName = `${fileMash}-${file.originalname}`

                    return callback(null, fileName)
                }
            })
        }
    }
}