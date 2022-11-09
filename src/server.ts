import express, {Request, Response, NextFunction} from 'express'
import 'express-async-errors'
import cors from 'cors'
import path from 'path'

import {router} from './routes'

const app = express()
app.use(express.json())
//app.use(cors())

app.use(router)
// caso queira dizer qual front terá acesso ao back
/*
app.use(cors({
    origin: 'http://exemplo.com.br'
}))
*/
app.use(
    '/files', // qual será a rota
    // criando rota estática, onde vou passar a rota(/files), com o nome da foto conforma informado abaixo 
    express.static(path.resolve(__dirname, '..', 'tmp'))
)

app.use((
    err: Error, 
    req: Request, 
    res: Response, 
    next: NextFunction
) => {
    if(err instanceof Error){
        return res.status(400).json({
            error: err.message
        })
    }

    return res.status(500).json({
        status: 'error',
        message: 'Internal server error.'
    })
})

app.listen(3333, () => console.log('Server Online!'))