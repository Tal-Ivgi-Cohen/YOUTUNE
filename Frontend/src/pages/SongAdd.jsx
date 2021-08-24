import React, { useEffect }  from 'react';
import { SongForm } from '../cmps/SongForm.jsx';
import { saveSong } from '../store/song/song.action.js';
import { useDispatch, useSelector } from 'react-redux'

export const SongAdd = ({ history }) => {
  const dispatch = useDispatch()
  const { user } = useSelector(state => state.userModule)

  useEffect(() => {
    dispatch(saveSong())
    // eslint-disable-next-line
  }, [])


  return (
    <section className='add-song-page'>
      <SongForm history={history} saveSong={saveSong} user={user} />
    </section>
  );
}



