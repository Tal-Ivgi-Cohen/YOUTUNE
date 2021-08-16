import { httpService } from './http.service.js';
//import { storageService } from './art-storage.service.js';

//const STORAGE_KEY = 'arts';

export const artService = {
    // query,
    getById,
    save,
    remove,
    loadArts

};

async function loadArts(filterBy) {
    const arts = await httpService.get('art', filterBy);
   // console.log('service', filterBy);
    // const arts = await storageService.query(STORAGE_KEY,filterBy ); // instead of this line
    // return await storageService.loadArtsWithArtists(arts);
    return arts
}

async function getById(artId) {
    //return await storageService.get('arts', artId);
    const art = await httpService.get(`art/${artId}`);
   // console.log('art', art);
    return art;
}
async function remove(artId) {
    //return await storageService.remove('arts', artId);
    return httpService.delete(`art/${artId}`)
}
async function save(art) {
    if (art._id) {
        //return await storageService.put('arts', art);
        return await httpService.put(`art/${art._id}`, art)
    } else {
        //return await storageService.post('arts', art);
        return httpService.post('art', art)

    }
}
// export function filter(filterBy){
//     if (filterBy !== 'all'){
//         console.log('service',filterBy);
//             //  return axios.get(BASE_URL).then(toys=>
//             // toys.data.filter(toy => toy.inStock === filterBy || toy.type === filterBy || toy.name.includes(filterBy)))
//         return httpService.get('toy/', filterBy)    

//     }else{
//        return query()
//         }
//     }
