import { playlistService } from '../../services/playlist/playlist.service.js'

export function removePlayItem(playItemId) {
    return async () => {
        try {
            await playlistService.remove(playItemId);
        } catch (err) {
        console.log('ArtActions: err in removeArt', err);
        }
    };
}
export function savePlayItem(playItem) {
    return async () => {
        try {
            await playlistService.add(playItem);
        } catch (err) {
        console.log('CartActions: err in saveCart', err);
        }

    };
}
