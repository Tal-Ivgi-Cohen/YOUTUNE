const dbService = require('../../service/db.service.js')
const ObjectId = require('mongodb').ObjectId
const logger = require('../../service/logger.service')

async function query(filterBy) {
    let criteria = {}
    if (filterBy._id) {
        criteria = _buildCriteria(filterBy)
    }
    try {
        const collection = await dbService.getCollection('song')
        var songs = await collection.find(criteria).toArray()
        return songs
    } catch (err) {
        logger.error('cannot find songs', err)
        console.log('cannot find songs', err);
        throw err
    }
}

async function getById(songId) {
    try {
        const collection = await dbService.getCollection('song')
        const song = await collection.findOne({ '_id': ObjectId(songId) })
        return song
    } catch (err) {
        logger.error(`while finding song ${songId}`, err)
        throw err
    }
}


async function remove(songId) {
    console.log('songId', songId);
    try {
        const collection = await dbService.getCollection('song')
        await collection.deleteOne({ '_id': ObjectId(songId) })
    } catch (err) {
        console.log(`cannot remove song ${songId}`, err)
        throw err
    }
}
async function update(song) {
    try {
        const songToSave = {
            _id: ObjectId(song._id),
            title: song.title,
            year: song.year,
        }
        const collection = await dbService.getCollection('song')
        await collection.updateOne({ '_id': songToSave._id }, { $set: songToSave })
        return songToSave;
    } catch (err) {
        logger.error(`cannot update song ${song._id}`, err)
        throw err
    }
}

async function add(song) {
   try {
         const songToAdd = {
            title: song.title,
            year: song.year,
         }
         const collection = await dbService.getCollection('song')
         await collection.insertOne(songToAdd)
         return songToAdd;
     } catch (err) {
         logger.error('cannot insert song', err)
         throw err
     }
 }

function _buildCriteria(filterBy) {
    const criteria = {}
    const _id = (filterBy._id) ? filterBy._id : ''
    const singerId = (filterBy.singerId) ? filterBy.singerId : ''
    criteria.artistId = {
        $in:[
            {
                singerId: singerId
            }
        ]
    }
    
    return criteria
}

module.exports = {
    query,
    remove,
    add,
    getById,
    update,
}
 