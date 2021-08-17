import { connect } from 'react-redux';
import React from 'react';
import { SongList } from '../../cmps/art/SongList.jsx';
import { loadSongs } from '../../store/song/song.action.js';
import { loadUsers } from "../../store/user/user.action.js";

class _SongApp extends React.Component {

  componentDidMount() {
    this.props.loadSongs();
    this.props.loadUsers();
  }
  render() {
    const { songs } = this.props;
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
}

function mapStateToProps({ songModule }) {
  return {
    songs: songModule.songs,
  };
}

const mapDispatchToProps = {
  loadSongs,
  loadUsers
};

export const SongApp = connect(mapStateToProps, mapDispatchToProps)(_SongApp);
