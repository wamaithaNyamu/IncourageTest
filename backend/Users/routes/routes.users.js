import express from 'express'
const router = express.Router()

import { getUser, getAllUsers } from '../controllers/controllers.GET.js'
import {postUser} from '../controllers/controllers.POST.js'
import {putUser} from '../controllers/controllers.PUT.js'


router.route('/').get(getAllUsers)
router.route('/:id').get(getUser)
router.route('/:id').put(putUser)
router.route('/').post(postUser)

export default router
