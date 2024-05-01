const {Router} = require('express')

const {generateVideo} = require('../controller/videoController')

const router = Router()

router.post('/generate', generateVideo);

router.get('/video')


module.exports = router