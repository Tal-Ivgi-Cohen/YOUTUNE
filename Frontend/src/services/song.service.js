import { httpService } from './http.service.js';

export const songService = {
    query,
    getById,
    save,
    remove,
};

async function query(filterBy) {
    const songs = await httpService.get('song', filterBy);
    return songs
}

async function getById(songId) {
    const song = await httpService.get(`song/${songId}`);
    return song;
}

async function remove(songId) {
    return httpService.delete(`song/${songId}`)
}

async function save(song) {
    if (song._id) {
        return await httpService.put(`song/${song._id}`, song)
    } else {
        return httpService.post('song', song)

    }
}