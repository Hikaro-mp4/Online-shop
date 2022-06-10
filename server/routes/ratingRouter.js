const Router=require('express')
const router=new Router()
const ratingController=require('../controllers/ratingController')
const authMiddleware = require('../middleware/authMiddleware')
const checkRole=require('../middleware/checkRoleMiddleware')

router.post('/',authMiddleware, ratingController.create)
router.get('/',ratingController.getRating)

router.put('/',authMiddleware, ratingController.update)

module.exports=router