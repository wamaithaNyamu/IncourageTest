import express from 'express'
const router = express.Router()

import { getClaim, getAllClaims,getClaimByUserPhone } from '../controllers/controllers.GET.js'
import {postClaim,postClaimByUSSD} from '../controllers/controllers.POST.js'
import {putClaim,putAttachment} from '../controllers/controllers.PUT.js'


router.route('/:id').get(getClaim)
router.route('/ussd/:phone').get(getClaimByUserPhone)

router.route('/:id').put(putClaim)
router.route('/attachment/:id').put(putAttachment)
router.route('/').get(getAllClaims)
router.route('/').post(postClaim)
router.route('/ussd/:phone').post(postClaimByUSSD)

export default router
