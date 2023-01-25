import express from 'express'
const router = express.Router()

import { getPolicy, getAllPolicies } from '../controllers/controllers.GET.js'
import {postPolicy} from '../controllers/controllers.POST.js'
import {putPolicy} from '../controllers/controllers.PUT.js'


router.route('/:id').get(getPolicy)
router.route('/:id').put(putPolicy)
router.route('/').get(getAllPolicies)
router.route('/').post(postPolicy)

export default router
