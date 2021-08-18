import React, { Fragment, useEffect } from "react";
import { LongTxt } from "../../cmps/util/LongTxt.jsx"
import { loadSongs } from "../../store/song/song.action.js";
import { loadUsers } from "../../store/user/user.action.js";
import { useDispatch, useSelector } from 'react-redux'


export const SingerProfile = () => {
  const dispatch = useDispatch()
  const { selectedSong } = useSelector(state => state.songModule)
  const { users } = useSelector(state => state.userModule)

  useEffect(() => {
    dispatch(loadSongs())
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    dispatch(loadUsers())
    console.log('userssss', users);
    // eslint-disable-next-line
  }, [])

  const findSingerUser = () => {
    const { id } = selectedSong.singer._id
    console.log('singer', selectedSong.singer._id);
    console.log('users', users);
    const user = users.find((user) => user._id === id)
    console.log('userrrr', user);
    return user

  }
  const userSinger = findSingerUser()
  
  return (
    <Fragment>
      <div className="contianer-hero">
        <img src={userSinger.imgHero} alt="" className="img-hero-artist" />
        <div className="artist-hero-title">
          <p>{userSinger.specializes}</p>
          <h1>{userSinger.fullname}</h1>
        </div>
      </div>
      <div className="main-artist">

        <div className="artist-details flex">
          <img src={userSinger.imgUrl} alt={userSinger.fullname} />
          <div className="text-description flex column align-center">
            <h4>About {userSinger.fullname}</h4>
            <p><LongTxt description={userSinger.description} /></p>
            <br />
          </div>
        </div>
      </div>
    </Fragment>
  )
}


