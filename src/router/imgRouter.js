const {Router} = require('express')

const {getImgs} = require('../controller/imgController')

const router = Router()

router.get('/imgs', getImgs);

module.exports = router