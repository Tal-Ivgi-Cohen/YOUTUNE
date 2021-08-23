const initialState = {
    playlistItems: [],
};

export function playlistReducer(state = initialState, action = {}) {
    switch (action.type) {
        case 'SET_PLAYLIST_ITEMS':
            return { ...state, cartItems: action.cartItems };
        default:
            return state;
    }
}
