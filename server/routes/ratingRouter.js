const Router = require('express')
const router = new Router()
const ratingController = require('../controllers/ratingController')

router.post('/', ratingController.createRating)
router.put('/', ratingController.updateRating)
router.get('/user_rating/:id', ratingController.getUserRating)
router.get('/:id', ratingController.getRating)

module.exports = router
