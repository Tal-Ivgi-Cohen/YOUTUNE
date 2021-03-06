import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';
import { setSong, loadSongs } from '../store/song/song.action.js';
import { Loader } from '../cmps/Loader.jsx';
import { useDispatch, useSelector } from 'react-redux'


export const SongDetails = ({ match}) => {
  const dispatch = useDispatch()
  const { selectedSong} = useSelector(state => state.songModule)

  useEffect(() => {
    const loadSong = async () => {
      const { songId } = match.params
      await dispatch(setSong(songId))
    }
    loadSong()
    // eslint-disable-next-line
  }, [match.params.songId])

  useEffect(() => {
    dispatch(loadSongs())
    // eslint-disable-next-line
  }, [])

  if (!selectedSong) return <Loader />;
  return (
    <div>
      {selectedSong && (
        <div className="main">
          <section className="main-art-details flex">
            <div className="imgs flex">
              <div className="content-img">
                <div className="container-img">
                  <img
                  className="song-img"
                    src={selectedSong.imgUrl}
                    alt={selectedSong.imgUrl}
                  />
                </div>
              </div>
            </div>
            <div className="content-txt">
              <div className="art-details">
                <p>{selectedSong.singer?.fullname || ""}</p>
                <h1>{selectedSong.title}</h1>
                <p>{selectedSong.year}</p>
                <button className="link-btn"><a href={selectedSong.link}>Listen 🎧</a></button>
              </div>

              <div className="details-modals">
              </div>
              <br />
              <p>DESCRIPTION</p>
              <br />
              <p>{selectedSong.description}</p>
            </div>
          </section>
          <div className="artist-list-details flex  column space-between">
            <Link to={`/singer/${selectedSong.singer._id}`}>
              <button className="btn-more-work">More details about {selectedSong.singer.fullname}
              </button>
              {" "}
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}



