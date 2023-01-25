import express from 'express'
const router = express.Router()

import { getClaim, getAllClaims } from '../controllers/controllers.GET.js'
import {postClaim} from '../controllers/controllers.POST.js'
import {putClaim} from '../controllers/controllers.PUT.js'


router.route('/:id').get(getClaim)
router.route('/:id').put(putClaim)
router.route('/').get(getAllClaims)
router.route('/').post(postClaim)

export default router
