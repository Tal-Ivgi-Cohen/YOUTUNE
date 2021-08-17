const initialState = {
    songs: [],
    selectedSong: null,
};

export function songReducer(state = initialState, action = {}) {
    switch (action.type) {
        case 'SET_SONGS':
            return { ...state, songs: action.songs };
        case 'SET_SONG':
            return { ...state, selectedSong: action.song };
        case 'ADD_SONG':
            return { ...state, songs: [...state.songs, action.song] };
        case 'UPDATE_SONG':
            return { ...state, songs: [ ...state.songs.filter(song => action.song._id !== song._id),action.song] };
        case 'REMOVE_SONG':
            return { ...state, songs: state.songs.filter(song => song._id !== action.songId) };
        default:
            return state;
    }
}
