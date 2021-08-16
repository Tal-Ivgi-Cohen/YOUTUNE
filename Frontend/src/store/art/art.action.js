import { artService } from '../../services/art.service.js';

export function loadArts(filterBy) {
    return async dispatch => {
        try {
        const arts = await artService.loadArts(filterBy);
            dispatch({ type: 'SET_ARTS', arts });
        } catch (err) {
            console.log('Art Actions: err in loaded Arts', err);
        }
    };
}
export function removeArt(artId) {
    return async dispatch => {
        try {
            await artService.remove(artId);
            dispatch({ type: 'REMOVE_ART', artId });
        } catch (err) {
           console.log('ArtActions: err in removeArt', err);
        }
    };
}
export function saveArt(art) {
    return async dispatch => {
        try {
            await artService.save(art)
            dispatch({ type: art._id ? 'UPDATE_ART' : 'ADD_ART', art: art })
        } catch (err) {
           console.log(`ToysActions: err in ${art._id ? 'update art' : 'add art'}${err}`)
        }
    }
}

export function setArt(artId) {
    return async dispatch => {
        try {
            const art = await artService.getById(artId);
            dispatch({ type: 'SET_ART', art });
        } catch (err) {
           console.log('Art Actions: err in selected Art', err);
        }
    };
}
