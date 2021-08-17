const express = require('express')
const {requireAuth, requireSinger} = require('../../middlewares/requireAuth.middleware')
const {getUser, getUsers, deleteUser, updateUser} = require('./user.controller')
const router = express.Router()


router.get('/', getUsers)
router.get('/:id', getUser)
router.put('/:id',  updateUser)
router.delete('/:id',  requireAuth, requireSinger, deleteUser)

module.exports = router