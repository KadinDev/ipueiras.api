import {Router} from 'express'
import multer from 'multer'
import uploadConfig from './config/multer'

// USER
import {AuthUserController} from './controllers/user/AuthUserController'
import {CreateUserController} from './controllers/user/CreateUserController'
import {DetailUserController} from './controllers/user/DetailUserController'

// STORE
import {CreateStoreUserController} from './controllers/store/CreateStoreUserController'
import {DetailStoreUserController} from './controllers/store/DetailStoreUserController'
import {ListAllStoreController} from './controllers/store/ListAllStoreController'
import {UpdatedStoreController} from './controllers/store/UpdatedStoreController'
import {DeleteStoreController} from './controllers/store/DeleteStoreController'
import {CheckVipController} from './controllers/store/CheckVipController'
import {SearchStoreController} from './controllers/store/SearchStoreController'

// CATEGORY
import {ListAllCategoryController} from './controllers/category/ListAllCategoryController'
import {SearchCategoryStoreController} from './controllers/store/SearchCategoryStoreController'


import {isAuthenticated} from './middlewares/isAuthenticated'

const upload = multer(uploadConfig.upload("./tmp"))

const router = Router()

// --- ROTAS USER --- //
router.get('/me', isAuthenticated, new DetailUserController().handleDetailUser)
router.post('/login', new AuthUserController().handleLoginUser)
router.post('/register', new CreateUserController().handleCreateUser)

// --- ROTAS STORE --- //
router.get('/home', new ListAllStoreController().handleListAllStoreController)
router.post('/home/search', new SearchStoreController().handleFindByStore)
router.get('/detail-store', new DetailStoreUserController().handleDetailStoreUser)
router.get('/my-store/check', isAuthenticated, new CheckVipController().handleCheckVip)
router.post('/new-store', isAuthenticated, upload.single('file'), new CreateStoreUserController().handleCreateStore)
router.put('/my-store/updated', isAuthenticated, upload.single('file'), new UpdatedStoreController().handleUpdatedStore)

router.delete('/my-store/delete', isAuthenticated, new DeleteStoreController().handleDeleteStore)

// --- CATEGORY --- //
router.get('/category', new ListAllCategoryController().handleListAllCategory)
router.post('/category', new SearchCategoryStoreController().handleSearchCategory)


export {router}