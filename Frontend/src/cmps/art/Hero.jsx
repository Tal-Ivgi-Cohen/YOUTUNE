import React from 'react';
import Carousel from 'react-material-ui-carousel';

export class Hero extends React.Component {


  render() {
    return (
      <div className="carousel-container">
        <div className="main-hero-content">
        <h1>Pop Music Listener</h1>
        </div>
      
          <Carousel className="heros-container">
            <img src="//cdn.pixabay.com/photo/2015/01/20/13/13/samsung-605439_960_720.jpg" alt="samsung" />
            <img src="//cdn.pixabay.com/photo/2015/10/08/00/24/woman-977020__340.jpg" alt="woman with headphones" />
            <img src="//cdn.pixabay.com/photo/2020/01/31/07/53/man-4807395_960_720.jpg" alt="man" />
            <img src="//cdn.pixabay.com/photo/2015/10/12/15/13/boy-984293_960_720.jpg" alt="boy" />
            <img src="//cdn.pixabay.com/photo/2016/11/19/10/01/woman-1838412__340.jpg" alt="woman-1" />
          </Carousel>
        </div>

    );
  }
}
