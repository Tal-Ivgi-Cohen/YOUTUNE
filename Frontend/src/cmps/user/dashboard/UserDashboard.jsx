import React, { Component } from 'react';
import { UserSongs } from './UserSongs.jsx';
import { UserDetails } from './UserDetails.jsx';
import { songService } from '../../../services/song.service.js'
import { DesktopTabs } from './tabs/DesktopTabs.jsx';
import { MobileTabs } from './tabs/MobileTabs.jsx';

export class UserDashboard extends Component {
  state = {
    currTab: 'details',
    songs: [],
    isMobileView: false,
  };

  async componentDidMount() {
    const setResponsiveness = () => {
      return window.innerWidth < 900
        ? this.setState({ isMobileView: true })
        : this.setState({ isMobileView: false });
    };
    setResponsiveness();
    window.addEventListener('resize', () => setResponsiveness());

    this.props.history.push(`/account/${this.state.currTab}`);
    const { tab } = this.props;
    if (tab && this.tabs.includes(tab)) {
      this.setCurrTab(tab);
    }
    await this.setSongs();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', () => this.setResponsiveness());
  }

  setSongs = async () => {
    const songs = [];
    await this.props.userOrders.forEach(async (order) => {
      const song = await songService.getById(order.songId);
      songs.push(song);
    });
    this.setState({ songs });
  };

  setCurrTab = (tab) => {
    if (tab === 'logout') {
      this.props.logout();
      tab = 'details';
    }
    this.setState({ currTab: tab });
    this.props.history.push(`/account/${tab}`);
  };
  getCurrTab = () => {
    const { currTab, isMobileView } = this.state;
    const { user, userSongs, removeSong, updateUser } = this.props;
    switch (currTab) {
      case 'details':
        return <UserDetails user={user} updateUser={updateUser} />;
      case 'songs':
        return (
          <UserSongs
            songs={userSongs}
            removeSong={removeSong}
            isMobileView={isMobileView}
          />
        );
      default:
        return <UserDetails user={user} updateUser={updateUser} />;
    }
  };

  tabs = this.props.user.isSinger
    ? ['details', 'songs', 'logout']
    : ['details', 'logout'];

  render() {
    const { currTab, isMobileView } = this.state;
    return (
      <div className='user-dashboard'>
        <section className='tabs'>
          {isMobileView ? (
            <MobileTabs
              currTab={currTab}
              setCurrTab={this.setCurrTab}
              tabs={this.tabs}
            />
          ) : (
            <DesktopTabs
              currTab={currTab}
              setCurrTab={this.setCurrTab}
              tabs={this.tabs}
            />
          )}
        </section>
        <section className='tab-container'>{this.getCurrTab()}</section>
      </div>
    );
  }
}

