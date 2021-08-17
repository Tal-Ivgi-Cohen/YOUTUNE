import { songService } from '../../services/song.service';

export function loadSongs(filterBy) {
    return async dispatch => {
        try {
        const songs = await songService.query(filterBy);
            dispatch({ type: 'SET_SONGS', songs });
        } catch (err) {
            console.log('Song Actions: err in loaded Songs', err);
        }
    };
}
export function removeSong(songId) {
    return async dispatch => {
        try {
            await songService.remove(songId);
            dispatch({ type: 'REMOVE_SONG', songId });
        } catch (err) {
           console.log('SongActions: err in removeSong', err);
        }
    };
}
export function saveSong(song) {
    return async dispatch => {
        try {
            await songService.save(song)
            dispatch({ type: song._id ? 'UPDATE_SONG' : 'ADD_SONG', song: song })
        } catch (err) {
           console.log(`SongsActions: err in ${song._id ? 'update song' : 'add song'}${err}`)
        }
    }
}

export function setSong(songId) {
    return async dispatch => {
        try {
            const song = await songService.getById(songId);
            dispatch({ type: 'SET_SONG', song });
        } catch (err) {
           console.log('Song Actions: err in selected Song', err);
        }
    };
}
