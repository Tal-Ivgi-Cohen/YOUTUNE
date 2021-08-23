import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { userReducer } from './user/user.reducer.js';
import { songReducer } from './song/song.reducer.js';
import { playlistReducer } from './playlist/playlist.reducer.js';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
  userModule: userReducer,
  songModule: songReducer,
  playlistModule: playlistReducer
});


export const store = createStore(rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);
