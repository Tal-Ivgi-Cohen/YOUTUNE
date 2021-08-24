import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { MobileTable } from './tables/MobileTable';
import { DesktopTable } from './tables/DesktopTable';

export const UserSongs=({ songs, removeSong, isMobileView }) => {
  const getDesktopTable = () => {
    const columns = [
      'Image',
      'Title',
      'Year',
      'Delete',
    ];
    const data = songs.map((song) => {
      return {
        details: [
          <img className='song-img' src={song.imgUrl} alt={song.imgUrl} />,
          song.title,
          song.year,
          <Button onClick={() => removeSong(song._id)}>
            <DeleteIcon />
          </Button>,
        ],
      };
    });
    return { columns, data };
  };
  const getMobileTable = () => {
    const columns = [
      'Thumbnail',
      'Title',
      'Year',
    ];
    const data = songs.map((song) => {
      const details = [
        song.title,
        <img className='song-img' src={song.imgUrl} alt={song.imgUrl} />,
        song.year,
      ];
      const btns = [
        <Button onClick={() => removeSong(song._id)}>
          <DeleteIcon />
        </Button>,
      ];
      return { details, btns };
    });
    return { columns, data };
  };

  return (
    <section className='user-songs'>
      <section className='header'>
        <h3>Songs</h3>
        <Link to={'/song/add'}>
          <Button className='song-add-btn' variant='outlined'>
            Add
          </Button>
        </Link>
      </section>
      <section className='content'>
        {isMobileView ? (
          <MobileTable
            table={getMobileTable()}
            emptyTxt="You don't have any songs yet. You can add through the 'Add' button above."
          />
        ) : (
          <DesktopTable
            table={getDesktopTable()}
            emptyTxt="You don't have any songs yet. You can add through the 'Add' button above."
          />
        )}
      </section>
    </section>
  );
}
