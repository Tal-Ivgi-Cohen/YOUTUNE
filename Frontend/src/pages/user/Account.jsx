import React, { Component } from 'react';
import { connect } from 'react-redux';
import { UserDashboard } from '../../cmps/user/dashboard/UserDashboard.jsx';
import { LoginSignUpReset } from '../../cmps/user/LoginSignUpReset.jsx';
import {
  loadLoggedInUser,
  login,
  logout,
  signup,
} from '../../store/user/user.action.js';
import { removeArt, loadArts } from '../../store/art/art.action.js';

class _Account extends Component {
  componentDidMount() {
   if (this.props.loggedInUser === null) return
    this.props.loadLoggedInUser();
    if (!this.props.arts.length) this.props.loadArts();
    const { tab } = this.props.match.params;
    if (!tab || tab === 'undefined') this.props.history.push('/account/login');
  }
  render() {
    const {
      loggedInUser,
      removeArt,
      arts,
      login,
      logout,
      signup,
    } = this.props;
    if (loggedInUser) {
      const userArts = arts
      ? arts.filter((art) => art.artist._id === loggedInUser._id)
      : [];
      console.log('arts', userArts)
     // console.log(' art.artist._id',  art.artist._id)

      // const ordersByUser = orders.filter(order => order.buyer.id === userId);
      // const ordersToUser = orders.filter(order => order.items.filter(item => item.artist.id === userId));
      // const userOrders = {ordersByUser,ordersToUser}
      const userOrders = loggedInUser.orders;
      return (
        <div className='account-page'>
          <h3>Account</h3>
          <UserDashboard
            user={loggedInUser}
            userArts={userArts}
            userOrders={userOrders}
            removeArt={removeArt}
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

function mapStateToProps({ userModule, artModule }) {
  return {
    loggedInUser: userModule.loggedInUser,
    arts: artModule.arts,
  };
}

const mapDispatchToProps = {
 loadLoggedInUser,
  login,
  signup,
  logout,
  removeArt,
  loadArts,
};

export const Account = connect(mapStateToProps, mapDispatchToProps)(_Account);
