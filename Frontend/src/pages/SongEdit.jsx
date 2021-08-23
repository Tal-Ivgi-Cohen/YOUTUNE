import React, { useEffect } from 'react';
import { SongForm } from '../cmps/SongForm.jsx';
import { setSong, saveSong } from '../store/song/song.action.js';
import { Loader } from '../cmps/Loader';
import { useDispatch, useSelector } from 'react-redux'

export const SongEdit = ({ match, history }) => {
  const dispatch = useDispatch()
  const { user } = useSelector(state => state.userModule)
  const { selectedSong } = useSelector(state => state.songModule)

  useEffect(() => {
    async function loadSong() {
      const { songId } = match.params;
      await dispatch(setSong(songId));
    }
    loadSong()
  }, []);

  const { songId } =match.params;
  return selectedSong && selectedSong._id === songId ? (
    <SongForm
      selectedSong={selectedSong}
      saveSong={saveSong}
      history={history}
      user={user}
    />
  ) : (
    <Loader />
  );
}


