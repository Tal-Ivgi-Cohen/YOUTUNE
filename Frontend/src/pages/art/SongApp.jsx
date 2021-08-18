import React, { useEffect } from 'react';
import { SongList } from '../../cmps/art/SongList.jsx';
import { loadSongs } from '../../store/song/song.action.js';
import { loadUsers } from "../../store/user/user.action.js";
import { useDispatch, useSelector } from 'react-redux'


export const SongApp = () => {
  const dispatch = useDispatch();
  const { songs } = useSelector(state => state.songModule)

  useEffect(() => {
    dispatch(loadSongs())
  }, [])

  useEffect(() => {
    dispatch(loadUsers())
  }, [])

  return (
    <div>
      <div className='main-container'>
        <section className='art-container'>
          <main>
            <SongList songs={songs} />
          </main>
        </section>
      </div>
    </div>
  );
}