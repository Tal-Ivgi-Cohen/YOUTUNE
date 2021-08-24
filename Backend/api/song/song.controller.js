const logger = require('../../service/logger.service')
const songService = require('./song.service')

module.exports = {
    getSongs,
    deleteSong,
    addSong,
    updateSong,
    getSong
}

async function getSong(req, res) {
    try {
        const song = await songService.getById(req.params.id)
        res.send(song)
    } catch (err) {
        logger.error('Failed to get song', err)
        res.status(500).send({ err: 'Failed to get song' })
    }
}

async function getSongs(req, res) {
    const filterBy = {}
    const { _id, singerId } = req.query
    try {
        filterBy['_id'] = _id
        filterBy.singerId = singerId
        const songs = await songService.query(filterBy)
        res.send(songs)
    } catch (err) {
        console.log('Cannot get songs', err);
        res.status(500).send({ err: 'Failed to get songs' })
    }
}

async function deleteSong(req, res) {
    try {
        await songService.remove(req.params.id)
        res.send({ msg: 'Deleted successfully' })
    } catch (err) {
        logger.error('Failed to delete song', err)
        res.status(500).send({ err: 'Failed to delete song' })
    }
}
async function updateSong(req, res) {
    try {
        const song = req.body
        const savedSong = await songService.update(song)
        res.send(savedSong)
    } catch (err) {
        logger.error('Failed to update song', err)
        res.status(500).send({ err: 'Failed to update song' })
    }
}


async function addSong(req, res) {
    try {
        var song = req.body
        const savedSong = await songService.add(song)
        res.send(savedSong)
    } catch (err) {
        logger.error('Failed to add song', err)
        res.status(500).send({ err: 'Failed to add song' })
    }
}
