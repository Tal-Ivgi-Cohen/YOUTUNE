import React from 'react';
import { TextField, Button } from '@material-ui/core';
import { Loader } from './Loader';
import { Link } from 'react-router-dom';

export class SongForm extends React.Component {
  state = {
    isEditMode: false,
    song: {
      title: '',
      year: 0,
      description: '',
    },
  };

  componentDidMount() {
    const { user, history, selectedSong } = this.props;
    if (selectedSong) {
      if (user && selectedSong.singer._id === user._id) {
        this.setState({ song: selectedSong });
        this.setState({ isEditMode: true });
      } else history.push('/account');
    } else {
      if (user) {
        const { _id, fullName, imgUrl } = user;
        const currUserSinger = { _id, fullName, imgUrl };
        this.setState((prevState) => {
          return {
            song: {
              ...prevState.song,
              singer: currUserSinger,
            },
          };
        });
      } else history.push('/account');
    }
  }

  handleChange = ({ target }) => {
    const field = target.name;
    const value = target.type === 'number' ? +target.value : target.value
    this.setState((prevState) => {
      return {
        song: {
          ...prevState.song,
          [field]: value,
        },
      };
    });
  }

onSubmit = async (ev) => {
  ev.preventDefault();
  const { song } = this.state;
  await this.props.saveSong(song);
  this.props.history.push(`/account/songs`);
};

render() {
  const { song } = this.state
  if (!song) return <Loader />;
  const { title, year, description } = song;
  const { isEditMode } = this.state
  return (
    <div className='art-form'>
      <span className='breadcrumbs'>
        <Link to='/account'>/ Account</Link>
        <span>{isEditMode ? ' / Edit' : ' / Add'}</span>
      </span>
      <form onSubmit={this.onSubmit}>
        <section className='form-inputs'>
          <TextField
            required
            value={title}
            name='title'
            label='Title'
            variant='outlined'
            onChange={this.handleChange}
            className='title-input'
          />
          <TextField
            multiline
            value={description}
            name='description'
            rowsMax='2'
            label='Description'
            variant='outlined'
            onChange={this.handleChange}
            className='desc-input'
          />
          <TextField
            value={year}
            required
            inputProps={{ min: 0 }}
            name='yaer'
            type='number'
            label='Year'
            variant='outlined'
            onChange={this.handleChange}
            onInput={({ target }) =>
              (target.value = target.value.replace(/^0+/, ''))
            }
          />
        </section>
        <section className='form-btns'>
          <Button
            variant='outlined'
            onClick={() => this.props.history.push('/account/arts')}
          >
            Cancel
          </Button>
          <Button
            variant='outlined'
            type='submit'
            disabled={!year}
          >
            Submit
          </Button>
        </section>
      </form>
    </div>
  );
}
};
