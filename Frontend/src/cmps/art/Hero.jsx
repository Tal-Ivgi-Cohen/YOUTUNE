import React from 'react';
import Carousel from 'react-material-ui-carousel';

export class Hero extends React.Component {


  render() {
    return (
      <div className="carousel-container">
        <div className="main-hero-content">
        <h1>Discover & Purchase art by top artists</h1>
        </div>
      
          <Carousel className="heros-container">
            <img src="//cdn.shopify.com/s/files/1/0941/7736/files/EthanCaflisch-Banner001_2048x.jpg?v=1622560162" alt="EthanCaflisch" />
            <img src="//cdn.shopify.com/s/files/1/0941/7736/files/fn_Banner02_2048x.jpg?v=1622560108" alt="Banner" />
            <img src="//cdn.shopify.com/s/files/1/0941/7736/files/ErikoTsogo-Banner02_4e4b90b9-1a59-4927-abe7-2f8e48cd1a80_2048x.jpg?v=1621907690" alt="ErikoTsogo" />
            <img src="//cdn.shopify.com/s/files/1/0941/7736/files/MayVIPPreview-Banner01_2048x.jpg?v=1621475373" alt="MayVIP" />
            <img src="//cdn.shopify.com/s/files/1/0941/7736/files/SaraMarloweHall-Banner01_2048x.jpg?v=1621301210" alt="SaraMarloweHall" />
          </Carousel>
        </div>

    );
  }
}
