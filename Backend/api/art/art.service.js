const dbService = require('../../service/db.service.js')
const ObjectId = require('mongodb').ObjectId
const logger = require('../../service/logger.service')

async function query(filterBy) {
    let criteria = {}
    if (filterBy._id) {
        //console.log('filterBy serverr', filterBy);
        criteria = _buildCriteria(filterBy)
    }
    try {
      //  console.log('filterBy service bk', criteria);
        const collection = await dbService.getCollection('art')
   //     console.log('criteria', criteria);
        var arts = await collection.find(criteria).toArray()
        return arts
    } catch (err) {
        logger.error('cannot find arts', err)
        console.log('cannot find arts', err);
        throw err
    }
}

async function getById(artId) {
    try {
        const collection = await dbService.getCollection('art')
        const art = await collection.findOne({ '_id': ObjectId(artId) })
        return art
    } catch (err) {
        logger.error(`while finding art ${artId}`, err)
        throw err
    }
}


async function remove(artId) {
    console.log('artId', artId);
    try {
        const collection = await dbService.getCollection('art')
        await collection.deleteOne({ '_id': ObjectId(artId) })
       // console.log(`remove art ${toyId}`)
    } catch (err) {
        console.log(`cannot remove art ${artId}`, err)
        throw err
    }
}
async function update(art) {
    try {
        // peek only updatable fields!
        const artToSave = {
            _id: ObjectId(art._id),
            title: art.title,
            price: art.price,
           category: art.category,
            technique: art.technique,
            description: art.description,
            style: art.style,
            color: art.color,
            size: art.size,
            material: art.material,
            imgUrl: art.imgUrl, 
        }
        const collection = await dbService.getCollection('art')
        await collection.updateOne({ '_id': artToSave._id }, { $set: artToSave })
        return artToSave;
    } catch (err) {
        logger.error(`cannot update art ${art._id}`, err)
        throw err
    }
}

async function add(art) {
   try {

         // peek only updatable fields!
         const artToAdd = {
            title: art.title,
            price: art.price,
            category: art.category,
            technique: art.technique,
            color:art.color
         }
         const collection = await dbService.getCollection('art')
         await collection.insertOne(artToAdd)
         return artToAdd;
     } catch (err) {
         logger.error('cannot insert art', err)
         throw err
     }
 }

function _buildCriteria(filterBy) {
    const criteria = {}
    const _id = (filterBy._id) ? filterBy._id : ''
    const artistId = (filterBy.artistId) ? filterBy.artistId : ''
    //console.log('filterBy', filterBy);
    criteria.artistId = {
        $in:[
            {
                artistId: artistId
            }
        ]
    }
    
    return criteria
}


function _buildCriteria(filterBy) {
    const criteria = {}
    const _id = (filterBy._id) ? filterBy._id : ''
    const artistId = (filterBy.artistId) ? filterBy.artistId : ''
    console.log('filterBy', filterBy);
    criteria.$or = [
        {
            _id: _id
        },
        {
            artistId: artistId
        }
    ]
    return criteria
}

module.exports = {
    query,
    remove,
    add,
    getById,
    update,
}
 