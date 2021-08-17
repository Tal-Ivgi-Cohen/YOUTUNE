import React, { Fragment } from "react";
import { connect } from "react-redux";
import { SongList } from "../../cmps/art/SongList.jsx";
import { LongTxt } from "../../cmps/util/LongTxt.jsx"
import { loadSongs } from "../../store/song/song.action.js";
import { loadUsers } from "../../store/user/user.action.js";

export class _SingerProfile extends React.Component {

  state = {
    filterBy: {
      singerId: "",
    }
  }
  componentDidMount() {
    const { loadSongs, selectedSong  } = this.props;
    const { _id, singer } = selectedSong;
    const filterBy = {
      _id,
      singerId: singer._id,
    };
    this.setState({ filterBy }, () => {
      loadSongs(this.state.filterBy);
    });
  }
  findSingerUser = () => {
    const user = this.props.users.find((user) => user._id === this.props.singer._id)
    console.log('user in singlePro', user);
    return user
  }

  render() {
    const { singer } = this.props;
    const userSinger = this.findSingerUser()

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
            <img src={userSinger.imgUrl} alt={singer.fullname} />
            <div className="text-description flex column align-center">
              <h4>About {userSinger.fullname}</h4>
              <p><LongTxt description={userSinger.description} /></p>
              <br />
            </div>
          </div>
          <SongList songs={this.props.songs} singer={singer.fullname} />
        </div>
      </Fragment>
    )
  }
}


const mapStateToProps = (state) => {
  return {
    selectedSong: state.songModule.selectedSong,
    songs: state.songModule.songs,
    singer: state.songModule.selectedSong.singer,
    users: state.userModule.users
  }
}

const mapDispatchToProps = {
  loadUsers,
  loadSongs,
}
export const SingerProfile = connect(
  mapStateToProps,
  mapDispatchToProps
)(_SingerProfile);