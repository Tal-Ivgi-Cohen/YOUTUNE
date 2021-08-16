import React, { Component } from 'react';
import { IconButton, Modal, TextField } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { Link } from 'react-router-dom';

export class SearchModal extends Component {
  state = {
    search: '',
  };

  handleChange = ({ target }) => {
    const value = target.value;
    this.setState({ search: value }, () => {
      //TODO: debounce and then search
    });
  };

  close = () => {
    this.setState({ search: '' }, () => this.props.closeSearch());
  };
  render() {
    const { isOpen } = this.props;
    const { search } = this.state;
    return (
      <div className='search-modal'>
        <Modal open={isOpen} onClose={this.close} aria-describedby='modal'>
          <div id='modal' className='modal'>
            <IconButton onClick={this.close} className='close-search-modal-btn'>
              <CloseIcon />
            </IconButton>
            <div className='modal-content'>
              <TextField
                label='Search'
                name='search'
                value={search}
                autoFocus
                onChange={this.handleChange}
                className='search-input'
                inputProps={{
                  autocomplete: 'off',
                }}
              />
              <h4>Browse Artworks</h4>
              <section className='quick-search-links'>
                <Link to='#'>PHOTOGRAPHY</Link> | <Link to='#'>PAINTING</Link> |{' '}
                <Link to='#'>MINIMAL</Link> | <Link to='#'>GEOMETRIC</Link> |{' '}
                <Link to='#'>PASTELS</Link> | <Link to='#'>COLORFUL</Link>
              </section>
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}
