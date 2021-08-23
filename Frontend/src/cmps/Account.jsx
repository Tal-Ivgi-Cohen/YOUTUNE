import React, { Component } from 'react';
import { connect } from 'react-redux';
import { UserDashboard } from '../cmps/user/dashboard/UserDashboard.jsx';
import { LoginSignUpReset } from '../cmps/user/LoginSignUpReset.jsx';
import {
  loadLoggedInUser,
  login,
  logout,
  signup,
} from '../store/user/user.action.js';
import { removeSong, loadSongs } from '../store/song/song.action.js';

class _Account extends Component {
  componentDidMount() {
   if (this.props.loggedInUser === null) return
    this.props.loadLoggedInUser();
    if (!this.props.songs.length) this.props.loadSongs();
    const { tab } = this.props.match.params;
    if (!tab || tab === 'undefined') this.props.history.push('/account/login');
  }
  render() {
    const {
      loggedInUser,
      removeSong,
      songs,
      login,
      logout,
      signup,
    } = this.props;
    if (loggedInUser) {
      const userSongs = songs
      ? songs.filter((song) => song.singer._id === loggedInUser._id)
      : [];
      const userOrders = loggedInUser.orders;
      return (
        <div className='account-page'>
          <h3>Account</h3>
          <UserDashboard
            user={loggedInUser}
            userSongs={userSongs}
            userOrders={userOrders}
            removeSong={removeSong}
            logout={logout}
            tab={this.props.match.params.tab}
            history={this.props.history}
          />
        </div>
      );
    } else
      return (
        <div className='account-page'>
          <h3>Account</h3>
          <LoginSignUpReset
            login={login}
            signup={signup}
            history={this.props.history}
            tab={this.props.match.params.tab}
          />
        </div>
      );
  }
}

function mapStateToProps({ userModule, songModule }) {
  return {
    loggedInUser: userModule.loggedInUser,
    songs: songModule.songs,
  };
}

const mapDispatchToProps = {
 loadLoggedInUser,
  login,
  signup,
  logout,
  removeSong,
  loadSongs,
};

export const Account = connect(mapStateToProps, mapDispatchToProps)(_Account);
