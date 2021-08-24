import React, { Component } from 'react';
import {
  Button,
  TextField,
  FormControlLabel,
  Switch,
  Tooltip,
} from '@material-ui/core';
import { red } from '@material-ui/core/colors';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import { withStyles } from '@material-ui/styles';

const ArtistSwitch = withStyles({
  switchBase: {
    color: red[300],
    '&$checked': {
      color: red[400],
    },
    '&$checked + $track': {
      backgroundColor: red[400],
    },
  },
  checked: {},
  track: {},
})(Switch);

export class UserForm extends Component {
  state = {
    email: '',
    fullname: '',
    password: '',
    isSinger: false,
    isValidInput: false,
    imgUrl: '',
    orders: [],
    isTooltipOpen: false,
  };

  componentDidMount() {
    if (this.props.user) {
      const { email, fullname, password, isSinger, imgUrl, orders } =
        this.props.user;
      this.setState({
        email,
        fullname,
        password,
        isSinger,
        isValidInput: true,
        imgUrl,
        orders,
      });
    }
  }

  handleChange = ({ target }) => {
    const field = target.name;
    const value = field === 'isSinger' ? target.checked : target.value;
    this.setState({ [field]: value }, () => {
      const { email, password } = this.state;
      let isValid =
        this.validateEmail(email) && this.validatePassword(password);
      this.setState({ isValidInput: isValid });
    });
  };

  onImgChange = (url) => {
    this.setState({ imgUrl: url });
  };

  onSubmit = (ev) => {
    ev.preventDefault();
    const { email, fullname, password, isSinger, imgUrl, orders } = this.state;
    const userInfo = {
      email,
      fullname,
      password,
      isSinger,
      imgUrl,
      orders,
    };
    if (this.props.user) {
      userInfo._id = this.props.user._id;
      this.props.updateUser(userInfo);
      this.props.editModeOff();
    } else {
      userInfo.isAdmin = false;
      this.props.signup(userInfo);
    }
  };

  validateEmail(email) {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  validatePassword = (password) => {
    const re = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return re.test(String(password).toLowerCase());
  };

  openTooltip = () => this.setState({ isTooltipOpen: true });
  closeTooltip = () => this.setState({ isTooltipOpen: false });

  render() {
    const {
      email,
      fullname,
      password,
      isSinger,
      isValidInput,
      isTooltipOpen,
    } = this.state;
    const { cancel, editModeOff } = this.props;
    return (
      <section className='user-form'>
        <form onSubmit={this.onSubmit}>
          <section className='form-inputs'>
            <TextField
              label='Email'
              variant='outlined'
              name='email'
              value={email}
              onChange={this.handleChange}
              required
            />
            <TextField
              label='Full name'
              variant='outlined'
              name='fullname'
              value={fullname}
              onChange={this.handleChange}
              required
            />
            <section>
              <TextField
                label='Password'
                variant='outlined'
                name='password'
                value={password}
                onChange={this.handleChange}
                required
              />
              <Tooltip
                open={isTooltipOpen}
                onClick={this.openTooltip}
                onOpen={this.openTooltip}
                onClose={this.closeTooltip}
                placement={'left-start'}
                title={
                  <p
                    style={{
                      fontSize: '10px',
                      width: '120px',
                      fontFamily: 'neuzeit',
                    }}
                  >
                    Minimum eight characters, at least one letter and one
                    number.
                  </p>
                }
              >
                <InfoOutlinedIcon />
              </Tooltip>
            </section>
          </section>
          <section className='form-img'>
            <FormControlLabel
              control={
                <ArtistSwitch
                  checked={isSinger}
                  onChange={this.handleChange}
                  name='isSinger'
                />
              }
              label="I'm a singer"
            />
          </section>
          <section className='form-btns'>
            <Button variant='outlined' onClick={editModeOff || cancel}>
              Cancel
            </Button>
            <Button variant='outlined' type='submit' disabled={!isValidInput}>
              Submit
            </Button>
          </section>
        </form>
      </section>
    );
  }
}

