import { storageService } from './playlist-storage.service.js';

const STORAGE_KEY = 'playlist';

export const playlistService = {
    query,
    remove,
    add,

};

async function query() {
    return await storageService.query(STORAGE_KEY);
}

async function remove(itemId) {
   const playlist = await storageService.remove(STORAGE_KEY, itemId)
   return playlist
}
async function add(item) {
    const playlist = await storageService.post(STORAGE_KEY, item)
    console.log('playlist',playlist);
    return playlist
}
