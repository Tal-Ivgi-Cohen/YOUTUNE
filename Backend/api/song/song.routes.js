const express = require('express')
const { requireSinger } = require('../../middlewares/requireAuth.middleware')
const { getSongs, getSong, deleteSong, updateSong, addSong } = require('./song.controller')
const router = express.Router()

router.get('/', getSongs)
router.get('/:id', getSong)
router.put('/:id', updateSong)
router.post('/', requireSinger, addSong)
router.delete('/:id',requireSinger, deleteSong)


module.exports = router