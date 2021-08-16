const logger = require('../../service/logger.service')
const artService = require('./art.service')

module.exports = {
    getArts,
    deleteArt,
    addArt,
    updateArt,
    getArt
}

async function getArt(req, res) {
    try {
        const art = await artService.getById(req.params.id)
        res.send(art)
    } catch (err) {
        logger.error('Failed to get toy', err)
        res.status(500).send({ err: 'Failed to get toy' })
    }
}

async function getArts(req, res) {
    console.log('req.query', req.query);
    const filterBy = {}
    const { _id, artistId } = req.query
    //console.log('getArts', req.query);
    try {
        filterBy['_id'] = _id
        filterBy.artistId = artistId
        const arts = await artService.query(filterBy)
        res.send(arts)
    } catch (err) {
        console.log('Cannot get arts', err);
        res.status(500).send({ err: 'Failed to get arts' })
    }
}

async function deleteArt(req, res) {
    try {
        await artService.remove(req.params.id)
        res.send({ msg: 'Deleted successfully' })
    } catch (err) {
        logger.error('Failed to delete toy', err)
        res.status(500).send({ err: 'Failed to delete art' })
    }
}
async function updateArt(req, res) {
    try {
        const art = req.body
        const savedArt = await artService.update(art)
        res.send(savedArt)
    } catch (err) {
        //logger.error('Failed to update art', err)
        res.status(500).send({ err: 'Failed to update art' })
    }
}


async function addArt(req, res) {
    try {
        var art = req.body
        const savedArt = await artService.add(art)
        res.send(savedArt)
    } catch (err) {
        logger.error('Failed to add toy', err)
        res.status(500).send({ err: 'Failed to add toy' })
    }
}
