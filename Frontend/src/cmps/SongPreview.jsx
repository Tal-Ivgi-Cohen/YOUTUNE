import React from 'react';
import { Link } from 'react-router-dom';

export const SongPreview = ({ song }) => {
  return (
    <div className='song-preview flex'>
      <Link to={`/song/${song._id}`}>
        <div className='content-img-card'>
          <img src={song.imgUrl} alt='' />
        </div>
        <div className='content-card flex column'>
          <h4>{song.title}</h4>
          <p>{song.singer.fullname}</p>
          <h5>{song.year}</h5>
        </div>
      </Link>
    </div>
  );
}
