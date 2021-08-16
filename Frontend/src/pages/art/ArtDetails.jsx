import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { setArt, loadArts } from "../../store/art/art.action.js";
import { Loader } from "../../cmps/util/Loader.jsx";
import { ArtList } from "../../cmps/art/ArtList.jsx";
import { PurchaseModal } from "../../cmps/art/PurchaseModal.jsx";
import { WishListModal } from "../../cmps/art/WishlistModal.jsx"
import { saveCartItem } from "../../store/cart/cart.action.js";
import { saveWishItem } from "../../store/wishlist/wishlist.action.js"
// test url :
// http://localhost:3000/#/art/a101

class _ArtDetails extends React.Component {
  state = {
    frame: "none-border",
    filterBy: {
      _id: "",
      artistId: "",
    },
  };

  async componentDidMount() {
    const { artId } = this.props.match.params;
    const { setArt, loadArts, saveCartItem,saveWishItem } = this.props;
    await setArt(artId);
    const { selectedArt } = this.props;
    const { _id, artist } = selectedArt;
    //console.log('selectedArt', selectedArt)
    const filterBy = {
      _id,
      artistId: artist._id,
    };
    this.setState({ filterBy }, () => {
      //console.log("this.state.filterBy", this.state.filterBy);
     loadArts(this.state.filterBy);
    });
    saveCartItem();
    saveWishItem();
  }

  handleChange = (ev) => {
    const frameOption = ev.target.value;
    this.setState({ frame: frameOption });
  };

  render() {
    const { selectedArt, saveCartItem, loggedInUser, saveWishItem } = this.props;
    if (!selectedArt) return <Loader />;
    const { arts } = this.props;
    return (
      <div>
        {selectedArt && (
          <div className="main">
            <section className="main-art-details flex">
              <div className="imgs flex">

                <div className="content-img">

                  <div className="container-img">
                    <img
                      src="https://d3t95n9c6zzriw.cloudfront.net/static/img/view_in_a_room_2019_2b.jpg"
                      className="img1"
                      alt={selectedArt.imgUrl}
                    />
                    <img
                      src={selectedArt.imgUrl}
                      className={`img2 ${this.state.frame+'2'}`}
                      alt={selectedArt.imgUrl}
                    />
                  </div>
                </div>
                
                <div className="img-details">
                <div className="container-img-details">
                  <img 
                    className={`${this.state.frame} imgd`}
                    src={selectedArt.imgUrl}
                    alt={`${selectedArt.title}`}
                  />
                  </div>
                </div>

              </div>

              <div className="content-txt">
                <div className="art-details">
                  <p>{selectedArt.artist?.fullname || ""}</p>
                  <h1>{selectedArt.title}</h1>
                  <p>
                    {selectedArt.style} ,{selectedArt.technique} on{" "}
                    {selectedArt.material}{" "}
                  </p>
                  <p>${selectedArt.price}</p>
                  <p>
                    {" "}
                    Size {selectedArt.size.height}/{selectedArt.size.width}
                  </p>
                </div>

                <div className="frame">
                  <h5>Frame</h5>
                  <div className="radio-buttons flex column">
                    <div className="unframed-radio flex">
                      <input
                        id="unframed"
                        value="unframed"
                        name="frame"
                        type="radio"
                        onChange={this.handleChange}
                      />
                      <label for="unframed">Unframed</label>
                    </div>
                    <div className="bright-radio flex">
                      <input
                        id="bright"
                        value="bright"
                        name="frame"
                        type="radio"
                        onChange={this.handleChange}
                      />
                      <label for="bright">Bright</label>
                    </div>
                    <div className="dark-radio flex">
                      <input
                        id="dark"
                        value="dark"
                        name="frame"
                        type="radio"
                        onChange={this.handleChange}
                      />
                      <label for="dark">Dark</label>
                    </div>

                    <div className="black-radio flex">
                      <input
                        id="black"
                        value="black"
                        name="frame"
                        type="radio"
                        onChange={this.handleChange}
                      />
                      <label for="black">Black</label>
                    </div>
                  </div>
                </div>

                <div className="details-modals">
                  <PurchaseModal
                    selectedArt={selectedArt}
                    saveCartItem={saveCartItem}
                    loggedInUser={loggedInUser}
                  />
                  <WishListModal 
                  selectedArt={selectedArt}
                  saveWishItem={saveWishItem}
                   />
                </div>
                <br />
                <p>DESCRIPTION</p>
                <br />
                <p>{selectedArt.description}</p>
              </div>
            </section>
         
        
         
        <div className="artist-list-details flex  column space-between">
        <Link to={`/artist/${selectedArt.artist._id}`}>
           <button className="btn-more-work">More work by {selectedArt.artist.fullname}
            </button>
             {" "} 
          </Link>
          <ArtList arts={arts} artist={selectedArt.artist.fullname} />
        </div>
        </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    selectedArt: state.artModule.selectedArt,
    arts: state.artModule.arts,
    loggedInUser: state.userModule.loggedInUser,
    cartItem: state.userModule.cartItem,
    wishItem: state.userModule.wishItem,
  };
};

const mapDispatchToProps = {
  setArt,
  loadArts,
  saveCartItem,
  saveWishItem,
};
export const ArtDetails = connect(
  mapStateToProps,
  mapDispatchToProps
)(_ArtDetails);
